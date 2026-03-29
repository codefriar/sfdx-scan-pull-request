// DO NOT EDIT: This file is managed by Illuminated Cloud. Any external changes will be discarded.

/**
 * Copyright (c) 2015-present, Rose Silver Software LLC, All rights reserved.
 * Note this may be a full or partial derivative of works by:
 * Copyright (c) 2024, Salesforce, Inc. All rights reserved.
 * See SALESFORCE_LICENSE.txt for details.
 */

/**
 * The language, e.g., <code>en-US</code>.
 */
declare module "@salesforce/i18n/lang" {
    const lang: string;
    export default lang;
}

/**
 * The direction of text, e.g., <code>ltr</code>.
 */
declare module "@salesforce/i18n/dir" {
    const dir: string;
    export default dir;
}

/**
 * The locale, e.g., <code>en-US</code>.
 */
declare module "@salesforce/i18n/locale" {
    const locale: string;
    export default locale;
}

/**
 * The currency code, e.g., <code>USD</code>.
 */
declare module "@salesforce/i18n/currency" {
    const currency: string;
    export default currency;
}

/**
 * The numeric first day of the week, e.g., <code>1</code>.
 */
declare module "@salesforce/i18n/firstDayOfWeek" {
    const firstDayOfWeek: number;
    export default firstDayOfWeek;
}

/**
 * Calendar formats for the user's locale.
 */
declare module "@salesforce/i18n/calendarData" {
    const calendarData: string;
    export default calendarData;
}

/**
 * Default calendar format based on locale.
 */
declare module "@salesforce/i18n/defaultCalendar" {
    const defaultCalendar: string;
    export default defaultCalendar;
}

/**
 * Default numbering system format based on locale.
 */
declare module "@salesforce/i18n/defaultNumberingSystem" {
    const defaultNumberingSystem: string;
    export default defaultNumberingSystem;
}

/**
 * The short style date format, e.g., <code>MM/dd/yyyy</code>.
 */
declare module "@salesforce/i18n/dateTime.shortDateFormat" {
    const dateTimeShortDateFormat: string;
    export default dateTimeShortDateFormat;
}

/**
 * The medium style date format, e.g., <code>MMM d, yyyy</code>.
 */
declare module "@salesforce/i18n/dateTime.mediumDateFormat" {
    const dateTimeMediumDateFormat: string;
    export default dateTimeMediumDateFormat;
}

/**
 * The long style date format, e.g., <code>MMMM d, yyyy</code>.
 */
declare module "@salesforce/i18n/dateTime.longDateFormat" {
    const dateTimeLongDateFormat: string;
    export default dateTimeLongDateFormat;
}

/**
 * The short style date/time format, e.g., <code>MM/dd/yyyy h:mm a</code>.
 */
declare module "@salesforce/i18n/dateTime.shortDateTimeFormat" {
    const dateTimeShortDateTimeFormat: string;
    export default dateTimeShortDateTimeFormat;
}

/**
 * The medium style date/time format, e.g., <code>MMM d, yyyy h:mm:ss a</code>.
 */
declare module "@salesforce/i18n/dateTime.mediumDateTimeFormat" {
    const dateTimeMediumDateTimeFormat: string;
    export default dateTimeMediumDateTimeFormat;
}

/**
 * Long style datetime format.
 */
declare module "@salesforce/i18n/dateTime.longDateTimeFormat" {
    const dateTimeLongDateTimeFormat: string;
    export default dateTimeLongDateTimeFormat;
}

/**
 * The short style time format, e.g., <code>h:mm a</code>.
 */
declare module "@salesforce/i18n/dateTime.shortTimeFormat" {
    const dateTimeShortTimeFormat: string;
    export default dateTimeShortTimeFormat;
}

/**
 * The medium style time format, e.g., <code>h:mm:ss a</code>.
 */
declare module "@salesforce/i18n/dateTime.mediumTimeFormat" {
    const dateTimeMediumTimeFormat: string;
    export default dateTimeMediumTimeFormat;
}

/**
 * The long style time format, e.g., <code>h:mmss a</code>.
 */
declare module "@salesforce/i18n/dateTime.longTimeFormat" {
    const dateTimeLongTimeFormat: string;
    export default dateTimeLongTimeFormat;
}

/**
 * The number format, e.g., <code>#, ##0,###</code>.
 */
declare module "@salesforce/i18n/number.numberFormat" {
    const numberNumberFormat: string;
    export default numberNumberFormat;
}

/**
 * The percent format, e.g., <code>#, ###0%</code>.
 */
declare module "@salesforce/i18n/number.percentFormat" {
    const numberPercentFormat: string;
    export default numberPercentFormat;
}

/**
 * The currency format, e.g., <code>#, ##0.00</code>.
 */
declare module "@salesforce/i18n/number.currencyFormat" {
    const numberCurrencyFormat: string;
    export default numberCurrencyFormat;
}

/**
 * The currency symbol, e.g., <code>$</code>.
 */
declare module "@salesforce/i18n/number.currencySymbol" {
    const numberCurrencySymbol: string;
    export default numberCurrencySymbol;
}

/**
 * Percent sign symbol.
 */
declare module "@salesforce/i18n/number.percentSign" {
    const numberPercentSign: string;
    export default numberPercentSign;
}

/**
 * Plus sign symbol.
 */
declare module "@salesforce/i18n/number.plusSign" {
    const numberPlusSign: string;
    export default numberPlusSign;
}

/**
 * Minus sign symbol.
 */
declare module "@salesforce/i18n/number.minusSign" {
    const numberMinusSign: string;
    export default numberMinusSign;
}

/**
 * Decimal separator.
 */
declare module "@salesforce/i18n/number.decimalSeparator" {
    const numberDecimalSeparator: string;
    export default numberDecimalSeparator;
}

/**
 * Grouping separator.
 */
declare module "@salesforce/i18n/number.groupingSeparator" {
    const numberGroupingSeparator: string;
    export default numberGroupingSeparator;
}

/**
 * Exponential symbol.
 */
declare module "@salesforce/i18n/number.exponentialSymbol" {
    const numberExponentialSymbol: string;
    export default numberExponentialSymbol;
}

/**
 * Exponential symbol.
 */
declare module "@salesforce/i18n/number.exponentialSign" {
    const numberExponentialSign: string;
    export default numberExponentialSign;
}

/**
 * Superscript exponent symbol.
 */
declare module "@salesforce/i18n/number.superscriptExponentSign" {
    const numberSuperscriptExponentSign: string;
    export default numberSuperscriptExponentSign;
}

/**
 * Per mille symbol.
 */
declare module "@salesforce/i18n/number.perMilleSign" {
    const numberPerMilleSign: string;
    export default numberPerMilleSign;
}

/**
 * Infinity symbol.
 */
declare module "@salesforce/i18n/number.infinity" {
    const numberInfinity: string;
    export default numberInfinity;
}

/**
 * String for "Not a Number."
 */
declare module "@salesforce/i18n/number.nan" {
    const numberNan: string;
    export default numberNan;
}

/**
 * The time zone, e.g., <code>America/Chicago</code>.
 */
declare module "@salesforce/i18n/timeZone" {
    const timeZone: string;
    export default timeZone;
}

/**
 * Unicode characters for numerical values.
 */
declare module "@salesforce/i18n/common.digits" {
    const commonDigits: string;
    export default commonDigits;
}

/**
 * Supplementary calendar data for common calendar formats.
 */
declare module "@salesforce/i18n/common.calendarData" {
    const commonCalendarData: string;
    export default commonCalendarData;
}

/**
 * Specifies whether an eastern name style is used.
 */
declare module "@salesforce/i18n/isEasternNameStyle" {
    const isEasternNameStyle: boolean;
    export default isEasternNameStyle;
}

/**
 * Specifies whether to show dates in the Japanese Imperial calendar format.
 */
declare module "@salesforce/i18n/showJapaneseCalendar" {
    const showJapaneseCalendar: boolean;
    export default showJapaneseCalendar;
}