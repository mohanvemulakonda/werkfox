/**
 * FoxCut - Guillotine-based 2D Cutting Stock Optimization Engine
 *
 * Implements shelf-based guillotine packing with BFDH (Best Fit Decreasing Height).
 * All cuts are guillotine-compliant: edge-to-edge, no L-shaped cuts.
 *
 * Supports:
 * - Configurable saw blade kerf
 * - Edge trim on stock sheets
 * - Grain direction constraints (prevents rotation when set)
 * - Edge banding with configurable thickness
 * - Remnant/offcut tracking
 * - Cut sequence numbering
 */

// ---------------------------------------------------------------------------
// Types & Interfaces
// ---------------------------------------------------------------------------

export interface CutPiece {
  id: string;
  label: string;
  width: number; // mm
  height: number; // mm
  quantity: number;
  grain: 'none' | 'horizontal' | 'vertical';
  edgeBanding: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
  color?: string; // for visual differentiation
}

export interface PlacedPiece {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotated: boolean;
  cutSequence: number;
  colorIndex: number;
  grain: 'none' | 'horizontal' | 'vertical';
  edgeBanding: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
}

export interface Remnant {
  x: number;
  y: number;
  width: number;
  height: number;
  area: number;
}

export interface SheetResult {
  pieces: PlacedPiece[];
  remnants: Remnant[];
  usedArea: number;
  wasteArea: number;
  utilization: number;
  cutSequenceCount: number;
}

export interface OptimizationConfig {
  sheetWidth: number;
  sheetHeight: number;
  kerf: number; // saw blade width in mm
  edgeTrim: number; // trim from each edge of stock sheet in mm
  bandingThickness: number; // edge banding thickness in mm (typically 0.4-2mm)
  minRemnantSize: number; // minimum remnant dimension to track (mm)
}

export interface OptimizationResult {
  sheets: SheetResult[];
  totalSheets: number;
  overallUtilization: number;
  totalWasteArea: number;
  totalUsedArea: number;
  totalRemnants: Remnant[];
  edgeBandingSummary: {
    totalLength: number; // total linear mm of edge banding needed
    byEdge: { top: number; bottom: number; left: number; right: number };
  };
  piecesPlaced: number;
  piecesTotal: number;
  unplacedPieces: string[]; // labels of pieces that couldn't fit
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** 20 distinct colors for piece visualization on cutting diagrams */
export const PIECE_COLORS: string[] = [
  '#4F86C6', // steel blue
  '#E07A5F', // terra cotta
  '#81B29A', // sage green
  '#F2CC8F', // sandy gold
  '#9B72AA', // muted purple
  '#E8927C', // salmon
  '#72B7B2', // teal
  '#F4A261', // orange
  '#8ECAE6', // sky blue
  '#D4A373', // warm tan
  '#95B8D1', // powder blue
  '#BC6C5B', // rust
  '#A7C957', // lime green
  '#FFB4A2', // peach
  '#6D6875', // mauve gray
  '#CDB4DB', // lavender
  '#B5838D', // dusty rose
  '#52B788', // emerald
  '#FFD166', // sunshine yellow
  '#9CAFB7', // slate
];

// ---------------------------------------------------------------------------
// Internal Types
// ---------------------------------------------------------------------------

/** An expanded single piece ready for placement (quantity = 1) */
interface ExpandedPiece {
  id: string;
  label: string;
  originalWidth: number; // nominal width before banding
  originalHeight: number; // nominal height before banding
  cutWidth: number; // effective width including banding thickness
  cutHeight: number; // effective height including banding thickness
  grain: 'none' | 'horizontal' | 'vertical';
  edgeBanding: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
  colorIndex: number;
  canRotate: boolean;
}

/** A horizontal shelf on a sheet */
interface Shelf {
  y: number; // top-left y position (relative to usable area)
  height: number; // shelf height (tallest piece in shelf)
  usedWidth: number; // how much width has been consumed (including kerfs)
  pieces: PlacedPiece[];
}

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

/**
 * Calculate effective cut dimensions for a piece, adding banding thickness
 * to edges that require edge banding.
 */
function getEffectiveDimensions(
  width: number,
  height: number,
  edgeBanding: { top: boolean; bottom: boolean; left: boolean; right: boolean },
  bandingThickness: number
): { cutWidth: number; cutHeight: number } {
  const cutWidth =
    width +
    (edgeBanding.left ? bandingThickness : 0) +
    (edgeBanding.right ? bandingThickness : 0);
  const cutHeight =
    height +
    (edgeBanding.top ? bandingThickness : 0) +
    (edgeBanding.bottom ? bandingThickness : 0);
  return { cutWidth, cutHeight };
}

/**
 * Expand all CutPiece entries into individual ExpandedPiece instances,
 * one per quantity unit. Assigns a color index based on the original piece id.
 */
function expandPieces(
  pieces: CutPiece[],
  bandingThickness: number
): ExpandedPiece[] {
  const expanded: ExpandedPiece[] = [];
  const colorMap = new Map<string, number>();
  let colorCounter = 0;

  for (const piece of pieces) {
    // Assign a consistent color index per unique piece id
    if (!colorMap.has(piece.id)) {
      colorMap.set(piece.id, colorCounter % PIECE_COLORS.length);
      colorCounter++;
    }
    const colorIndex = colorMap.get(piece.id)!;

    const { cutWidth, cutHeight } = getEffectiveDimensions(
      piece.width,
      piece.height,
      piece.edgeBanding,
      bandingThickness
    );

    const canRotate = piece.grain === 'none';

    for (let q = 0; q < piece.quantity; q++) {
      expanded.push({
        id: piece.id,
        label: piece.label,
        originalWidth: piece.width,
        originalHeight: piece.height,
        cutWidth,
        cutHeight,
        grain: piece.grain,
        edgeBanding: { ...piece.edgeBanding },
        colorIndex,
        canRotate,
      });
    }
  }

  return expanded;
}

/**
 * Rotate the edge banding when a piece is rotated 90 degrees clockwise.
 * Width and height swap, so edges remap: top->right, right->bottom, bottom->left, left->top
 */
function rotateEdgeBanding(eb: {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}): { top: boolean; bottom: boolean; left: boolean; right: boolean } {
  return {
    top: eb.left,
    right: eb.top,
    bottom: eb.right,
    left: eb.bottom,
  };
}

/**
 * Identify usable rectangular remnants from a packed sheet.
 * In a shelf-based layout, remnants are:
 *   1. The unused width to the right of each shelf
 *   2. The unused height below the last shelf
 */
function identifyRemnants(
  shelves: Shelf[],
  usableWidth: number,
  usableHeight: number,
  edgeTrim: number,
  minRemnantSize: number
): Remnant[] {
  const remnants: Remnant[] = [];

  // Remnant to the right of each shelf
  for (const shelf of shelves) {
    const remnantWidth = usableWidth - shelf.usedWidth;
    const remnantHeight = shelf.height;
    if (remnantWidth >= minRemnantSize && remnantHeight >= minRemnantSize) {
      remnants.push({
        x: edgeTrim + shelf.usedWidth,
        y: edgeTrim + shelf.y,
        width: remnantWidth,
        height: remnantHeight,
        area: remnantWidth * remnantHeight,
      });
    }
  }

  // Remnant below the last shelf (full width)
  if (shelves.length > 0) {
    const lastShelf = shelves[shelves.length - 1];
    const bottomY = lastShelf.y + lastShelf.height;
    const remnantHeight = usableHeight - bottomY;
    if (remnantHeight >= minRemnantSize && usableWidth >= minRemnantSize) {
      remnants.push({
        x: edgeTrim,
        y: edgeTrim + bottomY,
        width: usableWidth,
        height: remnantHeight,
        area: usableWidth * remnantHeight,
      });
    }
  } else {
    // Empty sheet - entire usable area is a remnant (shouldn't happen in practice)
    if (usableWidth >= minRemnantSize && usableHeight >= minRemnantSize) {
      remnants.push({
        x: edgeTrim,
        y: edgeTrim,
        width: usableWidth,
        height: usableHeight,
        area: usableWidth * usableHeight,
      });
    }
  }

  return remnants;
}

// ---------------------------------------------------------------------------
// Packing Strategies
// ---------------------------------------------------------------------------

type SortStrategy = (a: ExpandedPiece, b: ExpandedPiece) => number;

/** Sort by area descending (BFDH primary) */
const sortByAreaDesc: SortStrategy = (a, b) =>
  b.cutWidth * b.cutHeight - a.cutWidth * a.cutHeight;

/** Sort by height descending, then width descending */
const sortByHeightDesc: SortStrategy = (a, b) =>
  b.cutHeight - a.cutHeight || b.cutWidth - a.cutWidth;

/** Sort by width descending, then height descending */
const sortByWidthDesc: SortStrategy = (a, b) =>
  b.cutWidth - a.cutWidth || b.cutHeight - a.cutHeight;

/** Sort by max dimension descending */
const sortByMaxDimDesc: SortStrategy = (a, b) =>
  Math.max(b.cutWidth, b.cutHeight) - Math.max(a.cutWidth, a.cutHeight);

const SORT_STRATEGIES: SortStrategy[] = [
  sortByAreaDesc,
  sortByHeightDesc,
  sortByWidthDesc,
  sortByMaxDimDesc,
];

/**
 * Try to place a piece on a shelf. Returns the placement details or null.
 * Tries the natural orientation first, then rotated (if allowed).
 */
function tryPlaceOnShelf(
  piece: ExpandedPiece,
  shelf: Shelf,
  usableWidth: number,
  kerf: number
): { width: number; height: number; rotated: boolean } | null {
  const kerfNeeded = shelf.pieces.length > 0 ? kerf : 0;

  // Try natural orientation
  const fitW = shelf.usedWidth + kerfNeeded + piece.cutWidth;
  if (fitW <= usableWidth && piece.cutHeight <= shelf.height) {
    return {
      width: piece.cutWidth,
      height: piece.cutHeight,
      rotated: false,
    };
  }

  // Try rotated orientation (only if grain allows)
  if (piece.canRotate) {
    const fitWR = shelf.usedWidth + kerfNeeded + piece.cutHeight;
    if (fitWR <= usableWidth && piece.cutWidth <= shelf.height) {
      return {
        width: piece.cutHeight,
        height: piece.cutWidth,
        rotated: true,
      };
    }
  }

  return null;
}

/**
 * Pack pieces onto sheets using shelf-based guillotine packing.
 *
 * Algorithm:
 * - For each unplaced piece, scan existing shelves for a best fit (least remaining width).
 * - If no shelf fits, open a new shelf if vertical space remains.
 * - If no space on current sheet, start a new sheet.
 */
function packWithStrategy(
  pieces: ExpandedPiece[],
  config: OptimizationConfig,
  sortFn: SortStrategy
): { sheets: SheetResult[]; unplaced: ExpandedPiece[] } {
  const { sheetWidth, sheetHeight, kerf, edgeTrim, minRemnantSize } = config;

  // Effective usable area after trimming edges
  const usableWidth = sheetWidth - 2 * edgeTrim;
  const usableHeight = sheetHeight - 2 * edgeTrim;

  if (usableWidth <= 0 || usableHeight <= 0) {
    return {
      sheets: [],
      unplaced: [...pieces],
    };
  }

  // Sort a copy of the pieces array
  const sorted = [...pieces].sort(sortFn);

  const sheetResults: SheetResult[] = [];
  const unplaced: ExpandedPiece[] = [];

  // Track which pieces have been placed (by index in sorted array)
  const placed = new Set<number>();

  // Process pieces, filling sheets one at a time
  while (placed.size < sorted.length) {
    const shelves: Shelf[] = [];
    let currentY = 0;
    let cutSequence = 0;
    const sheetPieces: PlacedPiece[] = [];

    // Iterate through all unplaced pieces for this sheet
    for (let i = 0; i < sorted.length; i++) {
      if (placed.has(i)) continue;

      const piece = sorted[i];

      // Check if piece can possibly fit on a sheet at all
      const minDim = piece.canRotate
        ? Math.min(piece.cutWidth, piece.cutHeight)
        : piece.cutWidth;
      const maxDim = piece.canRotate
        ? Math.max(piece.cutWidth, piece.cutHeight)
        : piece.cutHeight;
      if (minDim > usableWidth || maxDim > usableHeight) {
        // Also check the other orientation for non-rotatable pieces
        if (!piece.canRotate && (piece.cutWidth > usableWidth || piece.cutHeight > usableHeight)) {
          // Piece can never fit; mark as unplaced and continue
          continue;
        }
      }

      // Try to find a best-fit shelf (least remaining width after placement)
      let bestShelfIdx = -1;
      let bestFit: { width: number; height: number; rotated: boolean } | null =
        null;
      let bestRemainingWidth = Infinity;

      for (let s = 0; s < shelves.length; s++) {
        const fit = tryPlaceOnShelf(piece, shelves[s], usableWidth, kerf);
        if (fit) {
          const kerfNeeded = shelves[s].pieces.length > 0 ? kerf : 0;
          const remaining =
            usableWidth - (shelves[s].usedWidth + kerfNeeded + fit.width);
          if (remaining < bestRemainingWidth) {
            bestRemainingWidth = remaining;
            bestShelfIdx = s;
            bestFit = fit;
          }
        }
      }

      if (bestShelfIdx >= 0 && bestFit) {
        // Place on existing shelf
        const shelf = shelves[bestShelfIdx];
        const kerfNeeded = shelf.pieces.length > 0 ? kerf : 0;
        const x = shelf.usedWidth + kerfNeeded;

        cutSequence++;
        const edgeBanding = bestFit.rotated
          ? rotateEdgeBanding(piece.edgeBanding)
          : { ...piece.edgeBanding };

        sheetPieces.push({
          id: piece.id,
          label: piece.label,
          x: edgeTrim + x,
          y: edgeTrim + shelf.y,
          width: bestFit.width,
          height: bestFit.height,
          rotated: bestFit.rotated,
          cutSequence,
          colorIndex: piece.colorIndex,
          grain: piece.grain,
          edgeBanding,
        });

        shelf.usedWidth = x + bestFit.width;
        shelf.pieces.push(sheetPieces[sheetPieces.length - 1]);
        placed.add(i);
      } else {
        // Try opening a new shelf
        const shelfKerf = shelves.length > 0 ? kerf : 0;

        // Determine the piece dimensions for a new shelf
        // (piece height becomes shelf height, so try both orientations)
        let newShelfFit: {
          width: number;
          height: number;
          rotated: boolean;
        } | null = null;

        // Natural orientation
        if (
          piece.cutWidth <= usableWidth &&
          currentY + shelfKerf + piece.cutHeight <= usableHeight
        ) {
          newShelfFit = {
            width: piece.cutWidth,
            height: piece.cutHeight,
            rotated: false,
          };
        }

        // Rotated orientation (if allowed and better or natural didn't fit)
        if (piece.canRotate) {
          if (
            piece.cutHeight <= usableWidth &&
            currentY + shelfKerf + piece.cutWidth <= usableHeight
          ) {
            // Prefer the orientation that makes a shorter shelf (saves vertical space)
            if (
              !newShelfFit ||
              piece.cutWidth < piece.cutHeight
            ) {
              newShelfFit = {
                width: piece.cutHeight,
                height: piece.cutWidth,
                rotated: true,
              };
            }
          }
        }

        if (newShelfFit) {
          const shelfY = currentY + shelfKerf;
          const newShelf: Shelf = {
            y: shelfY,
            height: newShelfFit.height,
            usedWidth: newShelfFit.width,
            pieces: [],
          };

          cutSequence++;
          const edgeBanding = newShelfFit.rotated
            ? rotateEdgeBanding(piece.edgeBanding)
            : { ...piece.edgeBanding };

          const placedPiece: PlacedPiece = {
            id: piece.id,
            label: piece.label,
            x: edgeTrim,
            y: edgeTrim + shelfY,
            width: newShelfFit.width,
            height: newShelfFit.height,
            rotated: newShelfFit.rotated,
            cutSequence,
            colorIndex: piece.colorIndex,
            grain: piece.grain,
            edgeBanding,
          };

          newShelf.pieces.push(placedPiece);
          sheetPieces.push(placedPiece);
          shelves.push(newShelf);
          currentY = shelfY + newShelfFit.height;
          placed.add(i);
        }
        // If we can't place it on this sheet, it stays unplaced for now
      }
    }

    // If no pieces were placed on this sheet iteration, remaining pieces won't fit anywhere
    if (sheetPieces.length === 0) {
      for (let i = 0; i < sorted.length; i++) {
        if (!placed.has(i)) {
          unplaced.push(sorted[i]);
          placed.add(i);
        }
      }
      break;
    }

    // Calculate sheet statistics
    const usedArea = sheetPieces.reduce(
      (sum, p) => sum + p.width * p.height,
      0
    );
    const totalSheetArea = usableWidth * usableHeight;
    const wasteArea = totalSheetArea - usedArea;

    const remnants = identifyRemnants(
      shelves,
      usableWidth,
      usableHeight,
      edgeTrim,
      minRemnantSize
    );

    sheetResults.push({
      pieces: sheetPieces,
      remnants,
      usedArea,
      wasteArea,
      utilization: totalSheetArea > 0 ? (usedArea / totalSheetArea) * 100 : 0,
      cutSequenceCount: cutSequence,
    });
  }

  return { sheets: sheetResults, unplaced };
}

// ---------------------------------------------------------------------------
// Edge Banding Calculation
// ---------------------------------------------------------------------------

/**
 * Calculate total edge banding requirements across all placed pieces.
 * Uses the nominal (original) piece dimensions, not cut dimensions.
 */
function calculateEdgeBandingSummary(
  sheets: SheetResult[]
): OptimizationResult['edgeBandingSummary'] {
  const byEdge = { top: 0, bottom: 0, left: 0, right: 0 };

  for (const sheet of sheets) {
    for (const piece of sheet.pieces) {
      // For banding length, use the placed dimension along that edge.
      // Top/bottom edges run along the width; left/right edges run along the height.
      if (piece.edgeBanding.top) byEdge.top += piece.width;
      if (piece.edgeBanding.bottom) byEdge.bottom += piece.width;
      if (piece.edgeBanding.left) byEdge.left += piece.height;
      if (piece.edgeBanding.right) byEdge.right += piece.height;
    }
  }

  return {
    totalLength: byEdge.top + byEdge.bottom + byEdge.left + byEdge.right,
    byEdge,
  };
}

// ---------------------------------------------------------------------------
// Main Optimization Function
// ---------------------------------------------------------------------------

/**
 * Run the guillotine cutting stock optimization.
 *
 * Tries multiple sorting strategies and selects the result that uses the
 * fewest sheets (and highest utilization as a tiebreaker).
 */
export function optimizeCutting(
  pieces: CutPiece[],
  config: OptimizationConfig
): OptimizationResult {
  // Expand quantities into individual pieces
  const expanded = expandPieces(pieces, config.bandingThickness);
  const totalPieceCount = expanded.length;

  if (totalPieceCount === 0) {
    return {
      sheets: [],
      totalSheets: 0,
      overallUtilization: 0,
      totalWasteArea: 0,
      totalUsedArea: 0,
      totalRemnants: [],
      edgeBandingSummary: {
        totalLength: 0,
        byEdge: { top: 0, bottom: 0, left: 0, right: 0 },
      },
      piecesPlaced: 0,
      piecesTotal: 0,
      unplacedPieces: [],
    };
  }

  // Try all sorting strategies and pick the best result
  let bestResult: { sheets: SheetResult[]; unplaced: ExpandedPiece[] } | null =
    null;
  let bestScore = -Infinity;

  for (const strategy of SORT_STRATEGIES) {
    const result = packWithStrategy(expanded, config, strategy);

    // Score: prioritize fewer sheets, then higher utilization, then fewer unplaced
    const placedCount = totalPieceCount - result.unplaced.length;
    const avgUtilization =
      result.sheets.length > 0
        ? result.sheets.reduce((sum, s) => sum + s.utilization, 0) /
          result.sheets.length
        : 0;

    // Weighted score: placed pieces matter most, then fewer sheets, then utilization
    const score =
      placedCount * 10000 -
      result.sheets.length * 100 +
      avgUtilization;

    if (score > bestScore) {
      bestScore = score;
      bestResult = result;
    }
  }

  const { sheets, unplaced } = bestResult!;

  // Aggregate results
  const totalUsedArea = sheets.reduce((sum, s) => sum + s.usedArea, 0);
  const totalWasteArea = sheets.reduce((sum, s) => sum + s.wasteArea, 0);
  const totalSheetArea = totalUsedArea + totalWasteArea;
  const allRemnants = sheets.flatMap((s) => s.remnants);
  const edgeBandingSummary = calculateEdgeBandingSummary(sheets);
  const piecesPlaced = totalPieceCount - unplaced.length;

  return {
    sheets,
    totalSheets: sheets.length,
    overallUtilization:
      totalSheetArea > 0 ? (totalUsedArea / totalSheetArea) * 100 : 0,
    totalWasteArea,
    totalUsedArea,
    totalRemnants: allRemnants,
    edgeBandingSummary,
    piecesPlaced,
    piecesTotal: totalPieceCount,
    unplacedPieces: unplaced.map((p) => p.label),
  };
}
