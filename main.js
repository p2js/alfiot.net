// Age calculation + insertion
const dob = new Date(2005, 3, 7);

let diff = new Date(Date.now() - dob.getTime());
let age = Math.abs(diff.getUTCFullYear() - 1970);
document.getElementById("age").innerText = age;

// Enlightenment
let background = document.getElementById("background");
let pageContent = document.getElementById("mainContent");
let styleLink = document.querySelector('link[href="style.css"]');
let button = document.getElementById("enlightenmentButton");
let tooltip = document.getElementById("enlightenmentTooltip");
let icons = document.querySelectorAll(".icon");
let thumbnails = document.querySelectorAll(".projectThumbnail");

// fetch state from local storage
let enlightened = localStorage.getItem("enlightened");
if (enlightened) removeStyle();

// helper function to set retro style
function removeStyle() {
    document.body.removeChild(background);
    document.head.removeChild(styleLink);
    icons.forEach(icon => {
        icon.src = "";
        if (icon.parentElement.tagName == "A") icon.style.marginRight = "1em";
    });
    thumbnails.forEach(thumbnail => thumbnail.style.maxWidth = "30%");
    button.setAttribute("style",
        `position: absolute;
        top: 2.25em;
        right: 1em;`
    );
    tooltip.innerText = "";
}

button.addEventListener("click", () => {
    enlightened = !enlightened;

    //transition smoothly to/from retro styling
    pageContent.style.opacity = 0;
    background.style.opacity = 0;
    if (!enlightened) {
        document.body.appendChild(background);
        background.style.transitionDelay = "0ms";
        setTimeout(() => {
            document.head.appendChild(styleLink);
            background.style.opacity = 1;
        }, 500);
    };
    setTimeout(() => {
        window.scroll({ top: 0 });
        location.reload();
    }, 1200);

    //write state to local storage
    localStorage.setItem("enlightened", enlightened ? 1 : "");
});

button.parentElement.classList.toggle("hidden");