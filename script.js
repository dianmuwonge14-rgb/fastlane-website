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
        ".why-card, .testimonial-card, .faq-item, .hero h1"
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
