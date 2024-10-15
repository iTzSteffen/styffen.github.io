import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.addEventListener('DOMContentLoaded', () => {
      const interBubble =
        document.querySelector<HTMLDivElement>('.interactive')!;
      let curX = 0;
      let curY = 0;
      let tgX = 0;
      let tgY = 0;

      function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(
          curX
        )}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
          move();
        });
      }

      window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
      });

      move();
    });

    const design = this.document.getElementById('design');
    const build = this.document.getElementById('build');
    design?.addEventListener('mouseover', () => {
      let interactive = this.document.querySelector('.interactive');
      console.log(interactive);
      if (interactive instanceof HTMLElement) {
        interactive.style.background = `radial-gradient(
          circle at center,
          rgba(240, 98, 146, 0.8) 0%,
          rgba(240, 98, 146, 0) 50%
        ) no-repeat`;
      }
    });
    build?.addEventListener('mouseover', () => {
      let interactive = this.document.querySelector('.interactive');
      console.log(interactive);
      if (interactive instanceof HTMLElement) {
        interactive.style.background = `radial-gradient(
          circle at center,
          rgba(100, 255, 218, 0.8) 0%,
          rgba(100, 255, 218  , 0) 50%
        ) no-repeat`;
      }
    });
  }
}
