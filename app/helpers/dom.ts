import { raise } from "@/helpers/error";

/**
 * Find a DOM element and validate its type.
 * @example
 * const button = $("button", HTMLButtonElement)
 */
export function $<E extends Element>(
  selector: string,
  Constructor: new (...args: unknown[]) => E,
  parent: ParentNode = document,
): E {
  const element =
    parent.querySelector(selector) ?? raise(`Element not found: ${selector}`);
  if (!(element instanceof Constructor)) {
    raise(`Element is not of type ${Constructor.name}: ${selector}`);
  }
  return element;
}

/**
 * Find DOM elements and validate their types.
 * @example
 * const buttons = $$("button", HTMLButtonElement)
 */
export function $$<E extends Element>(
  selector: string,
  Constructor: new (...args: unknown[]) => E,
  parent: ParentNode = document,
): NodeListOf<E> {
  const elements = parent.querySelectorAll(selector);
  for (const element of elements) {
    if (!(element instanceof Constructor)) {
      raise(`Element is not of type ${Constructor.name}: ${selector}`);
    }
  }
  return elements as NodeListOf<E>;
}
