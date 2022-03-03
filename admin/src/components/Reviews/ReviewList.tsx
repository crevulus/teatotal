import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";

export const ReviewList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <NumberField source="rating" />
      <ArrayField source="userReviews">
        <SingleFieldList>
          <ChipField source="userId" />
        </SingleFieldList>
      </ArrayField>
      <NumberField source="reviewCount" />
    </Datagrid>
  </List>
);
