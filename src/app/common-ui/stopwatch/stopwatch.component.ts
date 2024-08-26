import { CssSelector, LetDeclaration } from '@angular/compiler';
import { Component } from '@angular/core';
import { ValueChangeEvent } from '@angular/forms';


@Component({
  selector: 'app-stopwatch',
  standalone: true,
  imports: [],
  templateUrl: './stopwatch.component.html',
  styleUrl: './stopwatch.component.scss'
})
export class StopwatchComponent {

  title = '00:00:00:00';
  
  timer : number | null = null;
  startTime: number = 0;
  elapsedTime: number = 0;
  isRunning: boolean = false;

  start():void {
      if(!this.isRunning){
          this.startTime = Date.now() - this.elapsedTime;
          this.timer = window.setInterval(() => this.update(), 10);
          this.isRunning = true;
      }
  }
  
  stop():void {
      if(this.isRunning && this.timer !== null){
          clearInterval(this.timer);
          this.elapsedTime = Date.now() - this.startTime;
          this.isRunning = false;
      }
  }
  
  reset():void {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
      this.startTime = 0;
      this.elapsedTime = 0;
      this.isRunning = false;
      this.timer = null;
      this.title = '00:00:00:00';
  }
  
  update():void {
      const currentTime = Date.now();
      this.elapsedTime = currentTime - this.startTime;
  
      let hours = Math.floor(this.elapsedTime / (1000 * 60 * 60)).toLocaleString('en', {minimumIntegerDigits: 2, useGrouping:false});
      let minutes = Math.floor(this.elapsedTime / (1000 * 60)% 60).toLocaleString('en', {minimumIntegerDigits: 2, useGrouping:false});
      let seconds = Math.floor(this.elapsedTime / 1000 % 60).toLocaleString('en', {minimumIntegerDigits: 2, useGrouping:false});
      let miliseconds = Math.floor(this.elapsedTime % 1000 / 10).toLocaleString('en', {minimumIntegerDigits: 2, useGrouping:false});
  
  
      this.title = `${hours}:${minutes}:${seconds}:${miliseconds}`;
  
  }
  
  
}
