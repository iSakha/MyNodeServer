
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
            // createHtmlCalendarList(data);
        })
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })

}