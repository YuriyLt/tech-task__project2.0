import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StopwatchComponent } from './common-ui/stopwatch/stopwatch.component';
import { TimerComponent } from './common-ui/timer/timer.component';
import { SwitchButtonComponent } from './common-ui/switch-button/switch-button.component';
import { TimerInputComponent } from './common-ui/timer/timer-input/timer-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StopwatchComponent, TimerComponent, SwitchButtonComponent, TimerInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tech-task__project';
}
