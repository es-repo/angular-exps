import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { UserProfile } from '../user-profile';
import { ActionType } from '../action-button-panel/action-button-panel.component';

@Component({
  selector: 'app-user-profile-list',
  templateUrl: './user-profile-list.component.html',
  styleUrls: ['./user-profile-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileListComponent implements OnInit {

  @Input() profiles: UserProfile[] = [];
  @Input() profilesDeletingInProgress: UserProfile[] = [];

  @Output() save = new EventEmitter<UserProfile>();
  @Output() delete = new EventEmitter<UserProfile>();

  constructor() { }

  ngOnInit() {
  }

  onSave(profile: UserProfile) {
    this.save.emit(profile);
  }

  onDelete(profile: UserProfile) {
    this.delete.emit(profile);
  }

  getProfileActionInProgress(profile: UserProfile): ActionType | undefined {
    return this.profilesDeletingInProgress.indexOf(profile) !== -1 ? 'delete' : undefined;
  }
}
