import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'signals-example';

  // Create a signal with a default value

  // Between the <> you can specify the type of the signal
  // If you don't specify a type,
  // the type will be automatically inferred from the default value
  // name = signal('Hugo'); -> String

  name = signal<any>('Hugo');

  toggleName() {
    this.name.set('Donie');
  }
}
