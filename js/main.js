// Body styling and greeting message based on local time
// different greeting messages based on local time
var myDate = new Date();
var hrs = myDate.getHours();

var greet;

if (hrs >= 4 && hrs < 12)
    greet = 'Good Morning 👋🏼';
else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon 👋🏼';
else
    greet = 'Good Evening 👋🏼';

document.getElementById('greetingHuman').innerHTML = greet;

// add day or night class to body based on local time
if (document.body) {
    if (hrs >= 4 && hrs <= 17) {
        document.body.className = "light";
    } else {
        document.body.className = "dark";
    }
}