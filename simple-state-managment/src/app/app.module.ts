import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileListComponent } from './user-profile-list/user-profile-list.component';
import { UserProfileGridComponent } from './user-profile-grid/user-profile-grid.component';
import { ActionButtonPanelComponent } from './action-button-panel/action-button-panel.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserProfileListComponent,
    UserProfileGridComponent,
    ActionButtonPanelComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 2000 }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
