/*---------------------------------*
            NUMBER UTILS           *
  ---------------------------------*
 */

export function approximate(num = 0, fractionDigits = 2) {
  return Number.parseFloat(num.toFixed(fractionDigits));
}

/** Safely parses a value to a number and guards against NaN and negative zero. */
export const number_guard = (value: unknown, defaultValue = 0) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) || Object.is(parsed, -0) ? defaultValue : parsed;
};

export function format_num(num: number, digits?: number | undefined) {
  if (!num) return "0";

  const LOOKUP = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const TRAILING_ZERO_REGEX = /\.0+$|(\.[0-9]*[1-9])0+$/;

  const { value, symbol } = LOOKUP.slice()
    .reverse()
    .find((item) => num >= item.value) ?? { value: 1, symbol: "" };

  const validDigits = digits ? Math.abs(digits) : 1;

  return (num / value).toFixed(validDigits).replace(TRAILING_ZERO_REGEX, "$1") + symbol;
}
