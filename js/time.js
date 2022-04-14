
function init(){};

// CLOCK:

function currentTime(date){

    let today = new Date(date);

    let year = today.getFullYear();
    let month = today.getMonth();
    let monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let trueMonth = monthList[month];
    let dayNumber = today.getDate();
    let day = today.getDay();
    let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let trueDay = daylist[day];
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    hour = (hour < 10) ? "0" + hour : hour;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    let currentTime = {
        year: year,
        monthNumber: month,
        month: trueMonth,
        dayNumber: dayNumber,
        day: trueDay,
        hour: hour,
        minutes: minutes,
        seconds: seconds
    }
    return currentTime
}

function currentLocation(zone){

    let userCustomLocation = zone.split('/')
    let userCountry = userCustomLocation[1]
    let userCity = userCustomLocation[2]

    let countrySplit = userCountry.split("_")
    let userCustomCountry = countrySplit.join(" ")

    let citySplit = userCity.split("_")
    let userCustomCity = citySplit.join(" ")
    
    let userLocation = {
        country: userCustomCountry,
        city: userCustomCity
    }
    return userLocation
}

function showDateAndLocation(time, location){

    clock = document.querySelector("#showDate__text");
    clock.innerHTML= `${time.day}, ${time.month}, ${time.year}<br>
    ${time.hour}:${time.minutes}:${time.seconds}<br>
    <span class="location">${location.city}, ${location.country}</span>`
}

async function APIrequest() {
    fetch("http://worldtimeapi.org/api/ip")
    .then((response) => response.json())
    .then((json) => {

        let userCustomZone = json.timezone
        let userCustomDate = json.datetime

        showDateAndLocation(currentTime(userCustomDate), currentLocation(userCustomZone))
    })

}

setInterval(APIrequest, 100)


const date = fetch("http://worldtimeapi.org/api/ip")
.then((response)=>response.json())
.then((date)=> {
    return date.datetime
})










