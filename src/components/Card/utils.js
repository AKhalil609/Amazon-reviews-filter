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
