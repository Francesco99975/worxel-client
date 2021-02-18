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
  @Input() special?: boolean;
  @Input() hours?: boolean;
  @Input() avatar? : string;

  @Output() update: EventEmitter<number> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  pickTextColorBasedOnBgColorAdvanced(bgColor: string) {
    const white = "#FFFFFF";
    const black = "#000000";
    const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    const uicolors = [r / 255, g / 255, b / 255];
    const c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return (L > 0.179) ? black : white;
  }

  onUpdate() {
    this.update.emit(this.index);
  }

  onDelete() {
    this.delete.emit(this.index);
  }

}
