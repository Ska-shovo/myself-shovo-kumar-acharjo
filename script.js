document.addEventListener('DOMContentLoaded', () => {
    // Typewriter animation for "Welcome to My Canvas"
    const typewriterText = document.getElementById('typewriter-text');
    const originalText = typewriterText.textContent;
    typewriterText.textContent = '';
    typewriterText.style.borderRight = '3px solid #00b7eb';
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < originalText.length) {
            typewriterText.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            // Keep cursor blinking after typing is complete
            typewriterText.style.animation = 'blink-caret 0.75s step-end infinite';
        }
    }
    setTimeout(typeWriter, 500);

    // Home section transition animation
    const homeSection = document.querySelector('#home');
    const homeElements = document.querySelectorAll('.home-content .profile-img, .home-content p, .home-content .btn');
    
    setTimeout(() => {
        homeSection.classList.add('loaded');
        homeElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    }, 100);

    // Sidebar profile picture animation
    const sidebarProfileImg = document.querySelector('.sidebar-profile-img');
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelector('.nav-links');

    // Show sidebar profile picture when sidebar is active or navigating
    const showSidebarProfile = () => {
        sidebarProfileImg.classList.add('visible');
    };

    // Hide sidebar profile picture on home section
    const hideSidebarProfile = () => {
        sidebarProfileImg.classList.remove('visible');
    };

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            showSidebarProfile();
            document.body.style.overflow = 'hidden';
        } else {
            hideSidebarProfile();
            document.body.style.overflow = '';
        }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                sidebar.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Smooth scroll and blur transition
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Add blur to all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('blur');
                section.style.opacity = '0.5'; // Fade out non-target sections
            });

            // Show sidebar profile picture except on home
            if (targetId !== 'home') {
                showSidebarProfile();
            } else {
                hideSidebarProfile();
            }

            // Remove blur and scroll to target with faster delay
            setTimeout(() => {
                targetSection.classList.remove('blur');
                targetSection.style.opacity = '1'; // Fade in target section
                targetSection.scrollIntoView({ behavior: 'smooth' });
                document.querySelectorAll('.section').forEach(section => {
                    if (section !== targetSection) {
                        section.classList.remove('blur');
                        section.style.opacity = '1'; // Restore opacity
                    }
                });
                // Close sidebar on mobile after click
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 400); // Faster delay (400ms)
        });
    });

    // Scroll animations for text, cards, and category icons
    const animateElements = document.querySelectorAll('.animate-text');
    const categoryIcons = document.querySelectorAll('.category-icon');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger category icon animation if present
                const icon = entry.target.querySelector('.category-icon');
                if (icon) {
                    setTimeout(() => {
                        icon.classList.add('visible');
                    }, 100); // Slight delay for staggered effect
                }
            } else {
                entry.target.classList.remove('visible');
                const icon = entry.target.querySelector('.category-icon');
                if (icon) {
                    icon.classList.remove('visible');
                }
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => observer.observe(element));

    // Gallery lightbox (with blur + float-up)
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const galleryLightbox = document.querySelector('#lightbox');
    const galleryLightboxImg = document.querySelector('#lightbox-img');
    const galleryCaption = document.querySelector('#caption');
    const galleryClose = document.querySelector('#lightbox .close');

    function openGalleryLightbox(item){
        galleryLightbox.style.display = 'flex';
        galleryLightbox.classList.add('open');
        galleryLightboxImg.src = item.src;
        galleryCaption.textContent = item.parentElement.querySelector('.caption')?.textContent || '';
        document.body.style.overflow = 'hidden';
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            openGalleryLightbox(item);
        });
    });

    galleryClose.addEventListener('click', () => {
        galleryLightbox.classList.remove('open');
        setTimeout(()=>{ galleryLightbox.style.display = 'none'; }, 200);
        document.body.style.overflow = '';
    });

    galleryLightbox.addEventListener('click', (e) => {
        if (e.target === galleryLightbox) {
            galleryLightbox.style.display = 'none';
        }
    });

    // Photography lightbox - DISABLED - images only preview on screen
    // Removed click functionality to prevent full screen view
    const photographyItems = document.querySelectorAll('.photography-item img');
    const photographyLightbox = document.querySelector('#photography-lightbox');
    const photographyLightboxImg = document.querySelector('#photography-lightbox-img');
    const photographyCaption = document.querySelector('#photography-caption');
    const photographyClose = document.querySelector('#photography-lightbox .close');

    function openPhotoLightbox(item){
        photographyLightbox.style.display = 'flex';
        photographyLightbox.classList.add('open');
        photographyLightboxImg.src = item.src;
        photographyCaption.textContent = item.parentElement.querySelector('.caption')?.textContent || '';
        document.body.style.overflow = 'hidden';
    }

    // Photography items no longer have click handlers - images stay on screen only
    // photographyItems.forEach(item => {
    //     item.addEventListener('click', () => {
    //         openPhotoLightbox(item);
    //     });
    // });

    photographyClose.addEventListener('click', () => {
        photographyLightbox.classList.remove('open');
        setTimeout(()=>{ photographyLightbox.style.display = 'none'; }, 200);
        document.body.style.overflow = '';
    });

    photographyLightbox.addEventListener('click', (e) => {
        if (e.target === photographyLightbox) {
            photographyLightbox.classList.remove('open');
            setTimeout(()=>{ photographyLightbox.style.display = 'none'; }, 200);
            document.body.style.overflow = '';
        }
    });

    // Filter for activities, certificates, gallery, and photography
    const filterButtons = document.querySelectorAll('.filter button');
    const filterableItems = document.querySelectorAll('.activity-card, .certificate-card, .gallery-item, .photography-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            const section = button.closest('.section');
            const items = section.querySelectorAll('.activity-card, .certificate-card, .gallery-item, .photography-item');
            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Contact form submission (demo alert)
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent! (This is a demo)');
            form.reset();
        });
    }

    // Music Player functionality
    const musicPlayerBtn = document.getElementById('musicPlayerBtn');
    const musicPlayerModal = document.getElementById('musicPlayerModal');
    const musicPlayerClose = document.getElementById('musicPlayerClose');
    const musicPlaylist = document.getElementById('musicPlaylist');
    
    // Music list - Actual music files from music folder
    const musicList = [
        { name: 'Amay bhashaili rey - Rishi Panda', src: 'music/Amay bhashaili rey ¦ Rishi Panda (128kbit_AAC).m4a' },
        { name: 'Bondhu - Topu', src: 'music/Bondhu ¦ Topu ¦ Music - Rafa ¦ Official Lyrical Video ¦ ☢ EXCLUSIVE ☢ (128kbit_AAC).m4a' },
        { name: "Gangsta's Paradise - Coolio", src: 'music/Coolio - Gangsta\'s Paradise (feat. L.V.) [Official Music Video] (128kbit_AAC).m4a' },
        { name: 'Give Me Some Sunshine - 3 Idiots', src: 'music/Give Me Some Sunshine - 3 Idiots ¦ Aamir Khan, Madhavan, Sharman J ¦ Suraj Jagan ¦ Shantanu Moitra (128kbit_AAC).m4a' },
        { name: 'Wake Up - The Vamps', src: 'music/The Vamps - Wake Up (128kbit_AAC).m4a' },
        { name: 'Amake Amar Moto Thakte Dao - Anupam Roy', src: 'music/আমাকে আমার মত থাকতে দাও ¦ Amake Amar Moto Thakte Dao ¦ Anupam Roy ¦ Lyrics (128kbit_AAC).m4a' },
    ];

    // Initialize audio elements (create once)
    const audioElements = [];
    let currentlyPlaying = null;
    let playlistCreated = false;

    // Create music items dynamically (only once)
    function createMusicPlaylist() {
        if (playlistCreated) return;
        
        musicList.forEach((song, index) => {
            const audio = new Audio(song.src);
            // Preload audio metadata
            audio.preload = 'metadata';
            audioElements.push(audio);
            
            const musicItem = document.createElement('div');
            musicItem.className = 'music-item';
            musicItem.innerHTML = `
                <div class="music-info">
                    <i class="fas fa-music"></i>
                    <span class="music-name">${song.name}</span>
                </div>
                <button class="music-play-btn" data-audio-id="${index}">
                    <i class="fas fa-play"></i>
                </button>
            `;
            musicPlaylist.appendChild(musicItem);

            // Play/Pause functionality
            const playBtn = musicItem.querySelector('.music-play-btn');
            playBtn.addEventListener('click', async () => {
                const audioId = parseInt(playBtn.getAttribute('data-audio-id'));
                const audio = audioElements[audioId];
                
                // Stop all other audio
                audioElements.forEach((a, i) => {
                    if (i !== audioId) {
                        a.pause();
                        a.currentTime = 0;
                        const btn = document.querySelector(`[data-audio-id="${i}"]`);
                        if (btn) {
                            btn.classList.remove('playing');
                            btn.innerHTML = '<i class="fas fa-play"></i>';
                        }
                    }
                });

                // Toggle current audio
                if (currentlyPlaying === audioId && !audio.paused) {
                    audio.pause();
                    playBtn.classList.remove('playing');
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                    currentlyPlaying = null;
                } else {
                    try {
                        await audio.play();
                        playBtn.classList.add('playing');
                        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        currentlyPlaying = audioId;
                    } catch (err) {
                        console.error('Could not play audio:', err);
                        // Handle different error types
                        if (err.name === 'NotAllowedError') {
                            alert('Please interact with the page first, then try playing music again.');
                        } else {
                            alert(`Could not play: ${song.name}\n\nMake sure the audio file exists in the music folder.`);
                        }
                    }
                }

                // Update button when audio ends
                audio.addEventListener('ended', () => {
                    playBtn.classList.remove('playing');
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                    currentlyPlaying = null;
                });

                // Handle audio errors
                audio.addEventListener('error', (e) => {
                    console.error('Audio error:', e);
                    playBtn.classList.remove('playing');
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                    alert(`Error loading: ${song.name}\n\nPlease check if the file exists.`);
                });
            });
        });
        playlistCreated = true;
    }

    // Open music player
    musicPlayerBtn.addEventListener('click', () => {
        createMusicPlaylist();
        musicPlayerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Minimize music player (music keeps playing)
    const musicPlayerMinimize = document.getElementById('musicPlayerMinimize');
    musicPlayerMinimize.addEventListener('click', () => {
        musicPlayerModal.classList.remove('active');
        document.body.style.overflow = '';
        // Music continues playing in background
    });

    // Close music player
    function closeMusicPlayer() {
        // Stop all audio
        audioElements.forEach((audio, index) => {
            audio.pause();
            audio.currentTime = 0;
            const btn = document.querySelector(`[data-audio-id="${index}"]`);
            if (btn) {
                btn.classList.remove('playing');
                btn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        currentlyPlaying = null;
        
        musicPlayerModal.classList.add('closing');
        setTimeout(() => {
            musicPlayerModal.classList.remove('active', 'closing');
            document.body.style.overflow = '';
        }, 400);
    }

    musicPlayerClose.addEventListener('click', closeMusicPlayer);
    
    // Close on backdrop click
    musicPlayerModal.addEventListener('click', (e) => {
        if (e.target === musicPlayerModal) {
            closeMusicPlayer();
        }
    });

    // CV Viewer functionality
    const cvViewerBtn = document.getElementById('cvViewerBtn');
    const cvViewerModal = document.getElementById('cvViewerModal');
    const cvViewerClose = document.getElementById('cvViewerClose');
    if (cvViewerBtn && cvViewerModal && cvViewerClose) {
        cvViewerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cvViewerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.querySelectorAll('.section').forEach(s => s.classList.add('blur'));
        });
        const closeCv = () => {
            cvViewerModal.classList.remove('active');
            document.body.style.overflow = '';
            document.querySelectorAll('.section').forEach(s => s.classList.remove('blur'));
        };
        cvViewerClose.addEventListener('click', closeCv);
        cvViewerModal.addEventListener('click', (e) => { if (e.target === cvViewerModal) closeCv(); });
    }

    // Add new photography images (pic1) dynamically with captions
    const photographyGrid = document.querySelector('.photography-grid');
    const extraPhotos = [
        { src: 'pic1/WhatsApp Image 2025-11-01 at 00.26.46_86955960.jpg', caption: 'Natural Beauty' },
        { src: 'pic1/WhatsApp Image 2025-11-01 at 00.26.24_e6dd96b8.jpg', caption: 'Golden Hour' },
        { src: 'pic1/WhatsApp Image 2025-11-01 at 00.26.23_b30e0067.jpg', caption: 'Calm & Quiet' },
        { src: 'pic1/WhatsApp Image 2025-11-01 at 00.23.44_d2237bc2.jpg', caption: 'Naturel Harmony' },
        { src: 'pic1/WhatsApp Image 2025-11-01 at 00.23.44_eea9846e.jpg', caption: 'Pure Nature' },
        { src: 'pic1/WhatsApp Image 2025-11-01 at 00.23.43_85a01886.jpg', caption: 'Serenity' },
        { src: 'pic1/WhatsApp Image 2025-11-01 at 00.23.43_ec5f9cd3.jpg', caption: 'Life' },
        { src: 'pic1/WhatsApp Image 2025-11-01 at 00.23.43_7bc85cb2.jpg', caption: 'Natural Beauty II' },
    ];
    if (photographyGrid) {
        extraPhotos.forEach(p => {
            const wrap = document.createElement('div');
            wrap.className = 'photography-item animate-text';
            wrap.setAttribute('data-category', 'nature');
            wrap.innerHTML = `<img src="${p.src}" alt="${p.caption}" style="cursor: pointer;"><div class="caption">${p.caption}</div>`;
            photographyGrid.appendChild(wrap);
            const img = wrap.querySelector('img');
            img.addEventListener('click', () => openPhotoLightbox(img));
        });
    }

    // Ensure all photography images have click handlers (including existing ones)
    const allPhotographyImages = document.querySelectorAll('.photography-item img');
    allPhotographyImages.forEach(img => {
        if (!img.hasAttribute('data-lightbox-bound')) {
            img.setAttribute('data-lightbox-bound', 'true');
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => openPhotoLightbox(img));
        }
    });

    // Contact section background change with swipe icon
    const contactSection = document.querySelector('#contact');
    const contactBgImages = [
        'https://ik.imagekit.io/shovokumar008/My%20Self/Screenshot%202025-05-23%20235241.png?updatedAt=1748022788227',
        'mypic/WhatsApp Image 2025-11-01 at 00.26.24_45943950.jpg'
    ];
    if (contactSection && contactBgImages.length > 0) {
        let idx = 0;
        
        // Create slide overlay for smooth transitions
        const slideOverlay = document.createElement('div');
        slideOverlay.className = 'contact-slide-overlay';
        slideOverlay.style.position = 'absolute';
        slideOverlay.style.top = '0';
        slideOverlay.style.left = '100%';
        slideOverlay.style.width = '100%';
        slideOverlay.style.height = '100%';
        slideOverlay.style.zIndex = '0';
        slideOverlay.style.transition = 'left 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        slideOverlay.style.backgroundSize = 'cover';
        slideOverlay.style.backgroundPosition = 'center';
        slideOverlay.style.willChange = 'left';
        contactSection.style.position = 'relative';
        contactSection.style.overflow = 'hidden';
        contactSection.insertBefore(slideOverlay, contactSection.firstChild);

        // Create swipe icon button
        const swipeBtn = document.createElement('button');
        swipeBtn.className = 'contact-swipe-btn';
        swipeBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        swipeBtn.setAttribute('aria-label', 'Change background image');
        const contactContent = contactSection.querySelector('div[style*="z-index: 2"]');
        if (contactContent) {
            contactContent.appendChild(swipeBtn);
        } else {
            contactSection.appendChild(swipeBtn);
        }

        function swapBg() {
            idx = (idx + 1) % contactBgImages.length;
            const nextImg = contactBgImages[idx];
            
            // Set new image and slide in from right
            slideOverlay.style.backgroundImage = `url('${nextImg}')`;
            slideOverlay.style.left = '100%';
            
            // Force reflow to ensure the transition works
            slideOverlay.offsetHeight;
            
            // Trigger slide animation
            requestAnimationFrame(() => {
                slideOverlay.style.left = '0';
            });
            
            // After slide completes, update main background and reset overlay
            setTimeout(() => {
                contactSection.style.backgroundImage = `url('${nextImg}')`;
                slideOverlay.style.left = '100%';
            }, 1500);
        }

        // Click handler for swipe button
        swipeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            swapBg();
        });
    }

    // Enhanced animations for cards and progress bars
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                entry.target.style.opacity = '1';
                
                // Animate progress bars
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar && !progressBar.classList.contains('animated')) {
                    progressBar.classList.add('animated');
                    const progressDiv = progressBar.querySelector('div');
                    if (progressDiv) {
                        const width = progressDiv.style.width;
                        progressDiv.style.width = '0';
                        setTimeout(() => {
                            progressDiv.style.setProperty('--progress-width', width);
                            progressDiv.style.width = width;
                        }, 100);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.fact-card, .activity-card, .gallery-item, .photography-item, .skill-card, .certificate-card, .achievement-card, .education-card, .project-card, .blog-card, .timeline-item').forEach(card => {
        cardObserver.observe(card);
    });

    // Educational Technology background animation
    const bgCanvas = document.createElement('canvas');
    document.getElementById('background-canvas').appendChild(bgCanvas);
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    const bgCtx = bgCanvas.getContext('2d');

    const icons = [
        { char: '📚', type: 'education' }, // Book
        { char: '💻', type: 'technology' }, // Laptop
        { char: '🎓', type: 'education' }, // Graduation cap
        { char: '💡', type: 'education' }, // Lightbulb
        { char: '📝', type: 'education' }, // Pencil
        { char: '🌐', type: 'technology' }, // Globe
        { char: '⚙️', type: 'technology' }, // Gear
        { char: '⌨️', type: 'technology' } // Code brackets
    ];
    const edTechIcons = [];
    const numIcons = 15;

    class EdTechIcon {
        constructor() {
            this.x = Math.random() * bgCanvas.width;
            this.y = Math.random() * bgCanvas.height;
            this.icon = icons[Math.floor(Math.random() * icons.length)];
            this.size = Math.random() * 40 + 30; // Larger icons (30-70px)
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.2 + 0.4; // Adjusted for darker background
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.015;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.05;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            this.pulse += this.pulseSpeed;
            this.opacity = 0.4 + Math.sin(this.pulse) * 0.2; // Pulsing effect

            // Wrap around edges
            if (this.x < -this.size) this.x = bgCanvas.width + this.size;
            if (this.x > bgCanvas.width + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = bgCanvas.height + this.size;
            if (this.y > bgCanvas.height + this.size) this.y = -this.size;
        }

        draw() {
            bgCtx.save();
            bgCtx.translate(this.x, this.y);
            bgCtx.rotate(this.rotation);
            bgCtx.font = `${this.size}px sans-serif`;
            bgCtx.fillStyle = `rgba(0, 183, 235, ${this.opacity})`;
            bgCtx.textAlign = 'center';
            bgCtx.textBaseline = 'middle';
            bgCtx.fillText(this.icon.char, 0, 0);
            bgCtx.restore();
        }
    }

    // Initialize icons
    for (let i = 0; i < numIcons; i++) {
        edTechIcons.push(new EdTechIcon());
    }

    function animateBackground() {
        // Draw gradient background (dark blue to indigo)
        const gradient = bgCtx.createLinearGradient(0, 0, 0, bgCanvas.height);
        gradient.addColorStop(0, '#001133'); // Dark blue
        gradient.addColorStop(1, '#2f004f'); // Indigo
        bgCtx.fillStyle = gradient;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

        // Draw connections between education and technology icons
        for (let i = 0; i < edTechIcons.length; i++) {
            for (let j = i + 1; j < edTechIcons.length; j++) {
                const icon1 = edTechIcons[i];
                const icon2 = edTechIcons[j];
                if (icon1.icon.type !== icon2.icon.type) { // Connect education to technology
                    const dx = icon1.x - icon2.x;
                    const dy = icon1.y - icon2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 200) {
                        bgCtx.beginPath();
                        bgCtx.moveTo(icon1.x, icon1.y);
                        bgCtx.lineTo(icon2.x, icon2.y);
                        bgCtx.strokeStyle = `rgba(0, 183, 235, ${0.3 - distance / 200})`;
                        bgCtx.lineWidth = 0.5;
                        bgCtx.stroke();
                    }
                }
            }
        }

        // Update and draw icons
        edTechIcons.forEach(icon => {
            icon.update();
            icon.draw();
        });

        requestAnimationFrame(animateBackground);
    }

    // Resize background canvas
    window.addEventListener('resize', () => {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    });

    animateBackground();
});