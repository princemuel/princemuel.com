import { getSiteSettings } from "@/config/settings";
import { isServer } from "@/helpers/guards";

import { Temporal } from "temporal-polyfill";

type DatetimeParams = Partial<Intl.DateTimeFormatOptions> & {
  locales?: string;
};

export const createDateFormatter = (params: DatetimeParams = {}) => {
  const { locales = "en-US", ...options } = params;
  const defaultLocale = getSiteSettings().language;

  const locale: Intl.LocalesArgument =
    locales ||
    (isServer ||
    typeof navigator === "undefined" ||
    typeof navigator.language !== "string"
      ? defaultLocale
      : navigator.language);

  const format = (isoString: string | Temporal.ZonedDateTimeLike) => {
    const zonedDateTime =
      typeof isoString === "string"
        ? Temporal.Instant.from(isoString).toZonedDateTimeISO(
            Temporal.Now.timeZoneId(),
          )
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
      typeof isoString === "string"
        ? Temporal.Instant.from(isoString).toZonedDateTimeISO(
            Temporal.Now.timeZoneId(),
          )
        : Temporal.ZonedDateTime.from(isoString);

    return zonedDateTime.withTimeZone("UTC").toString({ timeZoneName: "never" });
  };

  return { format, toISOString };
};

export const dfmt = createDateFormatter();
