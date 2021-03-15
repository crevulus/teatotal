import { action, computed, observable } from "mobx";
import { v4 } from "uuid";

export class List {
  @observable value;
  @observable done;

  constructor(value) {
    this.id = v4();
    this.value = value;
  }
}

export class ListStore {
  @observable lists = [
    { id: 1, value: "Test 1" },
    { id: 2, value: "Test 2" },
  ];
  @observable filter = "";

  @action addToList = (value) => {
    this.lists.push(new List(value));
  };

  @action deleteFromList = (list) => {
    this.lists = this.lists.filter((todo) => todo !== list);
  };

  @computed get filteredLists() {
    const matchCase = new RegExp(this.filter, "i");
    return this.lists.filter(
      (list) => !this.filter || matchCase.test(list.value)
    );
  }
}
