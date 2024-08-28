import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StopwatchComponent } from './common-ui/stopwatch/stopwatch.component';
import { TimerComponent } from './common-ui/timer/timer.component';
import { SwitchButtonComponent } from './common-ui/switch-button/switch-button.component';
import { TimerInputComponent } from './common-ui/timer/timer-input/timer-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, StopwatchComponent, TimerComponent, SwitchButtonComponent, TimerInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tech-task__project';

  isStopwatchMode: boolean = false;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  toggleMode(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.isStopwatchMode = inputElement.checked;
  }

  onTimeSelected(time: { hr: number, min: number, sec: number }): void {
    this.hours = time.hr;
    this.minutes = time.min;
    this.seconds = time.sec;
  }
}
