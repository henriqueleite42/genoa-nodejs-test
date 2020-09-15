import moment from "moment-timezone";

import { WeekDaysList, WeekDays, IGetTimeFormmated } from "./types";

moment.tz.setDefault("America/New_York");

type AllowedTypes = Date | number;

// Times

export const ONE_MINUTE = 60 * 1000;

export const ONE_HOUR = 60 * ONE_MINUTE;

export const ONE_DAY = 24 * ONE_HOUR;

export const ONE_WEEK = 7 * ONE_DAY;

export const ONE_MONTH = 30 * ONE_DAY;

export const ONE_YEAR = 365 * ONE_DAY;

/**
 *
 *
 * Class
 *
 *
 */

class Time {
	private _date: number;

	/**
	 * If no value is passed as a parameter, the current date will be used
	 *
	 * @param initialDate Initial date as number or date object
	 */
	public constructor(initialDate?: AllowedTypes) {
		if (initialDate) {
			this._date = Time.convertToNumber(initialDate);
		} else {
			this._date = Time.nowNumber();
		}
	}

	// Public

	/**
	 * Set a new date
	 *
	 * @param date Date in number format or Date Objetc
	 */
	public set setDate(date: AllowedTypes) {
		this._date = Time.convertToNumber(date);
	}

	/**
	 * Returns milliseconds since epoch
	 */
	public get getMillis() {
		return this._date;
	}

	/**
	 * Returns a Date Object
	 */
	public get getDate() {
		return new Date(this._date);
	}

	/**
	 *
	 *
	 * Minutes
	 *
	 *
	 */

	/**
	 * Add Minutes
	 *
	 * @param minutes Minutes to be added
	 */
	public addMinutes(minutes: number) {
		this._date += minutes * ONE_MINUTE;

		return this;
	}

	/**
	 * Remove Minutes
	 *
	 * @param minutes Minutes to be removed
	 */
	public removeMinutes(minutes: number) {
		this._date -= minutes * ONE_MINUTE;

		return this;
	}

	/**
	 *
	 *
	 * Hours
	 *
	 *
	 */

	/**
	 * Add Hours
	 *
	 * @param hours Hours to be added
	 */
	public addHours(hours: number) {
		this._date += hours * ONE_HOUR;

		return this;
	}

	/**
	 * Remove Hours
	 *
	 * @param hours Hours to be removed
	 */
	public removeHours(hours: number) {
		this._date -= hours * ONE_HOUR;

		return this;
	}

	/**
	 *
	 *
	 * Days
	 *
	 *
	 */

	/**
	 * Add Days
	 *
	 * @param days Days to be add
	 */
	public addDays(days: number) {
		this._date += days * ONE_DAY;

		return this;
	}

	/**
	 * Remove Days
	 *
	 * @param days Days to be removed
	 */
	public removeDays(days: number) {
		this._date -= days * ONE_DAY;

		return this;
	}

	/**
	 *
	 *
	 * Weeks
	 *
	 *
	 */

	/**
	 * Add Weeks
	 *
	 * @param weeks Weeks to be added
	 */
	public addWeeks(weeks: number) {
		this._date += weeks * ONE_WEEK;

		return this;
	}

	/**
	 * Remove Weeks
	 *
	 * @param weeks Weeks to be removed
	 */
	public removeWeeks(weeks: number) {
		this._date -= weeks * ONE_WEEK;

		return this;
	}

	/**
	 *
	 *
	 * Months
	 *
	 *
	 */

	/**
	 * Add Months
	 *
	 * @param months Months to be added
	 */
	public addMonths(months: number) {
		this._date += months * ONE_MONTH;

		return this;
	}

	/**
	 * Remove Months
	 *
	 * @param months Months to be removed
	 */
	public removeMonths(months: number) {
		this._date -= months * ONE_MONTH;

		return this;
	}

	/**
	 *
	 *
	 * Years
	 *
	 *
	 */

	/**
	 * Add Years
	 *
	 * @param years Years to be added
	 */
	public addYears(years: number) {
		this._date += years * ONE_YEAR;

		return this;
	}

	/**
	 * Remove Years
	 *
	 * @param years Years to be removed
	 */
	public removeYears(years: number) {
		this._date -= years * ONE_YEAR;

		return this;
	}

	// Comparação

	/**
	 * Checks whether the date passed is after the class date
	 */
	public isAfter(date?: AllowedTypes) {
		return this._date > (date ? Time.convertToNumber(date) : Time.nowNumber());
	}

	/**
	 * Checks whether the date passed is earlier than the class date
	 */
	public isBefore(date?: AllowedTypes) {
		return this._date < (date ? Time.convertToNumber(date) : Time.nowNumber());
	}

	/**
	 * Checks whether it is the same date as the class date
	 */
	public isEqual(date?: AllowedTypes) {
		return (
			this._date === (date ? Time.convertToNumber(date) : Time.nowNumber())
		);
	}

	/**
	 * Checks if 2 dates are on the same day
	 */
	public isSameDay(date: AllowedTypes) {
		const actualDateFormatted = Time.convertToDate(this._date);
		const dateFormated = Time.convertToDate(date);

		const isSameYear =
			actualDateFormatted.getFullYear() === dateFormated.getFullYear();

		if (!isSameYear) return false;

		const isSameMonth =
			actualDateFormatted.getMonth() === dateFormated.getMonth();

		if (!isSameMonth) return false;

		const isSameDay = actualDateFormatted.getDate() === dateFormated.getDate();

		if (!isSameDay) return false;

		return true;
	}

	// Miscellaneous

	/**
	 * Sets the date as the next day of the week
	 * Ex: If you want the date for the next Monday,
	 * use: getNextWeekDay("monday")
	 *
	 * @param weekDay Week Day
	 */
	public getNextWeekDay(weekDay: WeekDaysList) {
		const nowMillis = this.getMillis;

		let newTime = nowMillis - (nowMillis % ONE_DAY);
		newTime -= ((this.getDate.getDay() - WeekDays[weekDay]) % 7) * ONE_DAY;
		newTime += 3 * ONE_HOUR; // Add a diferença de timezone

		this._date = newTime;

		return this;
	}

	// Static

	public static isDate(date: any) {
		return date instanceof Date;
	}

	public static isValid(date: AllowedTypes) {
		const instanceOfmoment = moment(date);

		const isValid = instanceOfmoment.isValid();

		return isValid;
	}

	public static nowNumber() {
		return moment().valueOf();
	}

	public static nowDate() {
		return moment().toDate();
	}

	public static getDateFormatted(
		dateParam?: AllowedTypes,
		format: IGetTimeFormmated = "YMD-HYPEN"
	) {
		function fixLength(number: number) {
			return number.toString().padStart(2, "0");
		}

		const date = this.convertToDate(dateParam);

		const day = fixLength(date.getDate());
		const month = fixLength(date.getMonth() + 1);
		const year = date.getFullYear();

		switch (format) {
			case "MY-HYPEN":
				return `${month}-${year}`;
			case "MY-SLASH":
				return `${month}/${year}`;
			case "DMY-HYPEN":
				return `${day}-${month}-${year}`;
			case "DMY-SLASH":
				return `${day}/${month}/${year}`;
			case "YMD-HYPEN":
				return `${year}-${month}-${day}`;
			case "YMD-SLASH":
				return `${year}/${month}/${day}`;
		}
	}

	public static convertToNumber(date?: AllowedTypes) {
		if (!date) {
			return Time.nowNumber();
		}

		if (typeof date === "number") {
			return date;
		}

		return (date as Date).getTime();
	}

	public static convertToDate(date?: AllowedTypes) {
		if (!date) {
			return Time.nowDate();
		}

		if (typeof date === "number") {
			return new Date(date);
		}

		return date;
	}
}

export default Time;
