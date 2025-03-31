function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Scroll reveal animation
document.addEventListener('DOMContentLoaded', function() {
  // Elements to animate on scroll
  const animateElements = document.querySelectorAll('.section__pic-container, .section__text, .about-containers, .experience-details-container, .contact-info-upper-container, .details-container, .color-container');
  
  // Observer options
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  // Create the observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // Stop observing once it appears
      }
    });
  }, observerOptions);
  
  // Start observing each element
  animateElements.forEach(element => {
    element.classList.add('hidden');
    observer.observe(element);
  });
  
  // Animate profile section on page load
  setTimeout(() => {
    document.querySelector('#profile .section__pic-container').classList.add('appear');
    document.querySelector('#profile .section__text').classList.add('appear');
  }, 300);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed navbar
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const menu = document.querySelector(".menu-links");
        if (menu.classList.contains('open')) {
          toggleMenu();
        }
      }
    });
  });
  
  // Active navigation highlight
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });
});
