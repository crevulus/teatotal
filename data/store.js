import { makeAutoObservable, observable } from "mobx";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

class LoginUser {
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

const userStore = new LoginUser();
const teaStore = new ChooseTea();

export { userStore, teaStore };
