
//          Ping host
// ==============================================================================
document.getElementById("btn-ping").addEventListener("click", function (e) {
    let ipAddress = document.getElementById("ip-address").value;
    document.getElementById("ping-responce").innerHTML = "";
    // сериализуем данные в json
    let ipserver = JSON.stringify({ ip: ipAddress });
    console.log(ipserver);
    fetch('/ping', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: ipserver,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            displayResponce(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

function displayResponce(data) {
    document.getElementById("ping-responce").innerHTML = data.msg;
}

//          Check is mid_server running
// ==============================================================================
document.getElementById("btn-open-page").addEventListener("click", openMidServerPage);

function openMidServerPage() {
    window.open("http://82.209.203.205:3055", "_blank");
}

//          Get list of calendars from MySql server 
//          using mid_server
// ==============================================================================
document.getElementById("btn-get-calendars").addEventListener("click", getCalendarsList);

function getCalendarsList() {

    // using fetch

    fetch('http://82.209.203.205:3055/calendars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: ""
    })
        .then(res => res.json())
        .then(data => {
            // enter you logic when the fetch is successful
            console.log(data);
            createHtmlCalendarList(data);
        })
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })

}

function createHtmlCalendarList(data) {
    let calendarDiv = document.getElementById("calendar-list");
    let listElement = document.createElement('ul');

    calendarDiv.appendChild(listElement);

    for (let i = 0; i < data.length; i++) {
        let listItem = document.createElement('li');
        listItem.innerHTML = data[i].cal_name;
        listElement.appendChild(listItem);
    }

}

//          Get list of events from MySql server 
//          using mid_server
// ==============================================================================

document.getElementById("btn-get-events").addEventListener("click", getEventsList);

function getEventsList() {

    // using fetch

    fetch('http://82.209.203.205:3055/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: ""
    })
        .then(res => res.json())
        .then(data => {
            // enter you logic when the fetch is successful
            console.log(data);
            createEventTable(data);
        })
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })

}
//          Create event table
// ==============================================================================
function createEventTable(data) {
    document.getElementById('div-table').classList.remove('d-none');
    if (data.length == 0) {
        alert('Something goes wrong!');
        return;
    }
    let tblBody = document.getElementById('events-table-body');
    tblBody.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');
        let cell = document.createElement("td");
        cell.innerHTML = data[i].id;
        row.appendChild(cell);

        cell = document.createElement("td");
        // console.log(events[i].id_cal);
        cell.innerHTML = data[i].cal_name;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.innerHTML = data[i].event_name;
        row.appendChild(cell);

        cell = document.createElement("td");
        let eventStartDate = data[i].start_date.slice(0, 10);
        cell.innerHTML = eventStartDate;
        row.appendChild(cell);

        cell = document.createElement("td");
        let eventEndDate = data[i].end_date.slice(0, 10);
        cell.innerHTML = eventEndDate;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.innerHTML = data[i].notes;
        row.appendChild(cell);

        cell = document.createElement("td");
        cell.innerHTML = data[i].location;
        row.appendChild(cell);


        tblBody.appendChild(row)
    }
    tbl.append(tblBody)

}


//          Work with time and timezone
// ==============================================================================
let str_date;
let str_time;
let dtObj;
document.getElementById('btn-get-txt').addEventListener('click', getString);

function getString() {
    str_date = document.getElementById('date-picker').value;
    str_time = document.getElementById('hours').value + ':' + document.getElementById('minutes').value;
    // console.log(str_date,str_time);
    let lbl = document.getElementById('lbl-data');
    lbl.innerHTML = str_date + ' ' + str_time;

    dtObj = new Date(lbl.innerHTML);
    let lbl_obj = document.getElementById('lbl-data-obj');
    lbl_obj.innerHTML = dtObj;
    // console.log(dt);
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    // console.log(dt.getTimezoneOffset() / 60);

    document.getElementById('btn-get-tzone').disabled = false;
    document.getElementById('btn-get-tz-offset').disabled = false;
    document.getElementById('btn-get-UTC').disabled = false;

}
//          Get timezone
// ==============================================================================
document.getElementById('btn-get-tzone').addEventListener('click', getTimeZone);

function getTimeZone() {
    document.getElementById('lbl-tzone').innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

//          Get TimezoneOffset         
// ==============================================================================
document.getElementById('btn-get-tz-offset').addEventListener('click', getTimeZoneOffset);

function getTimeZoneOffset() {
    document.getElementById('lbl-tz-offset').innerHTML = dtObj.getTimezoneOffset() / 60;

}

//          Get Date in UTC format         
// ==============================================================================
document.getElementById('btn-get-UTC').addEventListener('click', getTimeUTC);

function getTimeUTC() {
    document.getElementById('lbl-UTC').innerHTML = dtObj.toISOString();

    // console.log(dtObj.toISOString());
}