let endorsmentType
let recaptcha_done = false
let recaptcha_success = false

function arrowAnimation() {
    $("a.scroll-down-arrow").animate({
        'top': '-=10px',
        'opacity': '0'
    }, 500, function () {
        $("a.scroll-down-arrow").animate({
            'top': '+=10px',
            'opacity': '1'
        }, 500, function () {
            arrowAnimation();
        });
    });
}
arrowAnimation();

//scroll to section when clicking on navbar link
document.querySelectorAll(".navbar .nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
        $("html").animate({
            scrollTop: $("section#" + event.target.id.substring(5)).offset().top - 70
        }, 0);
    });
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

function sendMessage(event) {
    event.preventDefault()
    if (recaptcha_success)
        fetch("send_message.php", {
            method: "POST",
            body: JSON.stringify({ name: document.querySelector("section#message form #name").value, email: document.querySelector("section#message form #email").value, msg: document.querySelector("section#message form #msg").value })
        })
            .then(() => successMessage())
    else
        failMessage()
}

function successMessage() {

    document.querySelector("section#message form").style.visibility = "hidden"
    document.querySelector("section#message div.loading").style.display = "flex"
    setTimeout(() => {
        document.querySelector("section#message div.loading").style.display = "none"
        document.querySelector("section#message div.sent").style.display = "flex"

    }, 1500);
}

function failMessage() {
    document.querySelector("section#message form").style.visibility = "hidden"
    document.querySelector("section#message div.loading").style.display = "flex"
    setTimeout(() => {
        document.querySelector("section#message div.loading").style.display = "none"
        document.querySelector("section#message div.fail").style.display = "flex"

    }, 1500);
}

function updateForm() {
    let name = document.querySelector("section#message form #name").value
    let phone = document.querySelector("section#message form #phone").value
    let msg = document.querySelector("section#message form #msg").value

    if (name && phone && msg && recaptcha_done)
        document.querySelector("section#message form button").classList.remove("disabled")
    else
        document.querySelector("section#message form button").classList.add("disabled")
}

function gResponse(token) {
    fetch("recaptcha_verify.php", {
        method: "POST",
        body: JSON.stringify({ token: token })
    })
        .then(res => res.json())
        .then(data => {
            if ("success" in data) {
                recaptcha_done = true
                updateForm()
            }

            if (data.success)
                recaptcha_success = true
            else
                recaptcha_success = false
        })
}