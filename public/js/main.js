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


document.addEventListener("DOMContentLoaded", function () {
  const placeholder = document.querySelector('.parallax-placeholder')
  const footer = document.querySelector('footer-component')
  let placeholderTop,
    ticking

  window.addEventListener('resize', onResize)

  // On DOM Content Load, set placeholder height to be equal to footer height
  updateHolderHeight()
  checkFooterHeight()
  let intervalIndex = 0;
  const myInterval = setInterval(updateFooterWidth, 250)
  // On window resize, update placeholder height to be equal to footer height
  function onResize() {
    updateHolderHeight()
    checkFooterHeight()
    updateFooterWidth()
  }

  function updateFooterWidth() {
    if (intervalIndex > 6) {
      clearInterval(myInterval);
    }
    var scrollDiv = document.body.querySelector('.parallax-container');
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    footer.style.width = `calc(100% - ${scrollbarWidth}px)`;
    intervalIndex++;
  }

  // Placeholder should always match footer height
  function updateHolderHeight() {
    placeholder.style.height = `${footer.offsetHeight}px`
  }

  function checkFooterHeight() {
    if (footer.offsetHeight > window.innerHeight) { // Check if footer is taller than window height
      window.addEventListener('scroll', onScroll)
      footer.style.bottom = 'unset'
      footer.style.top = '0px'
    } else { // If footer height is not greater than window height, bottom is 0 for normal parllax 
      window.removeEventListener('scroll', onScroll)
      footer.style.top = 'unset'
      footer.style.bottom = '0px'
    }
  }

  function onScroll() {
    placeholderTop = Math.round(placeholder.getBoundingClientRect().top)
    requestTick()
  }

  function requestTick() {
    if (!ticking) requestAnimationFrame(updateBasedOnScroll)
    ticking = true
  }

  function updateBasedOnScroll() {
    // Reset the tick so we can capture the next onScroll
    ticking = false

    // When main content disappears from view, start to move footer up 
    // in conjunction with placeholder top value (in relation to viewport)
    if (placeholderTop <= 0) {
      footer.style.top = `${placeholderTop}px` // match footer top value with placeholder's top value
    }
  }

  // Fix scroll not working when mouse/touch is over the parallax footer
  let ts;
  function handleScrollOverFixedFooter(event) {
    debugger
    if (event.defaultPrevented) {
      // This is not a passive event
      event.preventDefault()
      document.querySelector(".parallax-container").scrollTop += event?.deltaY || 0

    } else {
      document.querySelector(".parallax-container").scrollTop += event?.deltaY || 0
    }
  }

  function handleTouchScrollOverFixedFooterStart(event) {
    if (event?.touches[0]?.clientY) {
      ts = event.touches[0].clientY
    }
  }
  function handleTouchScrollOverFixedFooterEnd(event) {
    const te = event.changedTouches[0].clientY
    if (ts > te + 5) {
      document.querySelector(".parallax-container").scrollTop += 8
    } else if (ts < te) {
      document.querySelector(".parallax-container").scrollTop -= 8
    }
  }

  window.addEventListener('wheel', handleScrollOverFixedFooter)
  document.querySelector("footer-component").addEventListener("touchstart", handleTouchScrollOverFixedFooterStart)
  document.querySelector("footer-component").addEventListener("touchmove", handleTouchScrollOverFixedFooterEnd)
})