import { Observable, of } from 'rxjs';
import { UserProfile } from './user-profile';
import { OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { UserProfileStoreService } from './user-profile-store.service';
import { UserProfileStoreItem } from './user-profile-store-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Simple';

  userProfilesStoreItems$: Observable<UserProfileStoreItem[] | undefined> = of(undefined);

  constructor(
    private userProfileStoreService: UserProfileStoreService
  ) {
  }

  ngOnInit() {
    this.userProfilesStoreItems$ = this.userProfileStoreService.getAll();
  }

  saveUserProfile(profile: UserProfile) {
    this.userProfileStoreService.save(profile)
      .subscribe();
  }

  deleteUserProfile(profile: UserProfile) {
    this.userProfileStoreService.delete(profile)
      .subscribe();
  }
}
