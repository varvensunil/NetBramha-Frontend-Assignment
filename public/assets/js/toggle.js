const toggleBtn = document.getElementById("toggleNav");
const sideNav = document.getElementById("sideNav");
const wrapper = document.getElementById("appWrapper");

// Toggle side menu
toggleBtn.addEventListener("click", () => {
    if (window.innerWidth > 992) return;
    sideNav.classList.toggle("open");
    document.querySelector("#closeSideNav").classList.toggle("d-none");
});

document.querySelector("#closeSideNav").addEventListener("click", () => {
    if (window.innerWidth > 992) return;
    sideNav.classList.toggle("open");
    document.querySelector("#closeSideNav").classList.toggle("d-none");
});

const dropdown = document.querySelector(".menu-item-list.dropdown");
const header = dropdown.querySelector(".item-1");
const arrow = dropdown.querySelector(".arrow-img");
const options = dropdown.querySelector(".dropdown-options");

header.addEventListener("click", () => {
    options.classList.toggle("d-none");
    arrow.classList.toggle("rotate-90");
});


function removeActiveClass() {
    document.querySelectorAll(".dropdown-options li a").forEach((items) => {
        items.classList.remove("active");
    })
}

function activateByHash() {
    const hashPathName = window.location.hash.toLowerCase();

    document.querySelectorAll(".dropdown-options li a").forEach(link => {
        const linkHash = link.getAttribute('href')?.toLowerCase();
        if (linkHash === hashPathName) {
            removeActiveClass();
            link.classList.add("active");
        }
    });
}

window.addEventListener('load', activateByHash);

document.querySelectorAll(".dropdown-options li a").forEach((items) => {
    items.addEventListener('click', (e) => {
        const clickedItem = e.target.innerText.trim();
        console.log(clickedItem);
        removeActiveClass()
        items.classList.add("active");
        if (window.innerWidth > 992) return;
        sideNav.classList.toggle("open");
        document.querySelector("#closeSideNav").classList.toggle("d-none");
    })
})


// Handle responsive behavior
function handleResize() {
    if (window.innerWidth > 992) {
        sideNav.classList.remove("open");
        wrapper.classList.add("desktop");
        toggleBtn.classList.add("visbility");
    } else {
        wrapper.classList.remove("desktop");
        toggleBtn.classList.remove("visbility");
    }
}

window.addEventListener("resize", handleResize);
handleResize(); // Run on load
