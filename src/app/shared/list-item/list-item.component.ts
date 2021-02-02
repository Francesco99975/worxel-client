import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle?: string;
  @Input() index: number;

  @Output() update: EventEmitter<number> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate() {
    this.update.emit(this.index);
  }

  onDelete() {
    this.delete.emit(this.index);
  }

}
