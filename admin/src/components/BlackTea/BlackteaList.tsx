import React from "react";
import {
  List,
  Datagrid,
  TextField,
  UrlField,
  NumberField,
  ReferenceField,
  EditButton,
} from "react-admin";

export const BlackteaList = (props: any) => {
  return (
    <List {...props}>
      <Datagrid>
        <ReferenceField source="adminId" reference="reviews">
          <TextField source="id" />
        </ReferenceField>
        <UrlField source="url" />
        {/* <CustomImageField source="logo" /> */}
        <TextField source="name" />
        <NumberField source="strength" />
        <NumberField source="reviewCount" />
        <NumberField source="rating" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
