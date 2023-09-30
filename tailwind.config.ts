import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
      },
    },
  },
  plugins: [],
};
export default config;
