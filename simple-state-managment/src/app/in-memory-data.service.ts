import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UserProfile } from './user-profile';
import { Injectable } from '@angular/core';
import { UserIdentity } from './user-identity';

const userIdentities: UserIdentity[] = [
  {
    uuid: 'c4168eac-84b8-46ea-b735-c9da9bfb97fd',
    email: 'mollis.vitae@duisemper.co.uk',
    username: 'mark'
  },
  {
    uuid: '16f8b9ff-97a6-4d18-89d3-2366ee54105f',
    email: 'susie.torres@example.com',
    username: 'sadbird552'
  },
  {
    uuid: 'aa07ad5c-0cc6-48b5-9503-82b4f4e918d1',
    email: 'benjamin.larsen@example.com',
    username: 'whitebird416'
  }
];

const userProfiles: UserProfile[] = [
  {
    id: 1,
    identity: userIdentities[0],
    firstName: 'mark',
    lastName: 'aurelius',
    birthdate: new Date(1979, 12, 21),
    pictureUrl: 'https://randomuser.me/api/portraits/men/29.jpg'
  },
  {
    id: 2,
    identity: userIdentities[1],
    firstName: 'susie',
    lastName: 'torres',
    birthdate: new Date(1991, 10, 4),
    pictureUrl: 'https://randomuser.me/api/portraits/women/40.jpg'
  },
  {
    id: 3,
    identity: userIdentities[2],
    firstName: 'benjamin',
    lastName: 'larsen',
    birthdate: new Date(2002, 4, 23),
    pictureUrl: 'https://randomuser.me/api/portraits/men/22.jpg'
  }
];

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { userIdentities, userProfiles };
  }

  genId(): number {
    const ids: number[] = userProfiles.map(p => p.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }
}
