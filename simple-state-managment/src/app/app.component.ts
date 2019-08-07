import { Observable, of } from 'rxjs';
import { UserProfile } from './user-profile';
import { OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { UserProfileStoreService } from './user-profile-store.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Simple';

  userProfiles$: Observable<UserProfile[] | undefined> = of(undefined);
  userProfilesDeletingInProgress$: Observable<UserProfile[]> = of([]);

  constructor(
    private userProfileStoreService: UserProfileStoreService
  ) {
  }

  ngOnInit() {
    this.userProfiles$ = this.userProfileStoreService.getAll();
    this.userProfilesDeletingInProgress$ = this.userProfileStoreService.getDeletingInProgress();
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
