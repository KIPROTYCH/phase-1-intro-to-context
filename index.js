// Your code here
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeesArray) {
    return employeesArray.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let dates = employeeRecord.timeInEvents.map(event => event.date);
    let wages = dates.map(date => wagesEarnedOnDate(employeeRecord, date));
    return wages.reduce((total, wage) => total + wage, 0);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
}
