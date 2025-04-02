import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterLink, MatButton, MatIconModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
