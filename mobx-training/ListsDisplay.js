import React from "react";
import { View, Text } from "react-native";

import { observer } from "mobx-react";

import List from "./List";
import { ListStore } from "../data/store";
import TitleInput from "./TitleInput";

const store = new ListStore();

function ListsDisplay(props) {
  const { deleteList, filteredLists } = store;
  return (
    <View>
      <TitleInput />
      <View>
        {filteredLists.map((list) => (
          <List key={list.id} list={list} deleteList={deleteList} />
        ))}
      </View>
    </View>
  );
}

export default observer(ListsDisplay);
