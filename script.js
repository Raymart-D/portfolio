document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations (fade-in)
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries,
        observer
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- NEW: Video Playback Manager ---
    // Get all small gameplay videos
    const allVideos = document.querySelectorAll('.gameplay-video-small');

    allVideos.forEach(video => {
        video.addEventListener('play', () => {
            allVideos.forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                }
            });
        });
    });

    // --- EASTER EGG (SECRET VAULT) ---
    let clickCount = 0;
    let clickTimer;
    const logoTrigger = document.getElementById('secret-trigger');
    const secretVault = document.getElementById('secret-vault');
    const closeVaultBtn = document.getElementById('close-vault');

    if (logoTrigger && secretVault) {
        logoTrigger.addEventListener('click', (e) => {
            e.preventDefault(); 
            clickCount++;

            if (clickTimer) clearTimeout(clickTimer);

            // Activate Vault on 5 clicks
            if (clickCount >= 5) {
                // Instantly pause any playing videos on the main site
                allVideos.forEach(v => v.pause());

                // Show the vault
                secretVault.classList.add('vault-active');

                // Prevent scrolling on the main page behind the vault
                document.body.style.overflow = 'hidden';

                clickCount = 0; 
            } else {
                clickTimer = setTimeout(() => {
                    if (clickCount === 1) {
                        window.scrollTo({top: 0, behavior: 'smooth'});
                    }
                    clickCount = 0;
                }, 1500);
            }
        });
    }

    // Close the vault
    if (closeVaultBtn && secretVault) {
        closeVaultBtn.addEventListener('click', () => {
            secretVault.classList.remove('vault-active');
            document.body.style.overflow = 'auto'; // allow scrolling again
        });
    }
});