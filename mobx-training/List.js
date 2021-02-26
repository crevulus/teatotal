import React from "react";
import { View, Text } from "react-native";

import { observer } from "mobx-react";
import { Button } from "react-native";

function List(props) {
  return (
    <View>
      <View>
        <View>
          <Text>{props.list.value}</Text>
          <Button
            onClick={props.deleteList.bind(this, props.list)}
            title="delete"
          />
        </View>
      </View>
    </View>
  );
}

export default observer(List);
