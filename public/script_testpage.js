
let test = document.getElementById("ip-address").value;

document.getElementById("btn-ping").addEventListener("click", function (e) {
    console.log('input text:' + test);
    // сериализуем данные в json
    // let ipserver = JSON.stringify({ ip: ipAddress});
    // console.log(ipserver);
//     fetch('/ping', {
//         method: 'POST', // or 'PUT'
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: '',
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
});

