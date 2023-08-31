export type TimeShortUnit = "d" | "D" | "M" | "y" | "h" | "m" | "s" | "ms";
export type TimeUnit =
  | "millisecond"
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "month"
  | "year"
  | "date";
export type TimePluralUnit = `${TimeUnit}s`;
export type UnitType = TimeShortUnit | TimeUnit | TimePluralUnit;
export type OperationUnit = UnitType | "week" | "weeks" | "w";
export type QuarterUnit = UnitType | "quarter" | "quarters" | "Q";
export type ManipulationUnit = Exclude<OperationUnit, "date" | "dates">;
export type Boundary = "()" | "[]" | "[)" | "(]";

/**
 * @description Date utility formats date
 */
export const dateFormats = {
  fullDateTime: "YYYY-MM-DD-HH.mm.ss.SSSSSS",
  ISO: "YYYY-MM-DD",
  USA: "MM/DD/YYYY",
  ISODecimal: "YYYYMMDD",
  ISOFull: "YYYY-MM-DDTHH:mm:ss.SSS",
  ISOFullZ: "YYYY-MM-DDTHH:mm:ss.SSSZ",
  ISODateTime: "YYYY-MM-DDTHH:mm:ss",
  localDate: "LL",

  YYMD: "YY-M-D",
  YYMMD: "YY-MM-D",
  MDDYY: "MDDYY",
  MM_DD_YYYY: "MM-DD-YYYY",
  MMDDYYYY: "MMDDYYYY",

  YYDDDD: "YYDDDD",
  MMDDYY: "MMDDYY",
  MMDD: "MMDD",

  hours: "HH:mm:ss",
  timestamp: "HHmmss",
  hoursMinutes: "HH:mm",
  hoursMinutesA: "hh:mm A",
  days: "DD",
  dayAlphaShort: "ddd",
  dayAlphaLong: "dddd",
  month: "MM",
  monthShort: "M",
  yearShort: "YY",
  year: "YYYY",
};

export const cityISOFormats = [
  dateFormats.ISO,
  dateFormats.ISODecimal,
  dateFormats.ISOFull,
  dateFormats.ISOFullZ,
  dateFormats.ISODateTime,
];

export enum UsaTimeZone {
  ET = "America/New_York",
  CT = "America/Chicago",
  MT = "America/Denver",
  PT = "America/Los_Angeles",
  AK = "America/Anchorage",
  HI = "Pacific/Honolulu",
}

export interface DateTimeOptions {
  inputFormat?: string;
  timezone?: string;
  strict?: boolean;
}

export interface DateTime {
  now(): DateTime;
  getDateTime(date?: DateTime | string): DateTime;
  utc(local?: boolean): DateTime;
  convertToZone(timezone?: string, local?: boolean): DateTime;
  format(formatString?: string): string;
  set(unit: UnitType, value: number): DateTime;
  get(unit: UnitType): number;
  unix(): number;
  unixMilliseconds(): number;
  add(duration: number, unit?: ManipulationUnit): DateTime;
  subtract(duration: number, unit?: ManipulationUnit): DateTime;
  diff(
    date: DateTime | string | number | Date,
    unit?: QuarterUnit,
    float?: boolean
  ): number;
  endOf(type: OperationUnit): DateTime;
  startOf(type: OperationUnit): DateTime;
  toISOString(): string;
  isBetween(
    date1: DateTime | string | number | Date,
    date2: DateTime | string | number | Date,
    unit?: OperationUnit,
    inclusivity?: Boundary
  ): boolean;
  isSame(
    date: DateTime | string | number | Date,
    unit?: OperationUnit
  ): boolean;
  isBefore(
    date: DateTime | string | number | Date,
    unit?: OperationUnit
  ): boolean;
  isSameOrBefore(
    date: DateTime | string | number | Date,
    unit?: OperationUnit
  ): boolean;
  isAfter(
    date: DateTime | string | number | Date,
    unit?: OperationUnit
  ): boolean;
  isSameOrAfter(
    date: DateTime | string | number | Date,
    unit?: OperationUnit
  ): boolean;
  isValid(): boolean;
  isUTC(): boolean;
  duration(durationMs: number, unit?: ManipulationUnit): DateTimeDuration;
  toDate(): Date;
  clone(): DateTime;
}

export interface DateTimeDuration {
  milliseconds(): number;
  asMilliseconds(): number;
  seconds(): number;
  asSeconds(): number;
  minutes(): number;
  asMinutes(): number;
  hours(): number;
  asHours(): number;
  days(): number;
  asDays(): number;
  weeks(): number;
  asWeeks(): number;
  months(): number;
  asMonths(): number;
  years(): number;
  asYears(): number;
  toJSON(): string;
  toISOString(): string;
  format(formatStr?: string): string;
}
