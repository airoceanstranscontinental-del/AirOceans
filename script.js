// Update footer year automatically
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Enquiry form basic validation (if form exists)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your enquiry has been submitted.");
      form.reset();
    });
  }
});

let slideIndex = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

document.querySelector(".next").addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % totalSlides;
  updateSlider();
});

document.querySelector(".prev").addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
});

function updateSlider() {
  slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Auto scroll every 5 seconds
setInterval(() => {
  slideIndex = (slideIndex + 1) % totalSlides;
  updateSlider();
}, 5000);
