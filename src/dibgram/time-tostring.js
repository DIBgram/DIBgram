
/**
 * Converts a date and time to a short string.
 * - If the date is in the last 24 hours, the time is displayed in the format HH:MM.
 * - If the date is in the last 7 days, the weekday is displayed.
 * - If the date is older, the date is displayed in the format DD.MM.YY.
 * @param {Date|Number} date Input date
 */
export function smallDateTimeToString(date) {
    if(typeof date == 'number') date= TdLibDateToDate(date);
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    if (date.getTime() >= yesterday.getTime()) {
        return timeToString(date);
    } else if (date.getTime() >= lastWeek.getTime()) {
        return weekdayToString(date);
    } else {
        return dateToString(date);
    }
}

/**
 * Formats time in 12-hour format
 * @param {Date|Number} date input date
 */
export function timeToString(date) {
    if(typeof date == 'number') date= TdLibDateToDate(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

/**
 * Formats weekday in WWW format
 * @param {Date|Number} date input date
 */
export function weekdayToString(date) {
    if(typeof date == 'number') date= TdLibDateToDate(date);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[date.getDay()];
}

/**
 * Formats date in DD.MM.YY format
 * @param {Date|Number} date input date
 */
export function dateToString(date) {
    if(typeof date == 'number') date= TdLibDateToDate(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = String(date.getFullYear()).slice(2);
    return `${day}.${month}.${year}`;
}

export function TdLibDateToDate(tdLibDate) {
    return new Date(tdLibDate * 1000);
}