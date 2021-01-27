import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();

  startDate: Date;
  endDate: Date;

  private readonly darkThemeClass = 'dark-theme';

  constructor(@Inject(DOCUMENT) private document) { 
    this.setDates();
  }

  ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
  }

  private setDates() {
    let tmp: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate(), 1, 0, 0);
    let day = tmp.getDay();
    let diff = tmp.getDate() - day + (day == 0 ? -6 : 1);
    this.startDate = new Date(tmp.setDate(diff));
    tmp = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate(), 1, 0, 0);
    tmp.setDate(tmp.getDate() + 7 - day);
    tmp.setHours(22);
    tmp.setMinutes(59);
    this.endDate = new Date(tmp);
    // console.log("Start", this.startDate);
    // console.log("End", this.endDate);  
  }

  onWeekChange() {
    this.setDates();
    // console.log("View", this.viewDate.toString());
  }

  onToggleActive(el: HTMLElement) {
    el.classList.toggle('active');
  }

  onOptionSelected(opt: HTMLElement, index: number) {
    const txt = opt.textContent;
    const siblings = document.querySelectorAll('.sel__box__options');
    const placeholder = document.querySelector('.sel__placeholder');
    const select: HTMLSelectElement = document.querySelector('#select-profession');

    siblings.forEach((s, i) => {
      if(i != index) {
        s.classList.remove('selected');
      }
    });
    opt.classList.add('selected');
    
    placeholder.textContent = txt;
    select.selectedIndex = index + 1;
    // this.currentWeekDay = index + 1;
  }

}
