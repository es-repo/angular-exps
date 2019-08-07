import { UserProfile } from './user-profile';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileDataSourceService {

  private baseUrl = 'api/userProfiles';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<UserProfile[]> {
    return this.httpClient.get<UserProfile[]>(this.baseUrl);
  }

  save(profile: UserProfile): Observable<any> {
    const url = `${this.baseUrl}/${profile.id}`;
    return this.httpClient.put(url, profile, this.httpOptions);
  }

  delete(profileOrId: UserProfile | number): Observable<any> {
    const id = typeof profileOrId === 'number' ? profileOrId : profileOrId.id;
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }
}
