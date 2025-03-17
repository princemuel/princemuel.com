import "astro/astro-jsx";

declare global {
  namespace astroHTML.JSX {
    type Element = HTMLElement;
  }
}
