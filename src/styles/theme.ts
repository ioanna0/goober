import { MantineThemeOverride } from '@mantine/core';

// https://mantine.dev/theming/theme-object/

type MantineColor = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  ...string[],
];

const desktopTheme: MantineThemeOverride = {
  // Controls focus ring styles:
  // auto – display focus ring only when user navigates with keyboard (default)
  // always – display focus ring when user navigates with keyboard and mouse
  // never – focus ring is always hidden (not recommended)
  focusRing: 'auto',

  // Determines whether motion based animations should be disabled for
  // users who prefer to reduce motion in their OS settings
  respectReducedMotion: true,

  // Determines whether elements that do not have pointer cursor by default
  // (checkboxes, radio, native select) should have it
  cursorType: 'default',

  // Default border-radius used for most elements
  defaultRadius: 'md',

  // White and black colors, defaults to '#fff' and '#000'
  white: '#fff',
  black: '#000000',

  // Object of arrays with 10 colors
  colors: {
    primary: [
      '#0B3B3C',
      '#0B3B3C',
      '#0B3B3C',
      '#0B3B3C',
      '#0B3B3C',
      '#0B3B3C',
      '#0B3B3C',
      '#0B3B3C',
      '#0B3B3C',
      '#0B3B3C',
    ],
    mediumPurple: [
      '#907AD6',
      '#907AD6',
      '#907AD6',
      '#907AD6',
      '#907AD6',
      '#907AD6',
      '#907AD6',
      '#907AD6',
      '#907AD6',
      '#907AD6',
    ],
  },

  // Key of theme.colors
  primaryColor: 'primary', 

  // Index of color from theme.colors that is considered primary, Shade type is 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  primaryShade: 5,

  // Default gradient used in components that support `variant="gradient"` (Button, ThemeIcon, etc.)
  // defaultGradient: { deg: number; from: MantineColor; to: MantineColor };

  // font-family and line-height used in most components
  fontFamily: 'Montserrat, sans-serif',
  headings: { fontFamily: 'Montserrat, sans-serif' },
  lineHeights: {
    xs: '1.16',
    sm: '1.16',
    md: '1.16',
    lg: '1.16',
    xl: '1.16',
  },

  // Monospace font-family, used in Code, Kbd and Prism components
  fontFamilyMonospace: 'monospace',

  // Sizes for corresponding properties
  fontSizes: {
    xs: '14px',
    sm: '18px',
    md: '24px',
    lg: '40px',
    xl: '96px',
  },

  // radius: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  // spacing: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;

  // Values used for box-shadow
  // shadows: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;

  // Breakpoints used in some components to add responsive styles
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '96em',
  },

  // Styles added to buttons with `:active` pseudo-class
  // activeStyles: CSSObject;

  // h1-h6 styles, used in Title and TypographyStylesProvider components
  headings: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    sizes: {
      h1: {
        fontSize: '80px',
        lineHeight: '88px',
      },
      h2: {
        fontSize: '64px',
        lineHeight: '72px',
      },
      h3: {
        fontSize: '40px',
        lineHeight: '48px',
      },
      h4: {
        fontSize: '32px',
        lineHeight: '40px',
      },
      h5: {
        fontSize: '24px',
        lineHeight: '32px',
      },
      h6: {
        fontSize: '20px',
        lineHeight: '24px',
      },
    },
  },
};

export default desktopTheme;
