import {User} from '@shared/models/user.model';
import {SortData} from '@shared/states/user.state';

export class GetAllUsers {
  static readonly type = '[USER] Get all users';
}

export class GetAllUsersError {
  static readonly type = '[USER] Get all users error';

  constructor(public payload: string) {
  }
}

export class GetAllUsersSuccess {
  static readonly type = '[USER] Get all users success';

  constructor(public payload: User[]) {
  }
}

export class RemoveUserById {
  static readonly type = '[USER] Remove user by id';

  constructor(public payload: number) {
  }
}

export class UserOrderStore {
  static readonly type = '[USER] user order store';

  constructor(public payload: string[]) {
  }
}

export class UserSortStore {
  static readonly type = '[USER] user sort store';

  constructor(public payload: SortData) {
  }
}

export interface UserUpdateData {
  id: number;
  data: {
    first_name: string;
    last_name: string;
    birth_date: string;
    phone: string;
    email: string;
  }
}

export interface UserCreateData {
  first_name: string;
  last_name: string;
  birth_date: string;
  phone: string;
  email: string;
}

export class UserUpdate {
  static readonly type = '[USER] user updated';

  constructor(public payload: UserUpdateData) {
  }
}

export class UserCreate {
  static readonly type = '[USER] user created';

  constructor(public payload: UserCreateData) {
  }
}
