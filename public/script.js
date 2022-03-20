document.getElementById('btn-hg8245a-settings').addEventListener('click', openHG8245);
document.getElementById('btn-nas4free-wakeup').addEventListener('click', nas4freeWakeUp);
document.getElementById('btn-homepc-wakeup').addEventListener('click', homePCWakeUp);


function openHG8245() {
    console.log('open settings');
    window.location.href = "http://192.168.100.1/index.asp";
    // window.location.href = "https://www.google.com/";
}

function nas4freeWakeUp()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "/wol/nas4free", false ); // false for synchronous request
    xmlHttp.send( null );
    window.alert(xmlHttp.responseText);
    return xmlHttp.responseText;
}

function homePCWakeUp()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "/wol/homepc", false ); // false for synchronous request
    xmlHttp.send( null );
    window.alert(xmlHttp.responseText);
    return xmlHttp.responseText;
}