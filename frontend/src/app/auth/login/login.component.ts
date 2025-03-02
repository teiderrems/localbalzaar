import { Component } from '@angular/core';
import { ButtonComponent } from "../../_components/button/button.component";

@Component({
  selector: 'app-login',
  imports: [ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  hello() {

    console.log("hello world");
  }

}
