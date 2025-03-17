export const approx = (num = 0, fractionDigits = 2) => {
  return Number.parseFloat(num.toFixed(fractionDigits));
};

/** Safely parses a value to a number and guards against NaN and negative zero. */
export const toSafeNumber = (input: unknown, defaultValue = 0) => {
  const value = Number(input);
  return Number.isNaN(value) || Object.is(value, -0) ? defaultValue : value;
};

export const formatNumber = (num: number, digits = 1) => {
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

  const match = [...LOOKUP].reverse().find((item) => num >= item.value) || {
    value: 1,
    symbol: "",
  };

  const scaledNum = (num / match.value).toFixed(Math.abs(digits));
  return scaledNum.replace(TRAILING_ZERO_REGEX, "$1") + match.symbol;
};
