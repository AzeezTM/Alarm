let currTime = document.getElementById("current-time");
function currentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    //let zone = hh >= 12 ? "PM" : "AM";


    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;
    let zone = hh >= 12 ? "PM" : "AM";


    let time = hh + ":" + mm + ":" + ss;

    currTime.innerText = time
    let t = setTimeout(function () {
        currentTime()
        if (alarm_List.includes(time)) {
            ringing(time);
        }
    }, 1000)

}
currentTime();

function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return "0" + time;
    }
    return time;
}

const myList = document.querySelector(".set-alarms-list");

//Adding Alarm input from user
let alarm_List = [];
const userInput = document.querySelector(".user-input");
userInput.addEventListener("submit", function (e) {
    e.preventDefault();
    const hour = userInput.hour.value;
    const min = userInput.min.value;
    const sec = userInput.sec.value;
    let new_h = formatTime(hour);
    if (new_h === "0") {
        new_h = "00";
    }
    let new_m = formatTime(min);
    if (new_m === "0") {
        new_m = "00";

    }
    let new_s = formatTime(sec);
    if (new_s === "0") {
        new_s = "00";
    }

    const new_Alarm = `${new_h}:${new_m}:${new_s}`;
    if (isNaN(new_Alarm)) {
        if (!alarm_List.includes(new_Alarm)) {
            alarm_List.push(new_Alarm);
            shownew_Alarm(new_Alarm);
            addAlarm.reset();
        } else {
            alert(`alarm for ${new_Alarm} already set.`);
        }
    } else {
        alert("invalid Time Entered");
    }
})

//shownew Alarm FUNCTION AND NEW ALARM TO NEW LIST WITH DELETE BUTTON
function shownew_Alarm(new_Alarm) {
    const html = `
    <li class= "time-list">
        <span class="time">${new_Alarm}</span>
        <button class= "deleteAlarm time-control btn btn-danger" id= "delete-button" onclick = "remove(this.value)" value= ${new_Alarm}>delete</button>
    </li>`;
    myList.innerHTML += html;


}

//AUDIO TO RING ALARM
const audio = new Audio(

    "http://twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3"

);

//ADDING LOOP TO CONTINUE ALARM
audio.loop = true;

//RINGS THE AUDIO AT THE CORRECT TIME
function ringing(time) {
    audio.play();
    audio.play();
    alert(`Hey! it is ${time}`);

}
//FUNCTION TO STOP THE ALARM
const clearAlarm = () => {
    audio.pause();
    clearTimeout(alarmTimeout);
    alert("Alarm cleared");
};

//FUNCTION TO STOP THE ALARM
const mylist = document.getElementsByClassName("set-alarms-list");
myList.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();

    }
})

//REMOVE ALARM FROM ARRAYLIST WHEN ("Delete Alarm") BUTTON is clicked
const remove = (value) => {
    let newList = alarm_List.filter((time) => time != value);
    alarm_List.length = 0;//clear contents
    alarm_List.push.apply(alarm_List, newList);
};