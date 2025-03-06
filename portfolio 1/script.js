// Typing effect for the header text
const typedRole = document.getElementById("typed-role");
const typedGreeting = document.getElementById("typed-greeting");
const typedName = document.getElementById("typed-name");
const typedLocation = document.getElementById("typed-location");

const textArray = [
    { role: "Frontend Developer", greeting: "Hi, I'm ", name: "Harrison", location: "From Ghana" }
];
const typingDelay = 50;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function typeRole() {
    if (charIndex < textArray[textArrayIndex].role.length) {
        typedRole.textContent += textArray[textArrayIndex].role.charAt(charIndex);
        charIndex++;
        setTimeout(typeRole, typingDelay);
    } else {
        charIndex = 0;
        setTimeout(typeGreeting, newTextDelay);
    }
}

function typeGreeting() {
    if (charIndex < textArray[textArrayIndex].greeting.length) {
        typedGreeting.textContent += textArray[textArrayIndex].greeting.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, typingDelay);
    } else {
        charIndex = 0;
        setTimeout(typeName, newTextDelay);
    }
}

function typeName() {
    if (charIndex < textArray[textArrayIndex].name.length) {
        typedName.textContent += textArray[textArrayIndex].name.charAt(charIndex);
        charIndex++;
        setTimeout(typeName, typingDelay);
    } else {
        charIndex = 0;
        setTimeout(typeLocation, newTextDelay);
    }
}

function typeLocation() {
    if (charIndex < textArray[textArrayIndex].location.length) {
        typedLocation.textContent += textArray[textArrayIndex].location.charAt(charIndex);
        charIndex++;
        setTimeout(typeLocation, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedRole.textContent = textArray[textArrayIndex].role.substring(0, charIndex - 1);
        typedGreeting.textContent = textArray[textArrayIndex].greeting.substring(0, charIndex - 1);
        typedName.textContent = textArray[textArrayIndex].name.substring(0, charIndex - 1);
        typedLocation.textContent = textArray[textArrayIndex].location.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(typeRole, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
    if (textArray.length) setTimeout(typeRole, newTextDelay + 250);
});


// Tab functionality for About section
function opentab(event, tabname) {
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");

    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }   
    
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Mobile menu functionality
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

// Form submission to Google Sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbwAJaEmrXupWkQhAjWtaHROx9zIqWZPiYOfAauxtHEGW2e8T2EfcpduTHRhli75OwnO/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully";
            setTimeout(function() {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
});