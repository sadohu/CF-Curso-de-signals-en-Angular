import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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

export class AppComponent implements OnInit {
  title = 'signals-example';

  /* Signals and Variables */

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

  // Computed signals are signals that are computed from other signals
  // and they are stored in memory
  taskLength = computed(() => this.tasks().length);

  // toObservable() returns an observable version of the signal
  // This is useful when you want to use the async pipe in the template
  tasks$ = toObservable(this.tasks);

  constructor() {
    // Effects are signals that are computed from other signals
    // but they don't have a value and they are not stored in memory
    effect(() => {
      if (this.taskLength() > 5)
        alert(`You have a lot of tasks to do!`);

    });
  }

  ngOnInit(): void {
    // this.tasks$.subscribe(response => {
    //   console.log("response", response);
    // });

    this.tasks$.pipe(
      map(result => {
        const newTaks = result.map(task => ({ ...task, creationate: new Date() }));
        return newTaks;
      })
    ).subscribe(response => console.log("response", response));
  }

  /* Methods */

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
