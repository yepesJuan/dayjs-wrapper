import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import toObject from "dayjs/plugin/toObject";
import isBetween from "dayjs/plugin/isBetween";
import WeekofYear from "dayjs/plugin/weekOfYear";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(toObject);
dayjs.extend(isBetween);
dayjs.extend(WeekofYear);

export default dayjs;
