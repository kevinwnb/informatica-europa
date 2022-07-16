let projectToDeleteId;
let endorsmentType

// Enable Carousel Indicators
$(".item").click(function () {
    $("#demo").carousel(1);
});

let deleteProject = (projectId) => {
    $.post("projectDelete.php",
    {
        id: projectId
    },
    function () {
        location.reload();
    });
}



$buildProjectCard = (img1Path, title, id) => {
    return "\
    <div class='card'>\
    <img class='card-img-top' src='" + img1Path + "' alt='Card image'>\
    <div class='card-body'>\
    <h4 class='card-title'>" + title + "</h4>\
    <!--<p class='card-text'><?php echo $p->get_description(); ?></p>-->\
    <a href='#project" + id + "' class='btn btn-primary'>See Project</a>\
    </div>\
    </div>\
    ";
}



particlesJS.load('particles-js', 'particles-js/particles.json', function() {
    console.log('callback - particles.js config loaded');
});

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

document.querySelector("#btnScrollToAboutMe").addEventListener("click", function() {
    //1 second of animation time
    //html works for FFX but not Chrome
    //body works for Chrome but not FFX
    //This strange selector seems to work universally
    $("html").animate({
        scrollTop: $("section#proyectos").offset().top - 70
    }, 0);
});

//scroll to section via click
document.querySelector("#link-inicio").addEventListener("click", function() {
    //1 second of animation time
    //html works for FFX but not Chrome
    //body works for Chrome but not FFX
    //This strange selector seems to work universally
    $("html").animate({
        scrollTop: $("section#inicio").offset().top - 70
    }, 0);
});

document.querySelector("#link-proyectos").addEventListener("click", function() {
    //1 second of animation time
    //html works for FFX but not Chrome
    //body works for Chrome but not FFX
    //This strange selector seems to work universally
    $("html").animate({
        scrollTop: $("section#proyectos").offset().top - 70
    }, 0);
});

// document.querySelector("#link-idiomas").addEventListener("click", function() {
//     //1 second of animation time
//     //html works for FFX but not Chrome
//     //body works for Chrome but not FFX
//     //This strange selector seems to work universally
//     $("html").animate({
//         scrollTop: $("section#idiomas").offset().top - 70
//     }, 0);
// });

document.querySelector("#link-habilidades").addEventListener("click", function() {
    //1 second of animation time
    //html works for FFX but not Chrome
    //body works for Chrome but not FFX
    //This strange selector seems to work universally
    $("html").animate({
        scrollTop: $("section#habilidades").offset().top - 70
    }, 0);
});

$("#btnScrollToContactMe").click(function() {
    //1 second of animation time
    //html works for FFX but not Chrome
    //body works for Chrome but not FFX
    //This strange selector seems to work universally
    $("html, body").animate({
        scrollTop: $("section#contactMe").offset().top
    }, 500);
});


//change active link via scroll
window.onscroll = () => {
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
};

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
