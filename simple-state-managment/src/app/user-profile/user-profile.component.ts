import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { UserProfile } from '../user-profile';
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ActionType } from '../action-button-panel/action-button-panel.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  @Input() profile: UserProfile = new UserProfile();
  @Input() actionInProgress: ActionType | null = null;

  @Output() save: EventEmitter<UserProfile> = new EventEmitter<UserProfile>();
  @Output() delete: EventEmitter<UserProfile> = new EventEmitter<UserProfile>();

  isEditMode: Subject<boolean> = new Subject<boolean>();

  formGroup = this.formBuilder.group({
    fullName: ['']
  });

  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bindForm(this.profile);
  }

  onEdit() {
    this.isEditMode.next(true);
  }

  onCancel() {
    this.isEditMode.next(false);
    this.bindForm(this.profile);
  }

  onSave() {
    const name = splitFullName(this.formGroup.value.fullName);
    const updatedProfile = Object.assign({}, this.profile, name);
    this.save.emit(updatedProfile);
  }

  onDelete() {
    this.delete.emit(this.profile);
  }

  private bindForm(profile: UserProfile) {
    const fullName = toFullName(profile);
    this.formGroup.setValue({ fullName });
  }
}

function splitFullName(v: string): { firstName: string, lastName: string } {
  const arr = v.split(/[ ]+/, 2);
  return { firstName: arr[0], lastName: arr[1] };
}

function toFullName(v: { firstName: string, lastName: string }): string {
  return toTitleCase(`${v.firstName} ${v.lastName}`);
}

function toTitleCase(v: string): string {
  const str = v.toLowerCase().split(' ');
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}
