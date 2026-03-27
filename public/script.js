let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlides() {
  slides.forEach((slide, i) => {
    slide.style.display = "none";
  });

  index++;
  if (index > slides.length) {
    index = 1;
  }

  slides[index - 1].style.display = "block";
}

// Start immediately
showSlides();

// Loop every 3 seconds
setInterval(showSlides, 3000);