import React, { useState } from "react";
import { View, Text, Button } from "react-native";

import { observer } from "mobx-react";

import { ListStore } from "../data/store";
import { TextInput } from "react-native-gesture-handler";

const store = new ListStore();

function TitleInput() {
  const [value, setValue] = useState("");

  const { addList, filteredLists } = store;

  const handleTextChange = (e) => {
    setValue(e);
    console.log(value);
  };

  const handleAdd = () => {
    addList(value);
    console.log(filteredLists);
    setValue("");
  };

  return (
    <View>
      <Text>List App</Text>
      <TextInput value={value} onChangeText={handleTextChange} />
      <Button title="Add" onPress={() => handleAdd(value)} />
    </View>
  );
}

export default observer(TitleInput);
