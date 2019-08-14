import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { UserProfile } from '../user-profile';
import { ActionType } from '../action-button-panel/action-button-panel.component';
import { UserProfileStoreItem } from '../user-profile-store-item';

@Component({
  selector: 'app-user-profile-list',
  templateUrl: './user-profile-list.component.html',
  styleUrls: ['./user-profile-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileListComponent implements OnInit {

  @Input() storeItems: UserProfileStoreItem[] = [];

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
}
