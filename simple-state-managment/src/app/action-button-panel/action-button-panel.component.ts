import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';

export type ActionType = 'save' | 'delete';

@Component({
  selector: 'app-action-button-panel',
  templateUrl: './action-button-panel.component.html',
  styleUrls: ['./action-button-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonPanelComponent implements OnInit {

  @Input() actionInProgress: ActionType | undefined = undefined;

  @Output() save: EventEmitter<undefined> = new EventEmitter();
  @Output() delete: EventEmitter<undefined> = new EventEmitter();
  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() edit: EventEmitter<undefined> = new EventEmitter();

  isEditMode: Subject<boolean> = new Subject<boolean>();

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
