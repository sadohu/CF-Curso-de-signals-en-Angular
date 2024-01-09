import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  name: string;
  isCompleted: boolean;
}

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
  tasks = signal<Task[]>([
    { name: 'Watch signals course', isCompleted: false },
  ]);

  // asReadonly() returns a readonly version of the signal
  description = signal('Signals are awesome!').asReadonly();

  toggleName() {
    this.name.set('Donie');
  }

  addRandomTask() {
    this.tasks.update(tasks => {
      return [...tasks, { name: 'Practice everyday', isCompleted: false }];
    });
  }

  markTaskAsCompleted(task: Task) {
    this.tasks.mutate(tasks => {
      const taskIndex = tasks.indexOf(task);
      tasks[taskIndex].isCompleted = true;
    });
  }

}
