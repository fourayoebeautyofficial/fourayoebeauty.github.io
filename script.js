// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Toggle the menu on button click
mobileMenuButton.addEventListener('click', (event) => {
    event.stopPropagation();  // Prevent the click event from propagating to the document
    mobileMenu.classList.toggle('hidden');  // Toggle visibility of menu
});

// Close the dropdown if clicked outside of the menu
document.addEventListener('click', (event) => {
    // Check if the click was outside the mobile menu and button
    if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
        mobileMenu.classList.add('hidden');  // Close the menu if clicked outside
    }
});


// Product Tabs
const tabs = document.querySelectorAll('.product-tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Hapus kelas active dari semua tab dan konten
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active', 'hidden'));

        // Tambahkan kelas active ke tab yang dipilih dan konten yang sesuai
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        document.getElementById(tabId).classList.remove('hidden');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
        }
    });
});

// Optional: Lightbox functionality for images
document.querySelectorAll('.instagram-post').forEach(post => {
    post.addEventListener('click', function(e) {
        if (!e.target.closest('a')) {  // Don't trigger if clicking on a link
            const imgSrc = this.querySelector('img').src;
            // In a real implementation, you would open a lightbox here
            console.log('Opening lightbox for:', imgSrc);
            
            // Example: Redirect to Instagram (would replace with lightbox in production)
            window.open('https://instagram.com/fourayoebeauty', '_blank');
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const loadWidget = () => {
    const script = document.createElement('script');
    script.src = 'https://apps.elfsight.com/p/platform.js';
    script.defer = true;
    document.body.appendChild(script);
    };

    // Auto-refresh setiap 1 jam (3600000 ms)
    loadWidget();
    setInterval(() => {
    const widget = document.querySelector('.elfsight-app-e509fc75-c880-49e5-8978-046cf794942c');
    if (widget) widget.innerHTML = '';
    loadWidget();
    }, 3600000);
});

const counters = document.querySelectorAll('.count');

    const options = {
    threshold: 0.7,
    };

    const countUp = (counter) => {
    const target = +counter.getAttribute('data-target');
      const speed = 800; // smaller = faster

    const update = () => {
        const current = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (current < target) {
        counter.innerText = current + increment;
        requestAnimationFrame(update);
        } else {
        counter.innerText = target + (counter.dataset.target === "24" ? "/7" : counter.dataset.target === "3" ? "+" : counter.dataset.target === "50" ? "+" : "%");
        }
    };

    update();
    };

    const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
        }
    });
    }, options);

    counters.forEach(counter => {
    observer.observe(counter);
});

// Slideshow JavaScript for both sections
let slideIndex1 = 0;
let slideIndex2 = 0;

function showSlides1() {
    let slides = document.getElementsByClassName("mySlides1");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex1++;
    if (slideIndex1 > slides.length) {slideIndex1 = 1}    
    slides[slideIndex1 - 1].style.display = "block";  
    setTimeout(showSlides1, 4000); // Change image every 4 seconds
}

function showSlides2() {
    let slides = document.getElementsByClassName("mySlides2");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex2++;
    if (slideIndex2 > slides.length) {slideIndex2 = 1}    
    slides[slideIndex2 - 1].style.display = "block";  
    setTimeout(showSlides2, 5000); // Change image every 4 seconds
}

// Start both slideshows
showSlides1();
showSlides2();


document.getElementById('target').textContent = userInput;

  // Jangan tampilkan error detail ke user
    window.onerror = function() {
    document.getElementById('error').textContent = 'Terjadi kesalahan. Silakan coba lagi.';
      return true; // Blok error default
};

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.onkeydown = function(e) {
    if (
    e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "U")
    ) {
        return false;
    }
};

// Mobile Product Slider (Swiper-Like Swiping and Dragging)
document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth <= 768) {  // Mobile viewport
        const tabContent = document.querySelector('.tab-content.active');
        const products = document.querySelectorAll('.product-card');
        let isDown = false;  // Track mouse drag status
        let startX;
        let scrollLeft;

        const productWidth = products[0].offsetWidth + 20;  // Product width + margin

        // Function to enable smooth swiping through products
        const moveToNext = () => {
          tabContent.scrollBy({
            left: productWidth,  // Move to the next product (consider product width + margin)
            behavior: 'smooth',  // Enable smooth scroll
          });
        };

        const moveToPrevious = () => {
          tabContent.scrollBy({
            left: -productWidth,  // Move to the previous product (negative movement)
            behavior: 'smooth',  // Enable smooth scroll
          });
        };

        // Swipe functionality to move between products
        let swipeStartX = 0;
        let swipeEndX = 0;

        tabContent.addEventListener('touchstart', (e) => {
          swipeStartX = e.touches[0].pageX;
        });

        tabContent.addEventListener('touchend', (e) => {
          swipeEndX = e.changedTouches[0].pageX;

          // Detect swipe direction (left or right)
          if (swipeStartX - swipeEndX > 50) {  // Swiped left
            moveToNext();
          } else if (swipeEndX - swipeStartX > 50) {  // Swiped right
            moveToPrevious();
          }
        });

        // Mouse Drag functionality (for desktop users)
        tabContent.addEventListener('mousedown', (e) => {
          isDown = true;
          startX = e.pageX - tabContent.offsetLeft;
          scrollLeft = tabContent.scrollLeft;
          tabContent.style.transition = 'none';  // Disable transition during dragging
        });

        tabContent.addEventListener('mouseleave', () => {
          isDown = false;
        });

        tabContent.addEventListener('mouseup', () => {
          isDown = false;
        });

        tabContent.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - tabContent.offsetLeft;
          const walk = (x - startX) * 3;  // Adjust the drag speed
          tabContent.scrollLeft = scrollLeft - walk;
        });

        // Initialize scroll position (no need to set anything specific here)
    }
});
