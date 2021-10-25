import { Edit, SimpleForm, TextInput, NumberInput } from "react-admin";

export const BlackteaEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <NumberInput source="strength" />
      <NumberInput source="reviewCount" />
      <NumberInput source="rating" />
      <TextInput source="logo" />
      <TextInput source="name" />
      <TextInput source="url" />
    </SimpleForm>
  </Edit>
);
