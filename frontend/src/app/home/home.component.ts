import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,RouterLink, RouterLinkActive,MatIconModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  showsidebar:boolean= false;

}
