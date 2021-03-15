import { makeAutoObservable, observable } from "mobx";

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
