import { makeAutoObservable, observable } from "mobx";

class UserDetails {
  user = {};

  constructor() {
    makeAutoObservable(this, {
      user: observable,
    });
  }

  setUser = (user) => {
    this.user = user;
  };

  getUserEmail = () => {
    return this.user.email;
  };
}

class ChooseTea {
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

const userStore = new UserDetails();
const teaStore = new ChooseTea();

export { userStore, teaStore };
