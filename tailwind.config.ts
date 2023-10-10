import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/(ui)/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)'],
      },
      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        violet: colors.violet,
        indigo: colors.indigo,
        blue: colors.blue,
        sky: colors.sky,
        lime: colors.lime,
        emerald: colors.emerald,
        green: colors.green,
        amber: colors.amber,
        orange: colors.orange,
        red: colors.red,
        pink: colors.pink,
        purple: colors.purple,
        gray: colors.gray,
        darkBlue: '#1d1e26',
      },
    },
  },
  plugins: [],
};
export default config;
