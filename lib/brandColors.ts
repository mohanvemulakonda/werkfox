/**
 * Livato Solutions Brand Color System
 *
 * Primary: Blue (#2563EB / blue-600) - Your main brand color
 * Based on color theory and psychology for B2B tech/printing industry
 */

export const brandColors = {
  // PRIMARY COLORS - Main brand identity
  primary: {
    main: '#2563EB',      // blue-600 - Primary brand color
    light: '#3B82F6',     // blue-500 - Lighter variant
    dark: '#1D4ED8',      // blue-700 - Darker variant
    extraDark: '#1E40AF', // blue-800 - Extra dark for contrast
  },

  // SECONDARY COLORS - Supporting colors that work well with blue
  secondary: {
    // Cyan/Teal - Tech-forward, modern (great for CTAs and highlights)
    cyan: {
      main: '#06B6D4',    // cyan-500
      light: '#22D3EE',   // cyan-400
      dark: '#0891B2',    // cyan-600
    },

    // Orange - Energy, innovation (perfect for important actions)
    orange: {
      main: '#F97316',    // orange-500
      light: '#FB923C',   // orange-400
      dark: '#EA580C',    // orange-600
    },

    // Purple - Premium, quality (good for featured content)
    purple: {
      main: '#8B5CF6',    // violet-500
      light: '#A78BFA',   // violet-400
      dark: '#7C3AED',    // violet-600
    },
  },

  // ACCENT COLORS - For specific use cases
  accent: {
    // Success - Green for confirmations, success states
    success: {
      main: '#10B981',    // green-500
      light: '#34D399',   // green-400
      dark: '#059669',    // green-600
    },

    // Warning - Yellow/Amber for warnings
    warning: {
      main: '#F59E0B',    // amber-500
      light: '#FBBF24',   // amber-400
      dark: '#D97706',    // amber-600
    },

    // Error - Red for errors, urgent actions
    error: {
      main: '#EF4444',    // red-500
      light: '#F87171',   // red-400
      dark: '#DC2626',    // red-600
    },
  },

  // NEUTRAL COLORS - Grays for text, backgrounds
  neutral: {
    white: '#FFFFFF',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    black: '#000000',
  },
};

// GRADIENT COMBINATIONS - Pre-defined gradients for consistent design
export const brandGradients = {
  // PRIMARY GRADIENTS
  primaryBlue: 'from-blue-600 to-blue-800',
  primaryBlueDark: 'from-blue-700 to-blue-900',
  primaryBlueLight: 'from-blue-400 to-blue-600',

  // SECONDARY GRADIENTS
  cyanBlue: 'from-cyan-500 to-blue-600',      // Modern tech feel
  orangeRed: 'from-orange-500 to-red-600',    // Energy & urgency
  purpleBlue: 'from-purple-500 to-blue-600',  // Premium feel

  // ACCENT GRADIENTS
  successGreen: 'from-green-500 to-green-700',
  warningAmber: 'from-amber-400 to-orange-600',

  // BACKGROUND GRADIENTS
  lightBlue: 'from-blue-50 to-white',
  darkBlue: 'from-gray-900 to-blue-900',
  subtle: 'from-gray-50 to-blue-50',
};

// COLOR USAGE GUIDE
export const colorUsageGuide = {
  // When to use each color
  primary: {
    use: 'Main CTAs, links, brand elements, primary buttons',
    example: 'Download buttons, navigation active states, primary headings',
  },

  cyan: {
    use: 'Secondary CTAs, tech features, modern elements',
    example: 'Tech specifications, digital features, innovation highlights',
  },

  orange: {
    use: 'Important actions, featured items, urgency',
    example: 'Special offers, featured brochures, "New" badges',
  },

  purple: {
    use: 'Premium features, quality indicators, specialty products',
    example: 'Premium materials, quality certifications, featured products',
  },

  green: {
    use: 'Success states, confirmations, eco-friendly',
    example: 'Form success, checkmarks, sustainability features',
  },
};

// BROCHURE COLOR RECOMMENDATIONS
export const brochureColorMapping = {
  // Match brochure categories to colors
  comprehensive: 'blue',     // Main portfolio - primary brand
  pharmaceutical: 'blue',     // Healthcare - trust, safety
  retail: 'orange',          // Energy, commerce
  food: 'green',             // Fresh, natural
  automotive: 'gray',        // Industrial, durable
  logistics: 'cyan',         // Modern, efficient
  industrial: 'purple',      // Premium, quality
  barcode: 'blue',           // Technical, precise
  serialization: 'purple',   // Advanced, secure
  security: 'red',           // Alert, protection
  material: 'green',         // Natural, specs
};

// TAILWIND CLASS HELPERS
export const getTailwindClasses = {
  // Primary button
  primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg',

  // Secondary button
  secondaryButton: 'bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors',

  // Outline button
  outlineButton: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors',

  // Link
  link: 'text-blue-600 hover:text-blue-700 font-semibold transition-colors',

  // Badge
  badge: 'bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold',

  // Gradient background
  gradientHero: 'bg-gradient-to-br from-blue-600 to-blue-800 text-white',

  // Card hover
  cardHover: 'hover:shadow-xl hover:border-blue-500 transition-all',
};

export default brandColors;
