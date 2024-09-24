import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpWithListenerComponent } from './sign-up-with-listener/sign-up-with-listener.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignUpComponent, SignUpWithListenerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
