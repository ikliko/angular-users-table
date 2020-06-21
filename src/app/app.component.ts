import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { environment } from '@env/environment';
import { Logger } from '@core';
import {GetAllUsers} from '@shared/actions/user.actions';
import {Store} from '@ngxs/store';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store,
              private titleService: Title) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.store.dispatch(new GetAllUsers());

    log.debug('init');
  }
}
