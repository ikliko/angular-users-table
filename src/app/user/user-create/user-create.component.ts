import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {UserCreate} from '@shared/actions/user.actions';

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
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UserCreateComponent implements OnInit {
  @ViewChild(MatDatepicker)
  public picker: MatDatepicker<Date>;

  form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private store: Store) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = this.form.value;

      payload.birth_date = moment(payload.birth_date).format('DD/MM/YYYY');

      this.store.dispatch(new UserCreate(payload));

      this.router.navigate(['/home'])
    }
  }

  openCalendar() {
    this.picker.open();
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
}
