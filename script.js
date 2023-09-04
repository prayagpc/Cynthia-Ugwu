
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timer;
function ovalcircle() {
    var xScale = 1;
    var yScale = 1;
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (details) {
        clearTimeout(timer);
        xScale = gsap.utils.clamp(.8, 1.2, details.clientX - xprev);
        yScale = gsap.utils.clamp(.8, 1.2, details.clientY - yprev);
        xprev = details.clientX;
        yprev = details.clientY;
        mousefollower(xScale, yScale);
        setTimeout(function () {
            timer = document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1,1) `;

        }, 100)
    });
}
ovalcircle();

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1,
            stagger: .2
        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}

function mousefollower(xScale, yScale) {
    window.addEventListener("mousemove", function (details) {
        document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xScale},${yScale}) `;
    });
}

mousefollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (details) {


        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power2,
            duration: .5,

        });
    });

    elem.addEventListener("mousemove", function (details) {

        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;
        gsap.utils.clamp(-20, 20, diffrot);
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
        });
    });
});
