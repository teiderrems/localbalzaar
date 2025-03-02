import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  title=input<string>('Submit');
  onClick=output<MouseEvent>();
  onSubmit=output<SubmitEvent>();
  loading=input<boolean>(false);
  disabled=input<boolean>(false);
  type=input<string>('button');
  class=input<string>('border rounded-md px-4 py-2 text-xl text-white bg-blue-500 hover:bg-blue-600 hover:shadow-md');

  onSubmitHandler($event: SubmitEvent): void {
    $event.preventDefault();
    this.onSubmit.emit($event);
  }

  onClickHandler($event: MouseEvent): void {
    this.onClick.emit($event);
  }
}
