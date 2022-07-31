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

document.querySelector("a.scroll-down-arrow").addEventListener("click", function(){
    $("html").animate({
        scrollTop: $("section#proyectos").offset().top - 70
    }, 0);
});



//change active link via scroll
window.addEventListener("scroll", () => {
    var current = "";

    document.querySelectorAll("section").forEach((section) => {
        const sectionTop = section.offsetTop - 70;
        if (window.pageYOffset >= sectionTop ) {
            current = section.getAttribute("id");
        }
    });

    document.querySelectorAll("a.nav-link").forEach((a) => {
        a.classList.remove("active");
        if (a.classList.contains(current)) {
            a.classList.add("active");
        }
    });
})

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})



function setEndorsmentType(event){
    endorsmentType = event.target.id
}

function endorsar(e){
    e.preventDefault()
    let nombre = document.querySelector('.formulario-endorsar input[name="nombre"]').value
    let email = document.querySelector('.formulario-endorsar input[name="email"]').value
    let comentario = document.querySelector('.formulario-endorsar input[name="comentario"]').value

    fetch('api/endorsar.php', {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombre,
            email:email,
            comentario: comentario,
            tipo: endorsmentType
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector(".modal .formulario-endorsar").classList.add("d-none")
        document.querySelector(".modal .msg").classList.remove("d-none")
        document.querySelector(".formulario-endorsar").reset()
        setTimeout(function(){
            var modal = bootstrap.Modal.getInstance(document.getElementById('modal'))
            modal.hide()
            document.querySelector("#modal").addEventListener("hidden.bs.modal", function(){
                document.querySelector(".modal .formulario-endorsar").classList.remove("d-none")
                document.querySelector(".modal .msg").classList.add("d-none")
            })
        }, 2000);
    })
}


// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.addEventListener("scroll", function() {scrollFunction()});

function scrollFunction() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      document.querySelector(".navbar").classList.add("navbar-scrolled");
  } else {
    document.querySelector(".navbar").classList.remove("navbar-scrolled");
  }
}

document.querySelectorAll(".menu a").forEach((item) => {
    item.addEventListener("click", (event) => {
        document.querySelector(".menu .active").classList.remove("active");
        event.target.classList.add("active");
        document.querySelectorAll(".content").forEach((item2) => {
            item2.classList.add("d-none");
        });
        document.querySelector("." + event.target.dataset.type).classList.remove("d-none");
    })
});
