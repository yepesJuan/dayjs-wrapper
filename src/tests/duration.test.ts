import { dateTimeEST } from "../index";

describe("dateTimeDuration", () => {
  const millisecondsMs = 15000;
  const secondsMs = 1500;
  const minutesMs = 9000000;
  const hourMs = 86400000;
  const dayMs = 604800000;

  it("milliseconds method should return the duration in milliseconds", () => {
    const datedateTimeDuration = dateTimeEST().duration(millisecondsMs);
    const milliseconds = datedateTimeDuration.milliseconds();
    expect(milliseconds).toBe(0);
  });

  it("asMilliseconds method should return the duration in milliseconds", () => {
    const datedateTimeDuration = dateTimeEST().duration(millisecondsMs);
    const asMilliseconds = datedateTimeDuration.asMilliseconds();
    expect(asMilliseconds).toBe(millisecondsMs);
  });

  it("seconds method should return the duration in seconds", () => {
    const datedateTimeDuration = dateTimeEST().duration(secondsMs);
    const seconds = datedateTimeDuration.seconds();
    expect(seconds).toBe(1);
  });

  it("asSeconds method should return the duration in seconds", () => {
    const datedateTimeDuration = dateTimeEST().duration(secondsMs);
    const asSeconds = datedateTimeDuration.asSeconds();
    expect(asSeconds).toBe(1.5);
  });

  it("minutes method should return the duration in minutes", () => {
    const datedateTimeDuration = dateTimeEST().duration(minutesMs);
    const minutes = datedateTimeDuration.minutes();
    expect(minutes).toBe(30);
  });

  it("asMinutes method should return the duration in minutes", () => {
    const datedateTimeDuration = dateTimeEST().duration(minutesMs);
    const asMinutes = datedateTimeDuration.asMinutes();
    expect(asMinutes).toBe(150);
  });

  it("hours method should return the duration in hours", () => {
    const datedateTimeDuration = dateTimeEST().duration(hourMs);
    const hours = datedateTimeDuration.hours();
    expect(hours).toBe(0);
  });

  it("asHours method should return the duration in hours", () => {
    const datedateTimeDuration = dateTimeEST().duration(hourMs);
    const asHours = datedateTimeDuration.asHours();
    expect(asHours).toBe(24);
  });

  it("days method should return the duration in days", () => {
    const datedateTimeDuration = dateTimeEST().duration(dayMs);
    const days = datedateTimeDuration.days();
    expect(days).toBe(7);
  });

  it("asDays method should return the duration in days", () => {
    const datedateTimeDuration = dateTimeEST().duration(dayMs);
    const asDays = datedateTimeDuration.asDays();
    expect(asDays).toBe(7);
  });

  it("weeks method should return the duration in weeks", () => {
    const datedateTimeDuration = dateTimeEST().duration(1, "year");
    const weeks = datedateTimeDuration.weeks();
    expect(weeks).toBe(52);
  });

  it("asWeeks method should return the duration in weeks", () => {
    const datedateTimeDuration = dateTimeEST().duration(7, "days");
    const asWeeks = datedateTimeDuration.asWeeks();
    expect(asWeeks).toBe(1);
  });

  it("months method should return the duration in months", () => {
    const datedateTimeDuration = dateTimeEST().duration(5, "weeks");
    const months = datedateTimeDuration.months();
    expect(months).toBe(1);
  });

  it("asMonths method should return the duration in months", () => {
    const datedateTimeDuration = dateTimeEST().duration(13, "months");
    const asMonths = datedateTimeDuration.asMonths();
    expect(asMonths).toBe(13);
  });

  it("years method should return the duration in years", () => {
    const datedateTimeDuration = dateTimeEST().duration(53, "weeks");
    const years = datedateTimeDuration.years();
    expect(years).toBe(1);
  });

  it("asYears method should return the duration in years", () => {
    const datedateTimeDuration = dateTimeEST().duration(53, "years");
    const asYears = datedateTimeDuration.asYears();
    expect(asYears).toBe(53);
  });

  it("toJSON method should return the duration in JSON format", () => {
    const datedateTimeDuration = dateTimeEST().duration(5, "m");
    const toJSON = datedateTimeDuration.toJSON();
    expect(toJSON).toBe("PT5M");
  });

  it("toISOString method should return the duration in ISO format", () => {
    const datedateTimeDuration = dateTimeEST().duration(1, "d");
    const toISOString = datedateTimeDuration.toISOString();
    expect(toISOString).toBe("P1D");
  });

  it("format method should return the duration in specified format", () => {
    const datedateTimeDuration = dateTimeEST().duration(0.5, "days");
    const format = datedateTimeDuration.format("HH:mm:ss");
    expect(format).toBe("12:00:00");
  });
});
