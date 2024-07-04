// Mjuk scrollning till sektioner
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Lägg till event listeners för navigationslänkar
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);

        // Stäng hamburgermenyn
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
        }
    });
});

// Fade in the hero logo
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.hero-logo').style.opacity = 1;
});

// Fade in/out buttons based on scroll
window.addEventListener('scroll', function() {
    const buttons = document.querySelectorAll('.hero-button');
    const howItWorksSection = document.getElementById('how-it-works');
    const sectionTop = howItWorksSection.getBoundingClientRect().top;

    buttons.forEach(button => {
        if (sectionTop <= 0) {
            button.classList.add('fade-out');
        } else {
            button.classList.remove('fade-out');
        }
    });

    // Show/hide scroll to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});
