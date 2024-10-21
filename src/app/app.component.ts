import { Component, Inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SectionComponent } from './components/section/section.component';
import { MenuComponent } from './components/menu/menu.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, SectionComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'styffen.github.io';
}
