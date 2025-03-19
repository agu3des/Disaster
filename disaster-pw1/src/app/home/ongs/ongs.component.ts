import { Component } from '@angular/core';

@Component({
  selector: 'app-ongs',
  imports: [],
  templateUrl: './ongs.component.html',
  styleUrl: './ongs.component.css'
})
export class OngsComponent {

  slideIndex = 0;

  moveSlide(n: number): void {
    const slides = document.querySelectorAll<HTMLImageElement>('.slide');
    this.slideIndex += n;

    if (this.slideIndex >= slides.length) this.slideIndex = 0;
    if (this.slideIndex < 0) this.slideIndex = slides.length - 1;

    const carousel = document.getElementById('carousel') as HTMLElement;
    if (carousel) {
      carousel.style.transform = `translateX(${-this.slideIndex * 100}%)`;
    }
  }

  currentTestimonialIndex = 0;

  testimonials = [
    {
      text: '"This NGO helped me get access to education when I had no other options. I\'m forever grateful!"',
      author: '- John Doe'
    },
    {
      text: '"Thanks to their support, I can now feed my family and improve our living conditions."',
      author: '- Jane Smith'
    },
    {
      text: '"The work they do in underprivileged communities is truly inspiring. A great cause!"',
      author: '- Mark Johnson'
    }
  ];

  moveTestimonial(direction: number) {
    this.currentTestimonialIndex += direction;

    // Ensure the index stays within bounds
    if (this.currentTestimonialIndex < 0) {
      this.currentTestimonialIndex = this.testimonials.length - 1;
    } else if (this.currentTestimonialIndex >= this.testimonials.length) {
      this.currentTestimonialIndex = 0;
    }
  }


}
