import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {UserState} from '@shared/states/user.state';
import {switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {User} from '@shared/models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {UserUpdate} from '@shared/actions/user.actions';
import {untilDestroyed} from '@core';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY'
  }
};

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UserEditComponent implements OnInit, OnDestroy {
  @ViewChild(MatDatepicker)
  public picker: MatDatepicker<Date>;

  user: User;
  form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private store: Store) {
  }

  ngOnInit(): void {
    this.createForm();
    this.listeners();
  }

  ngOnDestroy() {
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = this.form.value;

      payload.birth_date = moment(payload.birth_date).format('DD/MM/YYYY');

      this.store.dispatch(new UserUpdate({
        id: this.user.id,
        data: payload
      }));

      this.router.navigate(['/home'])
    }
  }

  openCalendar() {
    this.picker.open();
  }

  private listeners() {
    this.activatedRoute.params
      .pipe(
        switchMap((data: any) => {
          if (!data || !data.id) {
            return EMPTY;
          }

          return this.store.select(UserState.getUserById(+data.id));
        }),
        untilDestroyed(this)
      )
      .subscribe((data: User) => {
        this.user = data;

        this.fillForm();
      });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      birth_date: ['', Validators.required],
    });
  }

  private fillForm() {
    this.form.get('first_name').setValue(this.user.first_name);
    this.form.get('last_name').setValue(this.user.last_name);
    this.form.get('email').setValue(this.user.email);
    this.form.get('phone').setValue(this.user.phone);

    const bday = this.user.birth_date;

    if (!bday) {
      return;
    }

    const bdayEntities: string[] = bday.split('/');

    if (bdayEntities.length < 3) {
      return;
    }

    const date = new Date(+bdayEntities[2], +bdayEntities[1] - 1, +bdayEntities[0]);

    this.form.get('birth_date').setValue(date);
  }
}
