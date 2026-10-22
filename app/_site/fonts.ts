import { Ubuntu, Sora, Outfit, Archivo, Space_Grotesk, DM_Serif_Display } from 'next/font/google';

// Fonts of the printed invoice (Ubuntu, as werkfox-app print-document.tsx) and of the invented customer logos.
// Inter and Caveat come from app/layout.tsx (--font-inter, --font-caveat).
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-ubuntu', display: 'swap' });
const sora = Sora({ subsets: ['latin'], weight: ['800'], variable: '--font-sora', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-outfit', display: 'swap' });
const archivo = Archivo({ subsets: ['latin'], weight: ['900'], style: ['italic'], variable: '--font-archivo', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['700'], variable: '--font-space-grotesk', display: 'swap' });
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: ['400'], variable: '--font-dm-serif', display: 'swap' });

export const siteFonts = [ubuntu, sora, outfit, archivo, spaceGrotesk, dmSerif].map((f) => f.variable).join(' ');
