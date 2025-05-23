import { Temporal } from "@js-temporal/polyfill";

import { getSiteSettings } from "@/constants/settings";
import { isServer } from "@/helpers/detect-platform";

type DatetimeParams = Partial<Intl.DateTimeFormatOptions> & {
  locales?: string;
};

export const createDateFormatter = (params: DatetimeParams = {}) => {
  const { locales = "en-US", ...options } = params;
  const defaultLocale = getSiteSettings().language;

  const locale: Temporal.LocalesArgument =
    locales ||
    (isServer || "undefined" === typeof navigator || "string" !== typeof navigator.language
      ? defaultLocale
      : navigator.language);

  const format = (isoString: string | Temporal.ZonedDateTimeLike) => {
    const zonedDateTime =
      "string" === typeof isoString
        ? Temporal.Instant.from(isoString).toZonedDateTimeISO(Temporal.Now.timeZoneId())
        : Temporal.ZonedDateTime.from(isoString);

    return zonedDateTime.toLocaleString(locale, {
      year: "numeric", // Year (2023)
      month: "long", // Full month name (January)
      day: "2-digit", // Day of the month (3),
      ...options,
    });
  };

  const toISOString = (isoString: string | Temporal.ZonedDateTimeLike) => {
    const zonedDateTime =
      "string" === typeof isoString
        ? Temporal.Instant.from(isoString).toZonedDateTimeISO(Temporal.Now.timeZoneId())
        : Temporal.ZonedDateTime.from(isoString);

    return zonedDateTime.withTimeZone("UTC").toString({ timeZoneName: "never" });
  };

  return { format, toISOString };
};

// class DateTimeFormatter {
//   constructor() {}
//   public format = (isoString: string | Temporal.ZonedDateTimeLike) => {
//     const zonedDateTime =
//       "string" === typeof isoString
//         ? Temporal.Instant.from(isoString).toZonedDateTimeISO(Temporal.Now.timeZoneId())
//         : Temporal.ZonedDateTime.from(isoString);

//     return zonedDateTime.toLocaleString(locale, {
//       year: "numeric", // Year (2023)
//       month: "long", // Full month name (January)
//       day: "2-digit", // Day of the month (3),
//       ...options,
//     });
//   };

//   public toISOString = (isoString: string | Temporal.ZonedDateTimeLike) => {
//     const zonedDateTime =
//       "string" === typeof isoString
//         ? Temporal.Instant.from(isoString).toZonedDateTimeISO(Temporal.Now.timeZoneId())
//         : Temporal.ZonedDateTime.from(isoString);

//     return zonedDateTime.withTimeZone("UTC").toString({ timeZoneName: "never" });
//   };
// }

// export const dfmt = new DateTimeFormatter();
export const dfmt = createDateFormatter();
