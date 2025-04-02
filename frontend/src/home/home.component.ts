import {Component, signal} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../app/_layout/header/header.component';
import {FooterComponent} from '../app/_layout/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-home',
  imports: [MatTabsModule, RouterOutlet, HeaderComponent, FooterComponent, MatSidenavModule, MatIcon, MatButton, MatIconButton, RouterLink, MatGridListModule, MatDividerModule ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  open=signal<boolean>(false);
}
