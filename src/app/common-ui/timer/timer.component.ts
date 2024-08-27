import { CssSelector } from '@angular/compiler';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { TimerInputComponent } from './timer-input/timer-input.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [TimerInputComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})


export class TimerComponent implements AfterViewInit, OnDestroy {

  private timerLoop: number | null = null;
  private startTime: number = 0;
  private futureTime: number = 0;

  hr: number = 0;
  min: number = 0;
  sec: number = 0;

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
    this.resetTimer();
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

    this.updateTimerDisplay(0, 0, 0);
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

      if (remainingTime <= 6000) {
        this.timerElement.style.color = 'red';
      }

      if (remainingTime < 0) {
        this.clearTimer();
        this.updateTimerDisplay(0, 0, 0);
        this.timerElement.style.color = 'rgb(21, 195, 189)';
      }
    }

    private updateTimerDisplay(hrs: number, mins: number, secs: number): void {
      if (this.timerElement === null) 
        return;

        this.timerElement.innerHTML = `
          <div>${hrs}</div>
          <div class="colon">:</div>
          <div>${mins}</div>
          <div class="colon">:</div>
          <div>${secs}</div>
        `;
      }
      private clearTimer(): void {
        if (this.timerLoop !== null) {
          clearInterval(this.timerLoop);
          this.timerLoop = null;
        }
    }
  }