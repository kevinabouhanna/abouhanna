// remove .html from url
var url = window.location.href;
if (url.indexOf('/index.html') > -1) {
    url = url.replace('index.html','');
} else {
    url = url.replace('.html','');
}
window.history.replaceState(null, null, url);

const myDate = new Date();
let hrs = myDate.getHours();
const helloHand = '<span class="hello"> 👋🏼</span>';

let greet;

if (hrs >= 4 && hrs < 12)
    greet = 'Good Morning' + helloHand;
else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon' + helloHand;
else
    greet = 'Good Evening' + helloHand;

// greeting message
if (document.getElementById('greetingHuman') != null) {
    document.getElementById('greetingHuman').innerHTML = greet;
}

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
window.onfocus = function () { document.title = 'Kevin Abou Hanna - Product Designer and Frontend Developer'; }
