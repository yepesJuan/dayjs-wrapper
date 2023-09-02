import { dateTime, dateTimeEST } from "../index";
import { DateTime, UsaTimeZone, dateFormats } from "../types";

describe("standardDate util", () => {
  it("should return the date util when inputDate is UTC and timezone is specified", () => {
    const inputDate = "2023-05-11T10:00:00.000Z";
    const expected = "2023-05-11T10:00:00-07:00";
    const expectedToISOString = "2023-05-11T17:00:00.000Z";

    const standardDate = dateTime(inputDate, { timezone: UsaTimeZone.PT });

    expect(standardDate.format()).toEqual(expected);
    expect(standardDate.toISOString()).toEqual(expectedToISOString);
  });

  it("should return the date util when inputDate has an offset and timezone is specified", () => {
    const inputDate = "2023-05-11T10:00:00.000-03:00";
    const expected = "2023-05-11T13:00:00-07:00";
    const expectedToISOString = "2023-05-11T20:00:00.000Z";

    const standardDate = dateTime(inputDate, { timezone: UsaTimeZone.PT });

    expect(standardDate.format()).toEqual(expected);
    expect(standardDate.toISOString()).toEqual(expectedToISOString);
  });

  it("should be able to use number as param", () => {
    const inputDate = 1683850000000;
    const date = dateTimeEST(inputDate).format("MM/DD/YYYY");
    expect(date).toEqual("05/11/2023");
  });

  it("should return current date when using now", () => {
    const expectedDate = new Date();
    jest.useFakeTimers();
    jest.setSystemTime(expectedDate);

    const standardDate = dateTime().now();

    expect(standardDate.toDate()).toEqual(expectedDate);
    jest.useRealTimers();
  });

  it("should return Dayjs instance for valid date input for local time", () => {
    const inputDate = "2023-05-11T10:00:00Z";
    const result = dateTime().getDateTime(inputDate);
    expect(result.isValid()).toBe(true);
  });

  it("should return Dayjs instance for valid date input for timezone", () => {
    const inputDate = "2022-05-20T14:00:00Z";
    const expectedOutput = "2022-05-20T14:00:00-04:00"; // expected output in America/New_York timezone
    const result = dateTimeEST(inputDate);
    expect(result.format()).toEqual(expectedOutput);
  });

  it("should return current time in Dayjs instance for undefined input", () => {
    const result = dateTime().now();
    expect(result.isValid()).toBeTruthy();
  });

  it("format should return the correctly formatted date string", () => {
    const date = "2023-05-01T12:30:00Z";
    const formatString = "YYYY-MM-DD HH:mm";
    const expectedFormattedDate = "2023-05-01 21:30";
    const result = dateTime(date)
      .convertToZone("Asia/Tokyo")
      .format(formatString);
    expect(result).toBe(expectedFormattedDate);
  });

  it("should format America/Buenos Aires date to America/New York", () => {
    const date = dateTime("2023-05-01T05:00:00Z").convertToZone(
      "America/Buenos_Aires"
    );
    const newYorkDate = dateTime(date).convertToZone("America/New_York");
    expect(date.utc().format()).toBe("2023-05-01T05:00:00+00:00");
    expect(date.utc().format(dateFormats.ISOFull)).toBe(
      "2023-05-01T05:00:00.000"
    );
    expect(date.format()).toBe("2023-05-01T02:00:00-03:00");
    expect(newYorkDate.format()).toBe("2023-05-01T01:00:00-04:00");
  });

  it("should create a new DateTime instance with the same date", () => {
    const originalDate = dateTime("2023-05-02");
    const clonedDate = originalDate.clone();
    expect(clonedDate.toISOString()).toBe(originalDate.toISOString());
    expect(clonedDate).not.toBe(originalDate);
  });
});

describe("standardDate util manipulate", () => {
  let testTime: DateTime;
  beforeEach(() => {
    testTime = dateTimeEST("2023-05-02T10:00:00Z");
  });

  it("should add the specified duration to the date", () => {
    const result = testTime.add(1, "day");
    expect(result.format(dateFormats.ISO)).toEqual("2023-05-03");
  });

  it("should subtract the specified duration from the date", () => {
    const result = testTime.subtract(2, "month");
    expect(result.format(dateFormats.ISO)).toEqual("2023-03-02");
  });

  it("should return the timestamp in seconds", () => {
    const dateJS = new Date("2023-05-02T10:00:00Z");
    const date = dateTimeEST(dateJS);

    const expectedTimestamp = Math.floor(dateJS.getTime() / 1000);
    const dateTimeUnix = date.unix();

    expect(dateTimeUnix).toBe(expectedTimestamp);
  });

  it("should return the time in milliseconds", () => {
    const dateJS = new Date("2023-05-02T10:00:00Z");
    const date = dateTimeEST(dateJS);

    const expectedTimestamp = Math.floor(dateJS.getTime());
    const dateTimeUnix = date.unixMilliseconds();

    expect(dateTimeUnix).toBe(expectedTimestamp);
  });

  it("should calculate the difference between two dates", () => {
    const otherDate = dateTime("2023-05-01");
    const result = testTime.diff(otherDate, "day");
    expect(result).toEqual(1);
  });

  it("should set the date to the end of the specified unit", () => {
    const result = testTime.endOf("month");
    expect(result.format(dateFormats.ISO)).toEqual("2023-05-31");
  });

  it("should set the date to the start of the specified unit", () => {
    const result = testTime.startOf("year");
    expect(result.format(dateFormats.ISO)).toEqual("2023-01-01");
  });

  it("should correctly chain multiple methods", () => {
    const result = testTime
      .startOf("month")
      .add(2, "days")
      .subtract(1, "week")
      .endOf("week")
      .format();
    expect(result).toEqual("2023-04-29T23:59:59-04:00");
  });
});

describe("standardDate util query", () => {
  let testTime: DateTime;
  beforeEach(() => {
    testTime = dateTime("2023-05-02T10:00:00-04:00");
  });

  it("should return the date in ISO 8601 format", () => {
    expect(testTime.toISOString()).toBe("2023-05-02T14:00:00.000Z");
  });

  it("should check if the date is the same as the provided date", () => {
    const sameDate = dateTime("2023-05-02T14:00:00Z");
    const differentDate = dateTime("2023-05-12T10:30:00").utc();
    expect(differentDate.isUTC()).toBe(true);
    expect(testTime.isSame(sameDate)).toBe(true);
    expect(testTime.isSame(differentDate)).toBe(false);
  });

  it("should check if a date is between two others dates", () => {
    const date1 = testTime.add(1, "hour");
    const date2 = testTime.subtract(1, "hour");
    expect(testTime.isBetween(date1, date2)).toBe(true);
  });

  it("should check if the date is before the provided date", () => {
    const laterDateTime = testTime.add(1, "minute");
    expect(testTime.isBefore(testTime)).toBe(false);
    expect(testTime.isBefore(laterDateTime)).toBe(true);
  });

  it("should check if the date is the same as or before the provided date", () => {
    const laterDateTime = testTime.add(1, "minute");
    const earlierDateTime = testTime.subtract(1, "hour");
    expect(testTime.isSameOrBefore(testTime)).toBe(true);
    expect(testTime.isSameOrBefore(laterDateTime)).toBe(true);
    expect(testTime.isSameOrBefore(earlierDateTime)).toBe(false);
  });

  it("should check if the date is after the provided date", () => {
    const laterDateTime = testTime.add(1, "minute");
    const earlierDateTime = testTime.subtract(1, "hour");
    expect(testTime.isAfter(earlierDateTime)).toBe(true);
    expect(testTime.isAfter(laterDateTime)).toBe(false);
  });

  it("should check if the date is the same as or after the provided date", () => {
    const laterDateTime = testTime.add(1, "minute");
    const earlierDateTime = testTime.subtract(1, "hour");
    expect(testTime.isSameOrAfter(testTime)).toBe(true);
    expect(testTime.isSameOrAfter(earlierDateTime)).toBe(true);
    expect(testTime.isSameOrAfter(laterDateTime)).toBe(false);
  });
});

describe("standardDate util get + set", () => {
  it("should set the specified date and time component using set and hour ", () => {
    const initialDate = dateTimeEST("2023-07-06T00:00:00Z");
    const updatedDate = initialDate.set("hour", 2);
    expect(updatedDate.get("h")).toBe(2);
    const setHourDate = updatedDate.set("h", 4);
    expect(setHourDate.get("h")).toBe(4);
  });
});

describe("standardDate util duration", () => {
  test("getDuration should return correct duration", () => {
    const durationMS = 9000000;
    const format = "HH:mm:ss";
    const expectedDuration = "02:30:00";
    const result = dateTime().duration(durationMS).format(format);
    expect(result).toBe(expectedDuration);
  });
});

describe("standardDateEST util", () => {
  test("it should generate the date in EST", () => {
    const inputDate = "2023-05-11T10:00:00.000Z";
    const expected = "2023-05-11T10:00:00-04:00";
    const expectedToISOString = "2023-05-11T14:00:00.000Z";

    const standardDate = dateTimeEST(inputDate);

    expect(standardDate.format()).toEqual(expected);
    expect(standardDate.toISOString()).toEqual(expectedToISOString);
  });

  test("it should return invalid date when given an invalid date", () => {
    const date = dateTimeEST("", { inputFormat: "hh:ss" });
    const date2 = dateTime("", {
      inputFormat: "hh:ss",
      timezone: "not a timezone",
    });
    expect(date.isValid()).toBeFalsy();
    expect(date2.isValid()).toBeFalsy();
  });
});
