import { makeAutoObservable, observable } from "mobx";

class UserDetails {
  user = {};
  loggedIn = false;

  constructor() {
    makeAutoObservable(this, {
      user: observable,
      loggedIn: observable,
    });
  }

  setUser = (user) => {
    this.user = user;
    this.loggedIn = true;
  };

  getUserEmail = () => {
    return this.user.email;
  };
}

class SetTeaData {
  teas = {};
  chosenTea = null;

  constructor() {
    makeAutoObservable(this, {
      teas: observable,
      chosenTea: observable,
    });
  }

  setTeas = (teas) => {
    this.teas = teas;
  };

  selectTea = (tea) => {
    this.tea = tea;
  };
}

const userStore = new UserDetails();
const teaStore = new SetTeaData();

export { userStore, teaStore };
