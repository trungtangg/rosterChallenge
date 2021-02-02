import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from '../../models';

@Component({
  selector: 'app-roster-table',
  templateUrl: './roster-table.component.html',
})
export class RosterTableComponent {
  @Input() order: boolean;
  @Input() field: string;
  @Input() artists: Artist[];
  @Output() sort = new EventEmitter();
  @Output() togglePaid = new EventEmitter();

  constructor() {}

  sortTable(event: string) {
    this.field = event;
    this.sort.emit(event);
  }

  setPaid(event: Artist) {
    this.togglePaid.emit(event);
  }
}
