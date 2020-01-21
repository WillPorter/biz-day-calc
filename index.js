import moment from 'moment';
var momenth = require('moment-holiday');

let btn = document.querySelector('#biz-button');

let endDateFinder = function (date, days) {
    date = moment(date); // use a clone

    while (days > 0) {
      date = date.add(1, 'days');
      // decrease "days" only if it's a weekday.
      if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
        days -= 1;
      }
    }
    //format and return date
    date = moment(date).format();
    return date;
  }

let findHolidays = function (start, end) {
    let holidays = momenth(start).holidaysBetween(end);
    return holidays;
}

let addHolidays = function (date, days) {
    date = moment(date); // use a clone

    while (days > 0) {
      date = date.add(1, 'days');
      // decrease "days" only if it's a weekday.
      if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
        days -= 1;
      }
    }
    //format and return date
    date = moment(date).format();
    return date;
  }


//on button click, grab the start date and number of hours
btn.addEventListener('click', function(event){

    let msg = '';
    let startDateRaw = document.querySelector('.start-date').value;
    let startDate    = moment(startDateRaw);
    let hours        = document.querySelector('.hours').value;
    let daysInput    = Math.ceil(hours / 6);

    //target errors or results if they exist from previous attempts
    let errorRemoval = document.querySelector('.error-message');
    let resultRemoval = document.querySelector('.results');

    //remove previous messages if they exist
    if(errorRemoval) {
        errorRemoval.remove();
    }
    if(resultRemoval) {
        resultRemoval.remove();
    }

    //check to make sure start date is entered
    if(startDateRaw == '') {

        let errorNotice = document.createElement('div');
        errorNotice.classList.add('error-message');
        msg = 'please enter the project start date';
        errorNotice.innerHTML = msg;
        
        //add the errornotice div to the end of the contents of the body tag
        document.body.appendChild(errorNotice);
        return;
    }

    //check to make sure the number of hours is a valid number and display error if not
    if(isNaN(hours) || hours == '' ) {
        let errorNotice = document.createElement('div');
        errorNotice.classList.add('error-message');
        msg = 'please enter a valid number for the "Estimated project hours" field';
        errorNotice.innerHTML = msg;
        
        //add the errornotice div to the end of the contents of the body tag
        document.body.appendChild(errorNotice);
        return;
        }

        //run the function to the the ending date of project and store it in raw end date
        let rawEndDate = endDateFinder(startDate, daysInput);
        let rawEndDateFormatted = moment(rawEndDate).format('dddd, MMMM Do YYYY');
        console.log(rawEndDateFormatted);


        //find the holidays in between the raw end date
        let holidays = findHolidays(startDate, rawEndDate);
        console.log(holidays);
        let numberOfHolidays = holidays.length;
        console.log(numberOfHolidays);


        //factor in number of holidays into project end date
        let endDateIncHolidays = addHolidays(rawEndDate, numberOfHolidays);
        let endDateFormatted = moment(endDateIncHolidays).format('dddd, MMMM Do YYYY');
        console.log(endDateFormatted);


        //create div to display ending date
        let resultDiv = document.createElement('div');
            resultDiv.classList.add('results');
            resultDiv.innerHTML = `Your project will be finished on: ${endDateFormatted} <br/>
            There were ${numberOfHolidays} vacation days factored into this date.<br/>
            Not including vacation days the project would have ended on: ${rawEndDateFormatted}
            `;
            document.body.appendChild(resultDiv);

    
});

