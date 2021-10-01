// show focus only when user is tabbing, you can find it's relevant CSS code in main.css
function handleFirstTab(e) {
  if (e.keyCode === 9) { // the "I am a keyboard user" key
    document.body.classList.add('user__is__tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
}
window.addEventListener('keydown', handleFirstTab);

const myDate = new Date();
let hrs = myDate.getHours();

let greet;

if (hrs >= 4 && hrs < 12)
  greet = 'Good Morning';
else if (hrs >= 12 && hrs <= 17)
  greet = 'Good Afternoon';
else
  greet = 'Good Evening';

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
