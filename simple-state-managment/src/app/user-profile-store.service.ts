import { Injectable } from '@angular/core';
import { UserProfileDataSourceService } from './user-profile-data-source.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { UserProfileStoreItem, create as createStoreItem } from './user-profile-store-item';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileStoreService {

  private cache = new BehaviorSubject<UserProfileStoreItem[] | undefined>(undefined);

  constructor(private dataSource: UserProfileDataSourceService) { }

  getAll(): Observable<UserProfileStoreItem[] | undefined> {
    if (!this.isDataCacheValid) {
      this.dataSource.getAll()
        .pipe(
           map(data => data.map(createStoreItem))
        ).subscribe(items => this.cache.next(items));
    }

    return this.cache.asObservable();
  }

  save(profile: UserProfile): Observable<UserProfileStoreItem> {
    this.cache.next(
      updateItem(
        this.cacheValue, { value: profile, actionInProgress: 'save' }));

    return this.dataSource.save(profile)
      .pipe(
        tap(() => this.cache.next(
          updateItem(this.cacheValue, Object.assign({}, { value: profile, actionInProgress: null }))))
        );
  }

  delete(profile: UserProfile): Observable<any> {
    this.cache.next(
      updateItem(
        this.cacheValue, { value: profile, actionInProgress: 'delete' }));

    return this.dataSource.delete(profile)
      .pipe(
        tap(() => this.cache.next(
          deleteItem(this.cacheValue, profile)))
      );
  }

  private get isDataCacheValid(): boolean {
    return this.cacheValue !== undefined;
  }

  private get cacheValue(): UserProfileStoreItem[] | undefined {
    return this.cache.getValue();
  }
}

function updateItem(items: UserProfileStoreItem[] | undefined, item: UserProfileStoreItem): UserProfileStoreItem[] | undefined {
  if (items === undefined) {
    return items;
  }

  const index = items.findIndex(i => i.value.id === item.value.id);
  if (index !== -1) {
    const updatedItems = [...items];
    updatedItems[index] = item;
    return updatedItems;
  }
  return items;
}

function deleteItem(items: UserProfileStoreItem[] | undefined, profile: UserProfile):
  UserProfileStoreItem[] | undefined {

  if (items === undefined) {
    return items;
  }

  const id = profile.id;
  const index = items.findIndex(i => i.value.id === id);
  if (index !== -1) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    return updatedItems;
  } else {
    return items;
  }
}
