import { UserProfile } from './user-profile';
import { ActionType } from './action-button-panel/action-button-panel.component';

export interface UserProfileStoreItem {
  data: UserProfile;
  actionInProgress: ActionType | null;
}

export function create(profile: UserProfile): UserProfileStoreItem {
  return { data: profile, actionInProgress: null };
}
