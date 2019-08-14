import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserProfile } from '../user-profile';
import { UserProfileStoreService } from '../user-profile-store.service';
import { UserProfileStoreItem } from '../user-profile-store-item';

@Component({
  selector: 'app-user-profile-grid',
  templateUrl: './user-profile-grid.component.html',
  styleUrls: ['./user-profile-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileGridComponent implements OnInit {

  @Input() storeItems: UserProfileStoreItem[] = [];

  constructor(private profileStoreService: UserProfileStoreService) { }

  ngOnInit() {
  }

  onDelete(storeItem: UserProfileStoreItem) {
    this.profileStoreService.delete(storeItem.data)
      .subscribe();
  }

  isProfileDeletionInProgress(storeItem: UserProfileStoreItem) {
    return storeItem.actionInProgress === 'delete';
  }
}
