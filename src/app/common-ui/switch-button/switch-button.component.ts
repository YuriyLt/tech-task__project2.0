import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { TimerComponent } from '../timer/timer.component';
import { StopwatchComponent } from '../stopwatch/stopwatch.component';

@Component({
  selector: 'app-switch-button',
  standalone: true,
  imports: [FormsModule, AppComponent, TimerComponent, StopwatchComponent],
  templateUrl: './switch-button.component.html',
  styleUrl: './switch-button.component.scss'
})
export class SwitchButtonComponent {
  isStopwatchMode = false;

  @Output() modeChange = new EventEmitter<boolean>();

  onModeChange(): void {
    this.modeChange.emit(this.isStopwatchMode);
  }
}