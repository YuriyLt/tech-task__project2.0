import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timer-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './timer-input.component.html',
  styleUrl: './timer-input.component.scss'
})

export class TimerInputComponent {

   selectedTime: string = '';

   @Output() timeSelected = new EventEmitter<{ hr: number, min: number, sec: number }>();

   onTimeChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedTime = inputElement.value;
    console.log('Selected Time:', this.selectedTime);

    const [hr, min, sec] = this.selectedTime.split(':').map(Number);
    
    this.timeSelected.emit({ hr, min, sec });
  }
}
