import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StopwatchComponent } from './common-ui/stopwatch/stopwatch.component';
import { TimerComponent } from './common-ui/timer/timer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StopwatchComponent, TimerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tech-task__project';
}
