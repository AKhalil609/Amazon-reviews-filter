import React from "react";
import store from "../../store";
import moment from "moment";
/**
 * Sorten the reviewed item title
 * @method formatTitle
 * @param {string} title - Reviewed product title.
 * @param {string} initDate - date of the first review recived.
 * @returns {string} - Sortened reviewed item title
 */
export const formatTitle = title => {
  if (title.length > 11) return title.slice(0, 15) + "...";
  else return title;
};

/**
 *
 * @method grouper
 * @param {string} date - Review date.
 * @param {string} initDate - date of the first review recived.
 * @returns {string} - Month or Week or day based on the state of the group
 */
export const grouper = (date, initDate) => {
  let group = store.getState().posts.group;
  switch (group || "month") {
    case "month":
      return monthGroup(date, initDate);
    case "week":
      return weekGroup(date, initDate);
    case "day":
      return dayGroup(date);
    default:
      break;
  }
};

/**
 * Group Reviews based on month
 * @method monthGroup
 * @param {string} date - Review date.
 * @returns {string} - <h4/> tag with the name of the month
 */
let monthOrder = "new";
let currentMonth;
let monthChecker;
export const monthGroup = (date, initDate) => {
  let unformatDate = date;
  date = new Date(date);
  const month = date.toLocaleString("en-us", { month: "long" });

  // returns the month if its the first item on the list
  if (unformatDate === initDate && (currentMonth && monthChecker) !== initDate) {
    monthChecker = initDate
    currentMonth = month;
    return <h4>{month}</h4>;
  }

  // return null when the month of the review is the same as the last one
  if (currentMonth === month) return null;

  // Check if the order was changed
  if (store.getState().posts.order !== monthOrder) {
    monthOrder = store.getState().posts.order;
    currentMonth = month;
    return <h4>{currentMonth}</h4>;
  }

  currentMonth = month;
  return <h4>{month}</h4>;
};

/**
 * Group Reviews based on week
 * @method weekGroup
 * @param {string} date - Review date.
 * @returns {string} - <h4/> tag with the week date range
 */
let startOfWeek;
let days = [];
let endOfWeek;
let Weekchecker; // used to check if the first item was grouped or not
export let weekGroup = (date, initDate) => {

  if (
    !days.includes(formatDate(date)) ||
    (date === initDate && Weekchecker !== initDate)
  ) {
    Weekchecker = initDate;
    days = [];
    startOfWeek = moment(new Date(date)).startOf("isoWeek");
    endOfWeek = moment(new Date(date)).endOf("isoWeek");

    var day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(formatDate(day.toDate()));
      day = day.clone().add(1, "d");
    }

    // returns week date range when the differance between the two dates is greater than 7
    // based on the order provided by the user
      return `${formatDate(startOfWeek).slice(0, 5)} - ${formatDate(
        endOfWeek
      ).slice(0, 5)}`;
    
  }
  return null;
};

/**
 * Group Reviews based on day
 * @method dayGroup
 * @param {string} date - Review date.
 * @returns {string} - <h4/> tag with the day
 */
let currDay;
let orderChange = "new";
export let dayGroup = date => {
  // check on the status of the reviews order
  if (store.getState().posts.order !== orderChange) {
    currDay = date;
    orderChange = store.getState().posts.order;
    return formatDate(new Date(date)).slice(0, 5);
  }
  // returns nothing when the current and previous dates are the same
  if (currDay === date) {
    return null;
  }
  // sets the crrDay to the new date and returns the day after formating it
  currDay = date;
  return formatDate(new Date(date)).slice(0, 5);
};

/**
 * formats the date to dd.mm.yyy
 * @method formatDate
 * @param {string} date - Review date.
 * @returns {string} - the formated date
 */
export let formatDate = date => {
  let today = new Date(date);
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = dd + "." + mm + "." + yyyy;
  return today;
};
