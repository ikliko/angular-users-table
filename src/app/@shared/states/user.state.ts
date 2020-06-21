import {User} from '@shared/models/user.model';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {
  GetAllUsers,
  GetAllUsersError,
  GetAllUsersSuccess, UserCreate,
  UserOrderStore,
  UserSortStore,
  UserUpdate
} from '@shared/actions/user.actions';
import {UserService} from '@shared/services/user.service';
import {tap} from 'rxjs/operators';
import {asapScheduler} from 'rxjs';
import {Injectable} from '@angular/core';

export interface SortData {
  active: string;
  direction: 'asc' | 'desc';
}

export interface TableConfig {
  columnsOrder: string[];
  sort: SortData
}

export class UserStateModel {
  users: User[];
  tableConfig: TableConfig;
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
    tableConfig: {
      columnsOrder: [
        'first_name',
        'last_name',
        'id',
        'birth_date',
        'phone',
        'email'
      ],
      sort: {
        active: 'first_name',
        direction: 'desc'
      }
    }
  }
})
@Injectable()
export class UserState {
  constructor(private store: Store,
              private userService: UserService) {
  }

  @Selector()
  public static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Selector()
  public static getUserById(id: number) {
    return (state: any) => {
      return state.users.users.find((user: User) => user.id === id);
    };
  }

  @Selector()
  public static getConfig(state: UserStateModel) {
    return state.tableConfig;
  }

  @Action(GetAllUsers)
  public loadAll() {
    return this.userService
      .getAllUsers()
      .pipe(
        tap((data: User[]) => {
          if (!data) {
            asapScheduler.schedule(() => this.store.dispatch(new GetAllUsersError('Unable to load users')));

            return;
          }

          asapScheduler.schedule(() => this.store.dispatch(new GetAllUsersSuccess(data)));
        })
      )
  }

  @Action(GetAllUsersSuccess)
  public loadedAllSuccess({getState, patchState}: StateContext<UserStateModel>, {payload}: GetAllUsersSuccess) {
    const state = getState();

    patchState({
      users: payload
    })
  }

  @Action(UserOrderStore)
  public storeUserOrder({getState, patchState}: StateContext<UserStateModel>, {payload}: UserOrderStore) {
    const state = getState();

    patchState({
      tableConfig: {
        ...state.tableConfig,
        columnsOrder: payload,
      }
    })
  }

  @Action(UserSortStore)
  public storeSortConfig({getState, patchState}: StateContext<UserStateModel>, {payload}: UserSortStore) {
    const state = getState();

    patchState({
      tableConfig: {
        ...state.tableConfig,
        sort: payload,
      }
    })
  }

  @Action(UserUpdate)
  public updateUserData({getState, patchState}: StateContext<UserStateModel>, {payload}: UserUpdate) {
    const state = getState();

    const newUsers = state.users.map(u => {
      let user = u;

      if (+u.id === +payload.id) {
        user = {
          ...u,
          ...payload.data
        };

        return user;
      }

      return u;
    });

    patchState({
      users: newUsers
    });
  }

  @Action(UserCreate)
  public createUser({getState, patchState}: StateContext<UserStateModel>, {payload}: UserCreate) {
    const state = getState();

    const newUsers = state.users;

    newUsers.unshift({
      id: state.users.length + 1,
      ...payload
    });

    patchState({
      users: newUsers
    });
  }
}
