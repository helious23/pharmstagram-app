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
