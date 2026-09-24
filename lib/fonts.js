import {
  Inter,
  Roboto,
  Source_Sans_3,
  IBM_Plex_Sans,
  Manrope,
  Public_Sans,
  Source_Code_Pro,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Source_Serif_4,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-source-sans" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-plex-sans" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--font-manrope" });
const publicSans = Public_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-public-sans" });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-code-pro" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-jetbrains-mono" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-source-serif" });

export const FONTS = [
  { value: "inter", label: "Inter", cssVar: "var(--font-inter)", variable: inter.variable },
  { value: "roboto", label: "Roboto", cssVar: "var(--font-roboto)", variable: roboto.variable },
  { value: "source-sans", label: "Source Sans 3", cssVar: "var(--font-source-sans)", variable: sourceSans.variable },
  { value: "plex-sans", label: "IBM Plex Sans", cssVar: "var(--font-plex-sans)", variable: plexSans.variable },
  { value: "manrope", label: "Manrope", cssVar: "var(--font-manrope)", variable: manrope.variable },
  { value: "public-sans", label: "Public Sans", cssVar: "var(--font-public-sans)", variable: publicSans.variable },
  { value: "code-pro", label: "Source Code Pro", cssVar: "var(--font-code-pro)", variable: sourceCodePro.variable },
  { value: "jetbrains-mono", label: "JetBrains Mono", cssVar: "var(--font-jetbrains-mono)", variable: jetBrainsMono.variable },
  { value: "plex-mono", label: "IBM Plex Mono", cssVar: "var(--font-plex-mono)", variable: plexMono.variable },
  { value: "source-serif", label: "Source Serif 4", cssVar: "var(--font-source-serif)", variable: sourceSerif.variable },
];

export const fontVariables = FONTS.map((f) => f.variable).join(" ");