import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../app/_layout/header/header.component';
import { FooterComponent } from '../app/_layout/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-home',
  imports: [MatTabsModule, RouterOutlet, MatIconModule, HeaderComponent, FooterComponent, MatSidenavModule, MatIconButton, RouterLink, MatGridListModule, MatDividerModule ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  open=signal<boolean>(false);
}
