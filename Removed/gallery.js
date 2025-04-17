// Gallery functionality
document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  // Open Lightbox
  galleryItems.forEach((img) => {
    img.addEventListener("click", function () {
      lightbox.style.display = "flex";
      lightboxImg.src = this.src;
      
      // Get caption from parent gallery item
      const galleryItem = this.closest('.gallery-item');
      const captionTitle = galleryItem.querySelector('.gallery-overlay h3').textContent;
      const captionText = galleryItem.querySelector('.gallery-overlay p').textContent;
      
      // Update lightbox caption
      const lightboxCaption = lightbox.querySelector('.lightbox-caption');
      lightboxCaption.querySelector('h3').textContent = captionTitle;
      lightboxCaption.querySelector('p').textContent = captionText;
    });
  });

  // Close Lightbox
  closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
  });

  // Close Lightbox when clicking outside the image
  lightbox.addEventListener("click", function (e) {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });
}); 