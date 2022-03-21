


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


document.getElementById("btn-open-page").addEventListener("click", openMidServerPage)

function openMidServerPage() {
    window.open("http://82.209.203.205:3055", "_blank");
}
