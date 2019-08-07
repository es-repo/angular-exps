import { UserIdentity } from './user-identity';

export class UserProfile {
  id = 0;
  identity: UserIdentity = new UserIdentity();
  firstName = '';
  lastName = '';
  birthdate: Date = new Date();
  pictureUrl = '';
}
