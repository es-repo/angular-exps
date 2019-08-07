import { Injectable } from '@angular/core';
import { UserProfileDataSourceService } from './user-profile-data-source.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileStoreService {

  private dataCache = new BehaviorSubject<UserProfile[] | undefined>(undefined);
  private deletingInProgress = new BehaviorSubject<UserProfile[]>([]);

  constructor(private dataSource: UserProfileDataSourceService) { }

  getAll(): Observable<UserProfile[] | undefined> {
    if (!this.isDataCacheValid) {
      this.dataSource.getAll().subscribe(data => this.dataCache.next(data));
    }

    return this.dataCache.asObservable();
  }

  save(profile: UserProfile): Observable<UserProfile> {
    return this.dataSource.save(profile)
      .pipe(
        tap(() => this.dataCache.next(update(this.dataCacheValue, profile)),
        map(() => profile)));
  }

  delete(profile: UserProfile): Observable<any> {
    this.deletingInProgress.next(add(this.deletingInProgress.getValue(), profile) as UserProfile[]);

    return this.dataSource.delete(profile)
      .pipe(
        tap(() => this.dataCache.next(deleteFrom(this.dataCacheValue, profile))),
        tap(() => this.deletingInProgress.next(deleteFrom(this.deletingInProgress.getValue(), profile) as UserProfile[]))
      );
  }

  getDeletingInProgress(): Observable<UserProfile[]> {
    return this.deletingInProgress.asObservable();
  }

  private get isDataCacheValid(): boolean {
    return this.dataCacheValue !== undefined;
  }

  private get dataCacheValue(): UserProfile[] | undefined {
    return this.dataCache.getValue();
  }
}

function add(profiles: UserProfile[] | undefined, profile: UserProfile): UserProfile[] | undefined {
  if (profiles === undefined) {
    return profiles;
  }

  return [...profiles, profile];
}

function update(profiles: UserProfile[] | undefined, profile: UserProfile): UserProfile[] | undefined {
  if (profiles === undefined) {
    return profiles;
  }

  const index = profiles.findIndex(i => i.id === profile.id);
  if (index !== -1) {
    const updatedProfiles = [...profiles];
    updatedProfiles[index] = profile;
    return updatedProfiles;
  }
  return profiles;
}

function deleteFrom(profiles: (UserProfile[] | undefined) | UserProfile[], profile: UserProfile):
  (UserProfile[] | undefined) | UserProfile[] {

  if (profiles === undefined) {
    return profiles;
  }

  const id = profile.id;
  const index = profiles.findIndex(i => i.id === id);
  if (index !== -1) {
    const updatedProfiles = [...profiles];
    updatedProfiles.splice(index, 1);
    return updatedProfiles;
  } else {
    return profiles;
  }
}
