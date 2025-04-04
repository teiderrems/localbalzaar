import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterLink, MatIconModule, RouterLinkActive,MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
