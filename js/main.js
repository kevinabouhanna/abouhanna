// Body styling and greeting message based on local time
// different greeting messages based on local time
const myDate = new Date();
const helloHand = '<span class="hello"> 👋🏼</span>';
let hrs = myDate.getHours();

let greet;

if (hrs >= 4 && hrs < 12)
    greet = 'Good Morning' + helloHand;
else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon' + helloHand;
else
    greet = 'Good Evening' + helloHand;

document.getElementById('greetingHuman').innerHTML = greet;

// add day or night class to body based on local time
if (document.body) {
    if (hrs >= 4 && hrs <= 17) {
        document.body.className = "light";
    } else {
        document.body.className = "dark";
    }
}

// change the title when the user moves to another tab
window.onblur = function () { document.title = 'Please come back 🥺'; }
window.onfocus = function () { document.title = 'Kevin Abou Hanna'; }
