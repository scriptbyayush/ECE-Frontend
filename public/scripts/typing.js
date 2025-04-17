class TypeWriter {
  constructor(element, text) {
    this.element = element;
    this.text = text;
    this.txt = '';
    this.isDeleting = false;
    this.type();
  }

  type() {
    if (this.isDeleting) {
      // Remove char
      this.txt = this.text.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = this.text.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.element.innerHTML = `<span class="typing-text">${this.txt}</span>`;

    // Type Speed
    let typeSpeed = this.isDeleting ? 50 : 100;

    // If word is complete
    if (!this.isDeleting && this.txt === this.text) {
      // Make pause at end
      typeSpeed = 5000; // 5 second pause
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Pause before starting again
      typeSpeed = 1000;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const element = document.querySelector('.hero-content h1');
  const text = 'Electronics and Computer Engineering';

  // Init TypeWriter
  new TypeWriter(element, text);
} 