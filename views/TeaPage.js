import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const TeaPage = (props) => {
  const [teaData, setTeaData] = useState("");

  const fetchTeaData = async () => {
    const teaData = await fetch(
      `http://localhost:3000/teas/${props.route.params.teaId}`
    ).then((res) => res.json());
    setTeaData(teaData);
  };

  useEffect(() => {
    fetchTeaData();
  }, []);

  return (
    <View>
      <Text>This is the TeaPage page</Text>
      {teaData && <Text>{teaData.name}</Text>}
    </View>
  );
};

export default TeaPage;
