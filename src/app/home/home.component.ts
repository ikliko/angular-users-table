import {Component, OnDestroy, OnInit} from '@angular/core';
import 'hammerjs';
import {Store} from '@ngxs/store';
import {SortData, TableConfig, UserState} from '@shared/states/user.state';
import {User} from '@shared/models/user.model';
import {GetAllUsers, UserOrderStore, UserSortStore} from '@shared/actions/user.actions';
import {MatTableDataSource} from '@angular/material/table';
import {untilDestroyed} from '@core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  columns = {
    id: {
      title: 'ID',
      visible: true
    },
    first_name: {
      title: 'First name',
      visible: true
    },
    last_name: {
      title: 'Last name',
      visible: true
    },
    birth_date: {
      title: 'Birth date',
      visible: true
    },
    phone: {
      title: 'Phone',
      visible: true
    },
    email: {
      title: 'Email',
      visible: true
    }
  };
  userTableConfig: TableConfig;
  dataSource: any;

  constructor(private store: Store,
              private router: Router) {
  }

  ngOnInit() {
    this.listeners()
  }

  ngOnDestroy() {
  }

  public onColumnsOrderChange(data: string[]) {
    this.store.dispatch(new UserOrderStore(data))
  }

  public onSortChange(data: SortData) {
    this.store.dispatch(new UserSortStore(data))
  }

  public onRowClick(user: User) {
    this.router.navigate([`/user/${user.id}`])
  }

  private listeners() {
    this.store.select(UserState.getUsers)
      .pipe(untilDestroyed(this))
      .subscribe((users: User[]) => {
        this.loadUsers(users);
      });

    this.store.select(UserState.getConfig)
      .pipe(untilDestroyed(this))
      .subscribe((usersTableConfig: TableConfig) => {
        this.userTableConfig = usersTableConfig;
      })
  }

  private loadUsers(users: User[]) {
    if (!users || !users.length) {
      return;
    }

    this.dataSource = new MatTableDataSource(users);
  }
}
