/*
Simple Travel Slideshow Script
Source: https://www.w3schools.com/howto/howto_js_slideshow.asp
Accessed: March 2026
Modified by: Mahmood Al Muntasir
*/

let slideIndex = 0;

// Wait until page loads
window.onload = function() {
    showSlides();
};

function showSlides() {

    let slides = document.getElementsByClassName("travel-image");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 4000);
}