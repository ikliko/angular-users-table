import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {environment} from '@env/environment';
import {CoreModule} from '@core';
import {SharedModule} from '@shared';
import {AuthModule} from '@app/auth';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgxsModule} from '@ngxs/store';
import {UserState} from '@shared/states/user.state';
import {UserService} from '@shared/services/user.service';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      UserState
    ]),
    NgxsStoragePluginModule.forRoot({
      key: UserState
    }),
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    TranslateModule.forRoot(),

    NgbModule,
    CoreModule,
    SharedModule,
    AuthModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
