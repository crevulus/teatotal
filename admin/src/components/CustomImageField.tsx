import React from "react";
import { useRecordContext, ImageField } from "react-admin";

export const CustomImageField = ({ source }: any) => {
  const record = useRecordContext();

  const PUBLIC_URL =
    "https://firebasestorage.googleapis.com/v0/b/teatotal-358fc.appspot.com/o/";
  const publicLogoUrl = record.logo.replace("gs://", PUBLIC_URL);

  return <img src={publicLogoUrl} />;
};
