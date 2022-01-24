export type LoggedOutNavParamList = {
  Welcome: undefined;
  Login:
    | {
        username: string;
        password: string;
        message: string;
      }
    | undefined;
  CreateAccount: undefined;
};

export type LoggedInNavParamList = {
  Feed: undefined;
  Search: undefined;
  Camera: undefined;
  Notification: undefined;
  Profile: undefined;
};
