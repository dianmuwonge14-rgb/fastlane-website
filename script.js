document.addEventListener("DOMContentLoaded", () => {

    const faqs = document.querySelectorAll(".faq-item");
    const search = document.getElementById("faqSearch");

    // FAQ CLICK FUNCTION
    faqs.forEach(item => {
        item.addEventListener("click", () => {

            faqs.forEach(f => {
                if (f !== item) {
                    f.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    });

    // FAQ SEARCH FUNCTION
    search.addEventListener("keyup", () => {
        const value = search.value.toLowerCase();

        faqs.forEach(item => {
            const text = item.innerText.toLowerCase();
            item.style.display = text.includes(value) ? "block" : "none";
        });
    });


    // ===== SCROLL ANIMATION =====
    const animatedItems = document.querySelectorAll(
        ".why-card, .testimonial-card, .faq-item, .hero h1, .brand-card"
    );

    // Add initial class
    animatedItems.forEach(el => el.classList.add("fade-in"));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.2
    });

    animatedItems.forEach(el => observer.observe(el));

});
// ===== BRAND FILTER (FOR CAR SECTION) =====
const brandCards = document.querySelectorAll(".brand-card");

brandCards.forEach(card => {
    card.addEventListener("click", () => {
        const brand = card.getAttribute("data-brand");

        // FUTURE: filter cars
        const cars = document.querySelectorAll(".car-card");

        cars.forEach(car => {
            if (brand === "all" || car.getAttribute("data-brand") === brand) {
                car.style.display = "block";
            } else {
                car.style.display = "none";
            }
        });

        console.log("Filtering by:", brand);
    });
});
