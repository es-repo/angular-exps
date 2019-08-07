import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserProfile } from '../user-profile';
import { UserProfileStoreService } from '../user-profile-store.service';

@Component({
  selector: 'app-user-profile-grid',
  templateUrl: './user-profile-grid.component.html',
  styleUrls: ['./user-profile-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileGridComponent implements OnInit {

  @Input() profiles: UserProfile[] = [];
  @Input() profilesDeletingInProgress: UserProfile[] = [];

  constructor(private profileStoreService: UserProfileStoreService) { }

  ngOnInit() {
    // console.log(this.profilesDeletingInProgress);
  }

  onDelete(profile: UserProfile) {
    this.profileStoreService.delete(profile)
      .subscribe();
  }

  isProfileDeletionInProgress(profile: UserProfile) {
    return this.profilesDeletingInProgress.findIndex(e => profile === e) !== -1;
  }
}
