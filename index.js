
const adminEmail= "ntandohlongwane07@gmail.com";

document.addEventListener("DOMContentLoaded", function () {


    var slideImage = document.getElementById("slideImage");

    if (slideImage) {
        var images = [
            { src: "images/image1 (4).jpeg", caption: "Mandela's Coffee" },
            { src: "images/image5.jpeg", caption: "Our Coffee Culture" },
            { src: "images/image4.jpeg", caption: "Freshly Brewed" },
            { src: "images/image3.jpeg", caption: "Vilakazi Vibes" },
            { src: "images/image2.jpeg", caption: "Coffee + Culture" }
        ];

        var currentSlide = 0;
        var slideInterval;
        var isPlaying = true;

        var prevBtn = document.getElementById("prevBtn");
        var nextBtn = document.getElementById("nextBtn");
        var playBtn = document.getElementById("playBtn");
        var slideCaption = document.getElementById("slideCaption");
        var slideCounter = document.getElementById("slideCounter");

        function showSlide(index) {
            slideImage.src = images[index].src;
            slideCaption.textContent = images[index].caption;
            slideCounter.textContent = (index + 1) + " / " + images.length;
        }

        function nextSlide() {
            currentSlide++;
            if (currentSlide >= images.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = images.length - 1;
            }
            showSlide(currentSlide);
        }

        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 3000);
            isPlaying = true;
            playBtn.textContent = "Pause Slideshow";
        }

        function stopSlideshow() {
            clearInterval(slideInterval);
            isPlaying = false;
            playBtn.textContent = "Play Slideshow";
        }

        // Buttons
        nextBtn.addEventListener("click", function () {
            nextSlide();
            if (isPlaying) {
                stopSlideshow();
                startSlideshow();
            }
        });

        prevBtn.addEventListener("click", function () {
            prevSlide();
            if (isPlaying) {
                stopSlideshow();
                startSlideshow();
            }
        });

        playBtn.addEventListener("click", function () {
            if (isPlaying) {
                stopSlideshow();
            } else {
                startSlideshow();
            }
        });

        // Start
        showSlide(currentSlide);
        startSlideshow();

        // Lightbox for slideshow image
        slideImage.addEventListener("click", function () {
            openLightbox(this.src, slideCaption.textContent);
        });
    }


    var galleryImages = document.querySelectorAll(".gallery-section img");

    if (galleryImages.length > 0) {
        galleryImages.forEach(function (img) {
            img.addEventListener("click", function () {
                openLightbox(this.src, this.alt);
            });
        });
    }

    function openLightbox(src, caption) {
        var lightbox = document.createElement("div");
        lightbox.style.position = "fixed";
        lightbox.style.top = "0";
        lightbox.style.left = "0";
        lightbox.style.width = "100%";
        lightbox.style.height = "100%";
        lightbox.style.background = "rgba(44,24,16,0.9)";
        lightbox.style.display = "flex";
        lightbox.style.flexDirection = "column";
        lightbox.style.justifyContent = "center";
        lightbox.style.alignItems = "center";
        lightbox.style.zIndex = "1000";
        lightbox.style.cursor = "pointer";

        lightbox.innerHTML = `
            <img src="${src}" style="max-width:90%; max-height:80%; border-radius:12px; border:2px solid #D4A017;">
            <p style="color:#FDFBF7; margin-top:15px; font-size:14px;">${caption}</p>
            <span style="color:#D4A017; margin-top:10px; font-size:11px; letter-spacing:2px;">CLICK TO CLOSE</span>
        `;

        lightbox.addEventListener("click", function () {
            document.body.removeChild(lightbox);
        });

        document.body.appendChild(lightbox);
    }

    var contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var phone = document.getElementById("phone");
            var enquiryType = document.getElementById("enquiryType").value;
            var message = document.getElementById("message").value;

            // Simple validation
            if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
                alert("Please fill in all required fields.");
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                alert("Please enter a valid email address.");
                return;
            }

            if (enquiryType === "") {
                alert("Please select an enquiry type.");
                return;
            }

            // If everything is okay
            alert("Thank you " + name + "! Your " + enquiryType + " enquiry has been sent.\nWe will contact you at " + email + " soon.");

            // Save to local storage
            var enquiryData = {
                name: name,
                email: email,
                type: enquiryType,
                date: new Date().toLocaleString()
            };
            localStorage.setItem("lastEnquiry", JSON.stringify(enquiryData));

            contactForm.reset();
        });
    }

});


    var contactUsForm = document.getElementById("contactForm");

    if (contactUsForm) {
        contactUsForm.addEventListener("submit", function (e) {

            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var message = document.getElementById("message").value;

            // 1. Check if empty
            if (name.trim() === "") {
                alert("Please enter your name.");
                e.preventDefault();
                return;
            }

            if (email.trim() === "") {
                alert("Please enter your email.");
                e.preventDefault();
                return;
            }

            // 2. Check email format
            if (!email.includes("@") || !email.includes(".")) {
                alert("Please enter a valid email address.");
                e.preventDefault();
                return;
            }

            if (message.trim() === "") {
                alert("Please enter your message.");
                e.preventDefault();
                return;
            }

            if (message.trim().length < 10) {
                alert("Your message is too short. Please write at least 10 characters.");
                e.preventDefault();
                return;
            }

            // 3. If everything is okay - show loading text
            var submitBtn = contactUsForm.querySelector("button");
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            // Save to localStorage for POE evidence
            var contactData = {
                name: name,
                email: email,
                message: message,
                date: new Date().toLocaleString()
            };
            localStorage.setItem("lastContact", JSON.stringify(contactData));

            // Do NOT call e.preventDefault() here - let the form go to FormSubmit and send to your email
            // The user will be redirected to FormSubmit, then back if you add _next input
        });
    }

    
    // Date and time in footer
    var datetime = document.getElementById("datetime");
    if (datetime) {
        function updateDateTime() {
            var now = new Date();
            var options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            datetime.textContent = now.toLocaleDateString('en-US', options);
        }
        updateDateTime();
        setInterval(updateDateTime, 1000); // update every second
    }

    window.showMyLocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            var userLat = pos.coords.latitude;
            var userLng = pos.coords.longitude;
            var shopLat = -26.2385;
            var shopLng = 27.9087;

            // Update iframe to show route from user to shop
            var gmap = document.getElementById("gmap");
            gmap.src = `https://www.google.com/maps/dir/${userLat},${userLng}/-26.2385,27.9087/@${shopLat},${shopLng},16z?entry=ttu`;

            // Simple distance calculation
            function getDistance(lat1, lon1, lat2, lon2) {
                var R = 6371; // km
                var dLat = (lat2-lat1) * Math.PI/180;
                var dLon = (lon2-lon1) * Math.PI/180;
                var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2) * Math.sin(dLon/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                return R * c;
            }
            var dist = getDistance(userLat, userLng, shopLat, shopLng).toFixed(2);
            document.getElementById("distance").textContent = "You are " + dist + " km away from Vilakazi Espresso!";

        }, function() {
            alert("Please allow location to show distance.");
        });
    } else {
        alert("Location not supported on this device");
    }
}