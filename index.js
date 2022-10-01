/* Your Code Here */

// createEmployeeRecord
// Argument(s)
//  A 4-element Array of a String, String, String, and Number corresponding to a first name, family name, title, and pay rate per hour
// Returns
//   JavaScript Object with keys:
//      firstName
//      familyName
//      title
//      payPerHour
//      timeInEvents
//      timeOutEvents
// Behavior
//  Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
function createEmployeeRecord([firstName, familyName, jobTitle, ratePerHour]){

    const employee = { 
        firstName: firstName,
        familyName: familyName,
        title: jobTitle,
        payPerHour: ratePerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };

    return employee;
}

// createEmployeeRecords
// Argument(s)
//  Array of Arrays
// Returns
//  Array of Objects
// Behavior
//  Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(arrayOfArrays){

    const employeeRecord = arrayOfArrays.map( record => createEmployeeRecord(record));

    return employeeRecord;
}

// createTimeInEvent
// Argument(s)
//  A date stamp ("YYYY-MM-DD HHMM"), where time is expressed in 24-hour standardLinks to an external site.
// Returns
//  The record that was just updated
// Behavior
//  Add an Object with keys:
//      type: Set to "TimeIn"
//      hour: Derived from the argument
//      date: Derived from the argument
function createTimeInEvent(timeStamp){

    const splitTime = timeStamp.split(" ");
    const timeInObject = {
        type: "TimeIn",
        hour: parseInt(splitTime[1]),
        date: splitTime[0],
    }
    this.timeInEvents.push(timeInObject);
   
    return this;
}

// createTimeOutEvent
// Argument(s)
//  A date stamp ("YYYY-MM-DD HHMM"), where time is expressed in 24-hour standardLinks to an external site.
// Returns
// The record that was just updated
// Behavior
//  Add an Object with keys:
//      type: Set to "TimeOut"
//      hour: Derived from the argument
//      date: Derived from the argument
function createTimeOutEvent(timeStamp){
    const splitTime = timeStamp.split(" ");
    const timeOutObject = {
        type: "TimeOut",
        hour: parseInt(splitTime[1]),
        date: splitTime[0],
    }

    this.timeOutEvents.push(timeOutObject);

    return this;
}

// hoursWorkedOnDate
// Argument(s)
//  An employee record Object
//   A date of the form "YYYY-MM-DD"
// Returns
//  Hours worked, an Integer
// Behavior
//  Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(date){

    const timeInHour = this.timeInEvents.find(record => record.date === date);
    const timeOutHour = this.timeOutEvents.find(record => record.date === date);
    
    return (timeOutHour.hour - timeInHour.hour) / 100;
}

// wagesEarnedOnDate
// Argument(s)
//  An employee record Object
//  A date of the form "YYYY-MM-DD"
// Returns
//  Pay owed
// Behavior
//  Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
function wagesEarnedOnDate(date){

    const hoursWorked = hoursWorkedOnDate.call(this,date);
   
    return hoursWorked * this.payPerHour;
}

// allWagesFor
// Argument(s)
//      None
// Returns
//      Sum of pay owed to one employee for all dates, as a number
// Behavior
//      Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. 
//      Amount should be returned as a number. HINT: You will need to find the available dates somehow....
function alllWagesFor(){

    const wagesForDates = this.timeInEvents.map(record => record.date);
   
    const owedForAllDates = wagesForDates.reduce((previousValue, currentValue) => previousValue + wagesEarnedOnDate.call(this, currentValue), 0);

    return owedForAllDates;
}

// findEmployeeByFirstName
// Argument(s)
//      srcArray: Array of employee records
//      firstName: String representing a first name held in an employee record
// Returns
//      Matching record or undefined
// Behavior
//      Test the firstName field for a match with the firstName argument
function findEmployeeByFirstName(srcArray,firstName){

    const employee = srcArray.find(record => record.firstName === firstName);

    return employee;
}
//calculatePayroll
// Argument(s)
//  Array of employee records
// Returns
//  Sum of pay owed to all employees for all dates, as a number
// Behavior
//  Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
function calculatePayroll(employeeRecords){

    const totalOwed = employeeRecords.map(record => allWagesFor.call(record));

    const totalOwedToEmployees = totalOwed.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  
    return totalOwedToEmployees;
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

