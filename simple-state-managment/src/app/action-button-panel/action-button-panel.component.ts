import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ActionType = 'save' | 'delete';

@Component({
  selector: 'app-action-button-panel',
  templateUrl: './action-button-panel.component.html',
  styleUrls: ['./action-button-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonPanelComponent implements OnInit {

  private actionInProgressValue: ActionType | null = null;
  @Input()
  get actionInProgress(): ActionType | null { return this.actionInProgressValue; }
  set actionInProgress(value: ActionType | null) {
    this.actionInProgressValue = value;
    switch (value) {
      case 'delete': this.isEditMode.next(false); break;
      case 'save': this.isEditMode.next(true); break;
      default: this.isEditMode.next(false); break;
    }
  }

  @Output() save: EventEmitter<undefined> = new EventEmitter();
  @Output() delete: EventEmitter<undefined> = new EventEmitter();
  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() edit: EventEmitter<undefined> = new EventEmitter();

  isEditMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isSaveInProgress() { return this.actionInProgress === 'save'; }
  get isDeleteInProgress() { return this.actionInProgress === 'delete'; }

  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.edit.emit();
    this.isEditMode.next(true);
  }

  onCancel() {
    this.cancel.emit();
    this.isEditMode.next(false);
  }

  onSave() {
    this.save.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
