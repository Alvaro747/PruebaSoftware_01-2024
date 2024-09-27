export default function nextDay(referenceDate) {
    // parse the reference date in the 'DD/MM/YYYY' format
    const dateParts = referenceDate.split("/");
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months in JavaScript are counted from 0 to 11
    const year = parseInt(dateParts[2]);
  
    //  create a Date object with the reference date
    const date = new Date(year, month, day);
  
    // increment the date by one day
    date.setDate(date.getDate() + 1);
  
    // format the new date in the 'DD/MM/YYYY' format
    const newDay = date.getDate().toString().padStart(2, "0");
    const newMonth = (date.getMonth() + 1).toString().padStart(2, "0"); // add 1 because months are counted from 0
    const newYear = date.getFullYear();
  
    return `${newDay}/${newMonth}/${newYear}`;
  }