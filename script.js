var locoScroll; // Declare locoScroll globally

function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

// ✅ Final Fixed scrollToFooter function for Locomotive Scroll
function scrollToFooter() {
  var button = document.getElementById("scrollToWorks");
  if (!button) return; // Prevent errors if the button doesn't exist

  button.addEventListener("click", function () {
    if (locoScroll) {
      locoScroll.scrollTo("#footer-div", {
        duration: 1000, // 1 second smooth scroll
        offset: 0, // No extra offset
      });
    }
  });
}

function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  })
    .from("#line1-part1", {
      opacity: 0,
      onStart: function () {
        var h5timer = document.querySelector("#line1-part1 h5");
        var grow = 0;
        var interval = setInterval(function () {
          if (grow < 100) {
            h5timer.innerHTML = grow++;
          } else {
            h5timer.innerHTML = grow;
            clearInterval(interval);
          }
        }, 27);
      },
    })
    .to(".line h2", {
      animationName: "loaderAnime",
      opacity: 1,
    })
    .to("#loader", {
      opacity: 0,
      duration: 0.2,
      delay: 2.6,
    })
    .to("#loader", {
      display: "none",
    })
    .from("#page1", {
      y: 1600,
      duration: 0.5,
      ease: "power4.out",
    })
    .from("#nav", {
      opacity: 0,
    })
    .from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1", {
      y: 140,
      stagger: 0.2,
    });
}

function cursorAnimation() {
  Shery.mouseFollower({ skew: true, ease: "cubic-bezier(0.23, 1, 0.320, 1)", duration: 1 });
  Shery.makeMagnet("#nav-part2 h4");

  var videoContainer = document.querySelector("#video-container");
  var video = document.querySelector("#video-container video");
  var videoCursor = document.querySelector("#video-cursor");

  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to(".mousefollower", { opacity: 0 });
      gsap.to(videoCursor, { left: dets.x - 570, y: dets.y - 300 });
    });
  });

  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", { opacity: 1 });
    gsap.to(videoCursor, { left: "70%", top: "-15%" });
  });

  var flag = false;
  videoContainer.addEventListener("click", function () {
    if (!flag) {
      video.play();
      video.style.opacity = 1;
      videoCursor.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
      gsap.to(videoCursor, { scale: 0.5 });
    } else {
      video.pause();
      video.style.opacity = 0;
      videoCursor.innerHTML = `<i class="ri-play-mini-fill"></i>`;
      gsap.to(videoCursor, { scale: 1 });
    }
    flag = !flag;
  });
}

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    gooey: true,
    config: { a: { value: 2, range: [0, 30] }, b: { value: 0.75, range: [-1, 1] }, zindex: { value: -9996999, range: [-9999999, 9999999] } },
  });
}

function flagAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#flag", { x: dets.x, y: dets.y });
  });
  var hero3 = document.querySelector("#hero3");
  hero3.addEventListener("mouseenter", function () {
    gsap.to("#flag", { opacity: 1 });
  });
  hero3.addEventListener("mouseleave", function () {
    gsap.to("#flag", { opacity: 0 });
  });
}

function footerAnimation() {
  var footerH1 = document.querySelector("#footer h1");
  var footerH2 = document.querySelector("#footer h2");
  footerH1.innerHTML = [...footerH1.textContent].map(letter => `<span>${letter}</span>`).join("");
  footerH2.innerHTML = [...footerH2.textContent].map(letter => `<span>${letter}</span>`).join("");
}

// ✅ Corrected Order of Execution
loadingAnimation();
cursorAnimation();
locomotiveAnimation(); // ✅ Initializes locoScroll
sheryAnimation();
flagAnimation();
footerAnimation();

// ✅ Make sure it's called AFTER Locomotive is initialized
setTimeout(scrollToFooter, 500);
