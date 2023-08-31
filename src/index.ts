import { Duration } from "dayjs/plugin/duration";
import dayjs from "./config";
import {
  DateTime,
  DateTimeOptions,
  UnitType,
  ManipulationUnit,
  OperationUnit,
  QuarterUnit,
  UsaTimeZone,
  DateTimeDuration,
  Boundary,
} from "./types";

class DayjsDateTime implements DateTime {
  private date: dayjs.Dayjs;

  constructor(
    date?: DateTime | string | number | Date | null,
    options?: DateTimeOptions
  ) {
    this.date = Object.freeze(this.toDayjs(date, options));
  }

  /**
   * A new DateTime object representing the current date and time.
   */
  now(): DateTime {
    return this.clone();
  }

  /**
   * A new DateTime object based on the provided date.
   * @param date - The date value. It can be a DateTime object or a string representing a date.
   */
  getDateTime(date?: DateTime | string | number | Date): DateTime {
    const clone = this.clone() as DayjsDateTime;
    clone.date = this.toDayjs(date);
    return clone;
  }

  /**
   * Sets the DateTime object to UTC mode.
   * @param local - Specifies whether to use local time. Defaults to false.
   * @see https://day.js.org/docs/en/plugin/utc
   */
  utc(local?: boolean): DateTime {
    const clone = this.clone() as DayjsDateTime;
    clone.date = this.date.utc(local);
    return clone;
  }

  /**
   * Converting to a timezone.
   * @param timezone - The timezone to set.
   * @see https://day.js.org/docs/en/plugin/timezone
   */
  convertToZone(timezone?: string, local?: boolean): DateTime {
    const clone = this.clone() as DayjsDateTime;
    clone.date = this.date.tz(timezone, local);
    return clone;
  }

  /**
   * Formats the DateTime object using the provided format string.
   * @param formatString - The format string to use. Defaults to ISO8601.
   * @see https://day.js.org/docs/en/display/format
   */
  format(formatString?: string): string {
    return this.date.format(formatString);
  }

  /**
   * Sets the specified date and time component of the DateTime object.
   * @param unit - The unit of the date and time component to set. Case insensitive, and support plural and short form
   * @param value - The value to set for the specified unit.
   * @returns A new DateTime object with the updated date and time component.
   * @see https://day.js.org/docs/en/get-set/set
   */
  set(unit: UnitType, value: number): DateTime {
    const clone = this.clone() as DayjsDateTime;
    clone.date = this.date.set(unit, value);
    return clone;
  }

  /**
   * Gets various date and time component the DateTime object.
   * @param unit - The unit of the date and time component to get. Case insensitive, and support plural and short form
   * @returns A number of the specified string getter.
   * @see https://day.js.org/docs/en/get-set/get
   */
  get(unit: UnitType): number {
    return this.date.get(unit);
  }

  /**
   * Returns the Unix seconds timestamp, since the Unix Epoch.
   * @see https://day.js.org/docs/en/display/unix-timestampt
   */
  unix(): number {
    return this.date.unix();
  }

  /**
   * Returns the Unix milliseconds timestamp, since the Unix Epoch.
   * @see https://day.js.org/docs/en/display/unix-timestamp-milliseconds
   */
  unixMilliseconds(): number {
    return this.date.valueOf();
  }

  /**
   * Adds a duration to the DateTime object.
   * @param duration - The duration to add.
   * @param unit - The unit of the duration.
   * @see https://day.js.org/docs/en/manipulate/add
   */
  add(duration: number, unit?: ManipulationUnit): DateTime {
    const clone = this.clone() as DayjsDateTime;
    clone.date = this.date.add(duration, unit);
    return clone;
  }

  /**
   * Subtracts a duration to the DateTime object.
   * @param duration - The duration to subtract.
   * @param unit - The unit of the duration.
   * @see https://day.js.org/docs/en/manipulate/subtract
   */
  subtract(duration: number, unit?: ManipulationUnit): DateTime {
    const clone = this.clone() as DayjsDateTime;
    clone.date = this.date.subtract(duration, unit);
    return clone;
  }

  /**
   * Calculates the difference between the DateTime object and the provided date.
   * @param date - The date to calculate the difference with.
   * @param unit - The unit of the difference. Defaults to milliseconds.
   * @param float - Specifies whether to return a floating-point value. Defaults to false.
   * @see https://day.js.org/docs/en/display/difference
   */
  diff(
    date: DateTime | string | number | Date,
    unit?: QuarterUnit,
    float?: boolean
  ): number {
    return this.date.diff(this.toDayjs(date), unit, float);
  }

  /**
   * Sets the DateTime object to the end of the specified unit.
   * @param type - The unit to set the end of.
   * @see https://day.js.org/docs/en/manipulate/end-of
   */
  endOf(type: OperationUnit): DateTime {
    const clone = this.clone() as DayjsDateTime;
    clone.date = this.date.endOf(type);
    return clone;
  }

  /**
   * Sets the DateTime object to the start of the specified unit.
   * @param type - The unit to set the start of.
   * @see https://day.js.org/docs/en/manipulate/start-of
   */
  startOf(type: OperationUnit): DateTime {
    const clone = this.clone() as DayjsDateTime;
    clone.date = this.date.startOf(type);
    return clone;
  }

  /**
   * Returns the ISO 8601 string representation of the DateTime object.
   * @see https://day.js.org/docs/en/display/as-iso-string
   */
  toISOString(): string {
    return this.date.toISOString();
  }

  /**
   * Checks if the DateTime object is between two different dates.
   * @param date1 - The date1 to compare.
   * @param date2 - The date2 to compare.
   * @param unit - The unit to compare. Defaults to milliseconds.
   * @param inclusivity - Specifies whether the comparison is inclusive or exclusive. Defaults to ().
   * @see https://day.js.org/docs/en/plugin/is-between
   */
  isBetween(
    date1: DateTime,
    date2: DateTime,
    unit?: OperationUnit,
    inclusivity?: Boundary
  ): boolean {
    return this.date.isBetween(
      this.toDayjs(date1),
      this.toDayjs(date2),
      unit,
      inclusivity
    );
  }

  /**
   * Checks if the DateTime object is the same as the provided date.
   * @param date - The date to compare.
   * @param unit - The unit to compare. Defaults to milliseconds.
   * @see https://day.js.org/docs/en/query/is-same
   */
  isSame(
    date: DateTime | string | number | Date,
    unit?: OperationUnit
  ): boolean {
    return this.date.isSame(this.toDayjs(date), unit);
  }

  /**
   * Checks if the DateTime object is before the provided date.
   * @param date - The date to compare.
   * @param unit - The unit to compare. Defaults to milliseconds.
   * @see https://day.js.org/docs/en/query/is-before
   */
  isBefore(
    date: DateTime | string | number | Date,
    unit?: OperationUnit
  ): boolean {
    return this.date.isBefore(this.toDayjs(date), unit);
  }

  /**
   * Checks if the DateTime object the same as or before the provided date.
   * @param date - The date to compare.
   * @param unit - The unit to compare. Defaults to milliseconds.
   * @see https://day.js.org/docs/en/plugin/is-same-or-before
   */
  isSameOrBefore(
    date: DateTime | string | number | Date,
    unit?: OperationUnit
  ): boolean {
    return (
      this.date.isSame(this.toDayjs(date), unit) ||
      this.date.isBefore(this.toDayjs(date), unit)
    );
  }

  /**
   * Checks if the DateTime object is after the provided date.
   * @param date - The date to compare.
   * @param unit - The unit to compare. Defaults to milliseconds.
   * @see https://day.js.org/docs/en/query/is-after
   */
  isAfter(
    date: DateTime | string | number | Date,
    unit?: OperationUnit
  ): boolean {
    return this.date.isAfter(this.toDayjs(date), unit);
  }

  /**
   * Checks if the DateTime object the same as or after the provided date.
   * @param date - The date to compare.
   * @param unit - The unit to compare. Defaults to milliseconds.
   * @see https://day.js.org/docs/en/plugin/is-same-or-after
   */
  isSameOrAfter(
    date: DateTime | string | number | Date,
    unit?: OperationUnit
  ): boolean {
    return (
      this.date.isSame(this.toDayjs(date), unit) ||
      this.date.isAfter(this.toDayjs(date), unit)
    );
  }

  /**
   * Checks if the DateTime object is valid.
   * @see https://day.js.org/docs/en/parse/is-valid
   */
  isValid(): boolean {
    return this.date.isValid();
  }
  /**
   * Checks if the DateTime object is UTC.
   * @see https://day.js.org/docs/en/plugin/utc#isutc-mode-isutc
   */
  isUTC(): boolean {
    return this.date.isUTC();
  }

  /**
   * Creates a new instance of DayjsDuration.
   * @param durationMs - The length of time in milliseconds
   * @param unit - Optional If you want to create a duration with a unit of measurement other than milliseconds, you can pass the unit of measurement as well.
   * @see https://day.js.org/docs/en/durations/creating
   */
  duration(durationMs: number, unit?: ManipulationUnit): DateTimeDuration {
    return new DayjsDuration(durationMs, unit);
  }

  /**
   * Returns the native Date object representation of the DateTime object.
   */
  toDate(): Date {
    return this.date.toDate();
  }

  /**
   * Returns a clone of the DateTime object.
   * @see https://day.js.org/docs/en/parse/dayjs-clone
   */
  clone(): DateTime {
    return new DayjsDateTime(this);
  }

  private toDayjs(
    date?: DateTime | string | number | Date | null,
    options?: DateTimeOptions
  ): dayjs.Dayjs {
    const inputDate =
      date instanceof DayjsDateTime
        ? date.date.clone()
        : (date as string | number | Date | null);

    let dateValue;
    const { inputFormat, timezone, strict } = options || {};

    const tz = dayjs.tz.guess();

    try {
      if (timezone) {
        dateValue = inputFormat
          ? dayjs.tz(inputDate, inputFormat, tz)
          : dayjs.tz(inputDate, tz);
      } else {
        dateValue = inputFormat
          ? dayjs(inputDate, inputFormat, strict)
          : dayjs(inputDate);
      }
    } catch (error) {
      dateValue = dayjs("Invalid Date");
    }

    return dateValue;
  }
}

/**
 * Creates a new instance of DayjsDateTime.
 * @param date - The initial date value. If not provided it represents the current date and time.
 * @param timezone - Optional timezone to use. Defaults to undefined.
 * @param inputFormat - Optional strict parsing string. Strict parsing requires that the format and input match exactly, including delimiters.
 * @param strict - Optional strict parsing. Defaults to false.
 * If timezone, date provided can not be invalid.
 * @see https://github.com/iamkun/dayjs/issues/1915
 */
export const dateTime = (
  date?: DateTime | string | number | Date | null,
  options?: DateTimeOptions
): DateTime => new DayjsDateTime(date, options);

/**
 * Creates a new instance of DayjsDateTime with ET Timezone.
 * @param date - The initial date value. If not provided it represents the current date and time.
 * @param inputFormat - Optional strict parsing string. Strict parsing requires that the format and input match exactly, including delimiters.
 * @param strict - Optional strict parsing. Defaults to false.
 * If timezone, date provided can not be invalid.
 * @see https://github.com/iamkun/dayjs/issues/1915
 */
export const dateTimeEST = (
  date?: DateTime | string | number | Date | null,
  options?: Omit<DateTimeOptions, "timezone">
): DateTime =>
  new DayjsDateTime(date, { ...options, timezone: UsaTimeZone.ET });

/****************************************** Duration ************************************************/
class DayjsDuration implements DateTimeDuration {
  private duration: Duration;

  constructor(durationMs: number, unit?: ManipulationUnit) {
    this.duration = Object.freeze(dayjs.duration(durationMs, unit));
  }

  milliseconds(): number {
    return this.duration.milliseconds();
  }
  asMilliseconds(): number {
    return this.duration.asMilliseconds();
  }
  seconds(): number {
    return this.duration.seconds();
  }
  asSeconds(): number {
    return this.duration.asSeconds();
  }
  minutes(): number {
    return this.duration.minutes();
  }
  asMinutes(): number {
    return this.duration.asMinutes();
  }
  hours(): number {
    return this.duration.hours();
  }
  asHours(): number {
    return this.duration.asHours();
  }
  days(): number {
    return this.duration.days();
  }
  asDays(): number {
    return this.duration.asDays();
  }
  weeks(): number {
    return this.duration.weeks();
  }
  asWeeks(): number {
    return this.duration.asWeeks();
  }
  months(): number {
    return this.duration.months();
  }
  asMonths(): number {
    return this.duration.asMonths();
  }
  years(): number {
    return this.duration.years();
  }
  asYears(): number {
    return this.duration.asYears();
  }
  toJSON(): string {
    return this.duration.toJSON();
  }
  toISOString(): string {
    return this.duration.toISOString();
  }
  format(formatStr?: string): string {
    return this.duration.format(formatStr);
  }
}

console.log(dateTime().format("YYYY-MM-DD HH:mm:ss"));
