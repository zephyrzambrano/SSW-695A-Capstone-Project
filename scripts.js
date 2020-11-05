// Hide all content
hideAllContent();

// Loop through tabs
var tabs = document.querySelectorAll(".tabs_wrap ul li");
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // Reset Active State
        tabs.forEach((tab) => {
            tab.classList.remove("active");
        })

        // Apply Current Active State
        tab.classList.add("active");

        // Get active tab data
        var tabval = tab.getAttribute("data-tabs");

        // Hide all content
        hideAllContent();

        // Activate corresponding content
        document.querySelectorAll("." + tabval).forEach((el) => {
            el.style.display = "block";
        })
    })
})

function hideAllContent() {
    [].forEach.call(document.querySelectorAll('.content_wrap'), function (el) {
        el.style.display = 'none';
    });
}
