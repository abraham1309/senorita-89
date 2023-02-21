var server="https://lb.pm.gcp.api.ifscore.biz/starz";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
utm= urlParams.get('utm');

const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

if(!regexExp.test(utm))
{
    console.log("no hay utm");
    window.location.href="index.html";
}else
{

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (data.statusCode == "404") {  // not found
                alert("Tenemos una emergencia, comunicate con el organizador del evento por favor");
                return false;
            }
            else if (data.statusCode == "201") { // found
                // found
                console.log(data);
                simplyCountdown('#div-tiempo', {
                    year: data.Y, // required
                    month: data.M, // required
                    day: data.D, // required
                    hours: data.H, // Default is 0 [0-23] integer
                    minutes: data.I, // Default is 0 [0-59] integer
                    seconds: 0, // Default is 0 [0-59] integer
                    words: { //words displayed into the countdown
                        days: { singular: 'DÍAS', plural: 'DÍAS' },
                        hours: { singular: 'HORA', plural: 'HORAS' },
                        minutes: { singular: 'MINUTO', plural: 'MINUTOS' },
                        seconds: { singular: 'SEGUNDO', plural: 'SEGUNDOS' }
                    },
                    plural: true, //use plurals
                    inline: false, //set to true to get an inline basic countdown like : 24 days, 4 hours, 2 minutes, 5 seconds
                    inlineClass: 'simply-countdown-inline', //inline css span class in case of inline = true
                    // in case of inline set to false
                    enableUtc: false, //Use UTC or not - default : false
                    onEnd: function() { return; }, //Callback on countdown end, put your own function here
                    refresh: 1000, // default refresh every 1s
                    sectionClass: 'div-indicador', //section css class
                    amountClass: 'p-numero', // amount css class
                    wordClass: 'p-letra', // word css class
                    zeroPad: false,
                    countUp: false
                });
                $("#igsenorita").attr("href", data.senoritagram);
                $("#igstarz").attr("href", data.starplaygram);

                return true;
            }
        }
        // end of state change: it can be after some time (async)
    };

    xhr.open('POST', server+"/doContador.php", true);
    xhr.send(JSON.stringify({
        "utm":utm
    }));
}







// // Also, you can init with already existing Javascript Object.
// let myElement = document.querySelector('.my-countdown');
// simplyCountdown(myElement, { /* options */ });
//
// let multipleElements = document.querySelectorAll('.my-countdown');
// simplyCountdown(multipleElements, { /* options */ });
