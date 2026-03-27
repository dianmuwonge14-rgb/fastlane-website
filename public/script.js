let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlides() {
  slides.forEach(slide => slide.classList.remove("active"));

  index++;
  if (index >= slides.length) {
    index = 0;
  }

  slides[index].classList.add("active");
}

// start first image
slides[0].classList.add("active");

// change every 3 seconds
setInterval(showSlides, 3000);