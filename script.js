let endorsmentType

function arrowAnimation() {
    $("a.scroll-down-arrow").animate({
        'top': '-=10px',
        'opacity': '0'
    }, 500, function() {
        $("a.scroll-down-arrow").animate({
            'top': '+=10px',
            'opacity': '1'
        }, 500, function() {
            arrowAnimation();
        });
    });
}
arrowAnimation();

//scroll to section when clicking on navbar link
document.querySelectorAll(".navbar .nav-link").forEach((link) => {
    link.addEventListener("click", function(event){
        $("html").animate({
            scrollTop: $("section#" + event.target.id.substring(5)).offset().top - 70
        }, 0);
    });
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

function onSubmit(token) {
    document.getElementById("section#message form").submit();
}

document.querySelector("section#message form button").addEventListener("click", function(event){
    event.preventDefault()
    onSubmit()
    document.querySelector("section#message form").style.display = "none"
    document.querySelector("section#message div.sent").style.display = "flex"
})