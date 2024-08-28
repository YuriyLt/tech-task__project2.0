import { CssSelector } from '@angular/compiler';
import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { TimerInputComponent } from './timer-input/timer-input.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [TimerInputComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})


export class TimerComponent implements AfterViewInit, OnDestroy {

  @Input() hours: number = 0;
  @Input() minutes: number = 0;
  @Input() seconds: number = 0;

  private timerLoop: number | null = null;
  private startTime: number = 0;
  private futureTime: number = 0;

  hr: number = 0;
  min: number = 0;
  sec: number = 0;

  public hrs: string = '00';
  public mins: string = '00';
  public secs: string = '00';

  timerElement: HTMLElement | null = null;
  isRunning: boolean = false;

  ngAfterViewInit() {
    this.timerElement = document.querySelector('.timer');
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  onTimeSelected(time: { hr: number, min: number, sec: number }): void {
    this.hr = time.hr;
    this.min = time.min;
    this.sec = time.sec;
    this.updateTimerDisplay(this.hr.toString().padStart(2, '0'), this.min.toString().padStart(2, '0'), this.sec.toString().padStart(2, '0'));
  }

  startTimer(): void {
    if (!this.isRunning) {
      this.initializeTimer();
      this.isRunning = true;
    }
  }

  stopTimer(): void {
    this.clearTimer();
    this.isRunning = false;
  }

  resetTimer(): void {
    this.clearTimer();
    this.isRunning = false;
    this.hrs = '00';
    this.mins = '00';
    this.secs = '00';
    this.updateTimerDisplay(this.hrs, this.mins, this.secs);
  }

  private initializeTimer(): void {
    if (this.timerElement === null) {
      this.timerElement = document.querySelector('.timer');
    }

    const hours = this.hr * 1000 * 60 * 60;
    const minutes = this.min * 60 * 1000;
    const seconds = this.sec * 1000;
    const setTime = hours + minutes + seconds;

    this.startTime = Date.now();
    this.futureTime = this.startTime + setTime;

    if (this.timerLoop !== null) {
      clearInterval(this.timerLoop);
    }
    
    this.timerLoop = window.setInterval(() => this.countDownTimer(), 10);
    this.countDownTimer();
  }

  private countDownTimer(): void {
    if (this.timerElement === null) 
      return;
    
      const currentTime = Date.now();
      const remainingTime = this.futureTime - currentTime;

      const hrs: any = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en', { minimumIntegerDigits: 2, useGrouping: false });
      const mins: any = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en', { minimumIntegerDigits: 2, useGrouping: false });
      const secs: any = Math.floor((remainingTime / 1000) % 60).toLocaleString('en', { minimumIntegerDigits: 2, useGrouping: false });

      this.updateTimerDisplay(hrs, mins, secs);

        if (remainingTime <= 6000 && this.timerElement) {
          this.timerElement.style.color = 'red';
        }

        if (remainingTime < 0 && this.timerElement) {
          this.clearTimer();
          this.hrs = '00';
          this.mins = '00';
          this.secs = '00';
          this.updateTimerDisplay(this.hrs, this.mins, this.secs);
          }
        } 

        private updateTimerDisplay(hrs: string, mins: string, secs: string): void {
          if (this.timerElement === null) 
            return;

            const displayElement = this.timerElement.querySelector('.timer');
            if (displayElement) {
              displayElement.innerHTML = `
                <div class="innerTimer">
                  <div class="timer-unit">${hrs}</div>
                  <div class="colon">:</div>
                  <div class="timer-unit">${mins}</div>
                  <div class="colon">:</div>
                  <div class="timer-unit">${secs}</div>
                </div>
                `;
            }
          }

          private clearTimer(): void {
            if (this.timerLoop !== null) {
              clearInterval(this.timerLoop);
              this.timerLoop = null;
            }
    }
  }