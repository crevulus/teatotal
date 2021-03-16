import { makeAutoObservable, observable } from "mobx";

export class LoginUser {
  user = {};

  constructor() {
    makeAutoObservable(this, {
      user: observable,
    });
  }

  setUser = (user) => {
    this.user = user;
  };
}

export class ChooseTea {
  tea = null;

  constructor() {
    makeAutoObservable(this, {
      tea: observable,
    });
  }

  selectTea = (tea) => {
    this.tea = tea;
  };
}
