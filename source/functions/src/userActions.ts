import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";

export const createNewProfileImage = () => {
  const profileImage = createAvatar(style);
  return profileImage;
};
