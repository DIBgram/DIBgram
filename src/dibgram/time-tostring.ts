import React from 'react';
import __, { __fmt, __pl } from './language-pack/language-pack';
import TdApi from './TdWeb/td_api';

/**
 * Converts a date and time to a short string.
 * - If the date is in the last 20 hours, the time is displayed in the format HH:MM.
 * - If the date is in the last 7 days, the weekday is displayed.
 * - If the date is older, the date is displayed in the format DD.MM.YY.
 * @param date Input date
 */
export function smallDateTimeToString(date: Date|number): string {
    if(typeof date == 'number') date= TdLibDateToDate(date);
    const now = new Date();
    const yesterday = new Date(now.getTime() - 20 * 60 * 60 * 1000);
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
 * @param date input date
 */
export function timeToString(date: Date|number): string {
    if(typeof date == 'number') date= TdLibDateToDate(date);
    let hours = date.getHours();
    let minutes: string|number = date.getMinutes();
    const am_pm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${am_pm}`;
}

/**
 * Formats weekday in WWW format
 * @param date input date
 */
export function weekdayToString(date: Date|number): string {
    if(typeof date == 'number') date= TdLibDateToDate(date);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[date.getDay()];
}

/**
 * Formats date in DD.MM.YY format
 * @param date input date
 */
export function dateToString(date: Date|number): string {
    if(typeof date == 'number') date= TdLibDateToDate(date);
    let day: string|number = date.getDate();
    let month: string|number = date.getMonth() + 1;
    const year = String(date.getFullYear()).slice(2);
    if (day < 10) {
        day = `0${day}`;
    }
    if (month < 10) {
        month = `0${month}`;
    }
    return `${day}.${month}.${year}`;
}

/**
 * Converts a future day to a string.  
 * If the day is today, returns 'today'.  
 * If the day is tomorrow, returns 'tomorrow'.  
 * If the day is neither today or tomorrow, returns the month and day. (eg. 'February 12')
 * @param date Input date
 * @returns `today`, `tomorrow` or month+day
 */
export function futureDayToString(date: Date|number): string {
    if(typeof date == 'number') date= TdLibDateToDate(date);
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth()) {
        return 'today';
    } else if (date.getDate() == tomorrow.getDate() && date.getMonth() == tomorrow.getMonth()) {
        return 'tomorrow';
    } else {
        const months= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getDate()}`;
    }
}

/**
 * Converts a duration to string.
 * If the duration is less than 2 minutes, the string is in the format 'X seconds'.
 * If the duration is less than 2 hours, the string is in the format 'X minutes'.
 * If the duration is less than 1 day, the string is in the format 'X hours'.
 * If the duration is longer, the string is in the format 'X days'.
 * @param duration Duration in seconds
 */
export function durationToString(duration: number): string {
    if (duration < 2 * 60) {
        return `${duration} seconds`;
    } else if (duration < 2 * 60 * 60) {
        return `${Math.floor(duration / 60)} minutes`;
    } else if (duration < 24 * 60 * 60) {
        return `${Math.floor(duration / 60 / 60)} hours`;
    } else {
        return `${Math.floor(duration / 24 / 60 / 60)} days`;
    }
}

export function lastSeenToString(status: TdApi.td_UserStatus): React.ReactNode {
    switch (status['@type']) {
        case 'userStatusLastMonth':
            return __('lng_status_last_month');
        
        case 'userStatusLastWeek':
            return __('lng_status_last_week');

        case 'userStatusOffline': {
            const current = Math.floor((new Date().getTime()) / 1000);
            const lastSeen = status.was_online;
            const diff = current - lastSeen; // Difference in seconds
            const diffMinutes = Math.floor(diff / 60);
            const diffHours = Math.floor(diff / 3600);
            
            if (diffMinutes < 1)
            {
                return __('lng_status_lastseen_now');
            }
            if (diffMinutes < 60)
            {
                return __pl('lng_status_lastseen_minutes', diffMinutes);
            }
            if (diffHours < 12)
            {
                return __pl('lng_status_lastseen_hours', diffHours);
            }
            
            const currentDate = TdLibDateToDate(current);
            const lastSeenDate = TdLibDateToDate(lastSeen);

            if (currentDate.getHours() - diffHours >= 0)
            {
                return __fmt('lng_status_lastseen_today', {time: lastSeenDate.toLocaleTimeString('en-US')});
            }
            if (currentDate.getHours() - diffHours < 0 && currentDate.getHours() - diffHours > -24)
            {
                return __fmt('lng_status_lastseen_yesterday', {time: lastSeenDate.toLocaleTimeString('en-US')});
            }
            return __fmt('lng_status_lastseen_date', {date: lastSeenDate.toLocaleDateString('en-US')});
        }

        case 'userStatusRecently':
            return __('lng_status_recently');

        case 'userStatusOnline':
            return __('lng_status_online');

        case 'userStatusEmpty':
        default:
            return __('lng_status_offline');
    }
}

/**
 * Converts a TDLIb unix time to a `Date` object.
 */
export function TdLibDateToDate(tdLibDate: number): Date {
    return new Date(tdLibDate * 1000);
}