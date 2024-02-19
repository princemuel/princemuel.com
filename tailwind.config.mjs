import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-dark-reader-theme="dark"]'],
  content: [
    "./src/pages/**/*.{astro,js[x,],ts[x,],md[x,]}",
    "./src/layouts/**/*.{astro,js[x,],ts[x,],md[x,]}",
    "./src/components/**/*.{astro,js[x,],ts[x,],md[x,]}",
    "./src/content/**/*.{md[x,]}",
  ],
  corePlugins: {
    float: false,
    container: false,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      "3xs": "24em", // @media (min-width: 384px) { ... }
      "2xs": "30em", // @media (min-width: 480px) { ... }
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        tahiti: {
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
      },
      borderRadius: {
        pill: "100vmax",
      },
      fontFamily: {
        sans: ["__FontSans", ...defaultTheme.fontFamily.sans],
        mono: ["__FontMono", ...defaultTheme.fontFamily.mono],
        serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
      },
      screens: {
        xs: "36em", // @media (min-width: 576px) { ... },
        sm: "40em", // @media (min-width: 640px) { ... }
        md: "48em", // @media (min-width: 768px) { ... }
        lg: "64em", // @media (min-width: 1024px) { ... }
        xl: "80em", // @media (min-width: 1280px) { ... }
        "2xl": "96em", // @media (min-width: 1536px) { ... }
        "3xl": "112.5em", // @media (min-width: 1800px) { ... }
      },

      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0px, -8px, 0)" },
          "50%": { transform: "translate3d(0px, 8px, 0)" },
        },
      },
      cursor: {
        pointer:
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI6SURBVHgBnZRBaxNBGIYnu9uNSW1NlkgMVAl4Cyg5CAUPJlYFTyaX3CohePKUn5BcBA9CfkAvAf+B4sVLBC8eChv05ClKVaQIiUKjabOO77s7E8bUBpsXnrwzu9lvvvm+2bXFccWADRw1XlpWJpNZg+8ACV4kEomNVqtliSW0Am2mUik5HA5luVxmwEe5XC4pltBZ27a38/m8pHq9HoP54KI47ZbT6fQ52H1mRjE7jnFtK5vNrjJzhSuiui5cYA2Z3YN/HwwGYcBischgH8En8BLsKZ5w8VqtdiwoJ5bneeuO49zGeBdFD4OVSqVwu77vh1nS9VgF3SoUCq4ZiJObzAgcgK8sPtVsNqWWvka1221d011wgckI9cPJ5263K7k9NkDXbZH4Xzz3DRRVLcPDycmYBTe6KPV8kUR0Hm+AM0JFvA4+6DpRnU5nNq5UKn85A5jBUOdb8ITO7CrY4dZ0F+dX/5cbmd0Fq6zXb7CPI/F6NBq9bTQa4n/V7/dpI2QmZxfZWugKhm3eNLdI6S5q1/VkozB+BjZB3Dwe6+COZVlP4Ufs7CLV63UGeg8egksieiNmspPJZA6+DZ6DX/MZVqvVMDt1JA6w8GP4NV38ebnxePwy/IEK+FMVWHMIhmr8BnWuwj2hDqwzF+xwMpnsIeCr6XQ6DoJgIKIvhhuLxaZIjm/IEZgAH/ffwX+IqIknvvU8e+fBBlb38JALDxBwrLKTWGwf/gWMzcKfJP3pXjGuBcqlyjAwH/gDZjDKatJ5fJYAAAAASUVORK5CYII="), pointer;',
      },
    },
  },
  plugins: [
    animate,
    typography(),
    plugin(function ({ theme, addUtilities, addVariant, matchUtilities }) {
      addVariant("optional", "&:optional");
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("inverted-colors", "@media (inverted-colors: inverted)");
      addVariant(
        "prose-inline-code",
        '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))',
      );

      matchUtilities({
        "fluid-cols": (value) => ({
          gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${value}), 1fr))`,
        }),
      });

      addUtilities({
        ".fluid-cols-fit": { "--fluid-cols-repeat": "auto-fit" },
        ".fluid-cols-fill": { "--fluid-cols-repeat": "auto-fill" },
      });
      addUtilities({
        ".mask-radial-gradient": {
          maskImage: "radial-gradient(rgba(0, 0, 0, 0.8), transparent 60%)",
        },
        ".mask-linear-gradient-to-b": {
          maskImage:
            "linear-gradient(to bottom, white 0%, white 33%, transparent 90%)",
        },
      });
      addUtilities({
        ".full-w-bg": {
          boxShadow: "0 0 0 100vmax currentColor, 0 0 2rem currentColor",
          clipPath: "inset(0 -100vmax)",
        },

        ".container": {
          "--padding-inline": theme("spacing.4"),

          "--content-maxW": "65rem",
          "--content-size":
            "min(100% - (var(--padding-inline) * 2), var(--content-maxW))",

          "--breakout-maxW": "80rem",
          "--breakout-size": `calc((var(--breakout-maxW) - var(--content-maxW)) / 2)`,

          "--fullWPadding": "minmax(var(--padding-inline), 1fr)",
          "--breakoutPadding": "minmax(0, var(--breakout-size))",

          display: "grid",
          gridTemplateColumns: `[full-width-start] var(--fullWPadding) [breakout-start]
        var(--breakoutPadding) [content-start] var(--content-size) [content-end]
        var(--breakoutPadding) [breakout-end] var(--fullWPadding) [full-width-end]`,
        },
        ".container > :not(.breakout, .full-width)": {
          gridColumn: "content",
        },
        ".breakout": {
          gridColumn: "breakout",
        },
        ".full-width": {
          gridColumn: "full-width",
        },
      });

      // ".grid-cols-auto": {
      //   "--min": "15rem",
      //   gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, var(--min)), 1fr))`,
      // },
    }),
  ],
};
