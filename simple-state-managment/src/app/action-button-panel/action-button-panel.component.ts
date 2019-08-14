import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

export type ActionType = 'save' | 'delete';

@Component({
  selector: 'app-action-button-panel',
  templateUrl: './action-button-panel.component.html',
  styleUrls: ['./action-button-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonPanelComponent implements OnInit {

  @Input() actionInProgress$: Observable<ActionType | null> = of(null);

  @Output() save: EventEmitter<undefined> = new EventEmitter();
  @Output() delete: EventEmitter<undefined> = new EventEmitter();
  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() edit: EventEmitter<undefined> = new EventEmitter();

  isEditMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDeleteInProgress$: Observable<boolean> = of(false);
  isSaveInProgress$: Observable<boolean> = of(false);

  constructor() { }

  ngOnInit() {
    this.actionInProgress$
      .subscribe(v => {
      switch (v) {
        case 'delete': this.isEditMode$.next(false); break;
        case 'save': this.isEditMode$.next(true); break;
        default: this.isEditMode$.next(false); break;
      }
    });

    this.isDeleteInProgress$ = this.actionInProgress$.pipe(map(v => v === 'delete'));
    this.isSaveInProgress$ = this.actionInProgress$.pipe(map(v => v === 'save'));
  }

  onEdit() {
    this.edit.emit();
    this.isEditMode$.next(true);
  }

  onCancel() {
    this.cancel.emit();
    this.isEditMode$.next(false);
  }

  onSave() {
    this.save.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
