export type UsernameEditInputType = {
  name: string;
};

export type PasswordEditInputType = {
  password: string;
  password_confirmation: string;
};

export type ProfileEditInputType = UsernameEditInputType &
  PasswordEditInputType;
