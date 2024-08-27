import { CssSelector } from '@angular/compiler';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements AfterViewInit, OnDestroy {

  private timerLoop: number | null = null;
  private startTime: number = 0;
  private futureTime: number = 0;

  hr: number = 0;
  min: number = 0;
  sec: number = 10;

  semicircles: HTMLElement[] = [];
  timerElement: HTMLElement | null = null;

  ngAfterViewInit() {
    this.initializeTimer();
  }

  ngOnDestroy() {
    if(this.timerLoop !== null) {
      clearInterval(this.timerLoop);
    }
  }

  private initializeTimer(): void {
    this.timerElement = document.querySelector('.timer');

    const hours = this.hr * 1000 * 60 * 60;
    const minutes = this.min * 60 * 1000;
    const seconds = this.sec * 1000;
    const setTime = hours + minutes + seconds;

    this.startTime = Date.now();
    this.futureTime = this.startTime + setTime;
    
    this.timerLoop = window.setInterval(() => this.countDownTimer(), 10);
    this.countDownTimer();
  }

  private countDownTimer(): void {
    if (this.timerElement === null) 
      return;

    const currentTime = Date.now();
    const remainingTime = this.futureTime - currentTime;

    const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en', { minimumIntegerDigits: 2, useGrouping: false });
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en', { minimumIntegerDigits: 2, useGrouping: false });
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en', { minimumIntegerDigits: 2, useGrouping: false });

    this.timerElement.innerHTML = `
      <div>${hrs}</div>
      <div class="colon">:</div>
      <div>${mins}</div>
      <div class="colon">:</div>
      <div>${secs}</div>
      `;

      if (remainingTime <= 6000) {
        this.timerElement.style.color = 'red';
      }

      if (remainingTime < 0) {
        if (this.timerLoop !== null) {
          clearInterval(this.timerLoop);
        }

        this.timerElement.innerHTML = `
          <div>00</div>
          <div class="colon">:</div>
          <div>00</div>
          <div class="colon">:</div>
          <div>00</div>
        `;

        this.timerElement.style.color = 'rgb(21, 195, 189)';
      }
    }
  }