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
  TabFeed: undefined;
  TabSearch: undefined;
  Camera: undefined;
  TabNotifications: undefined;
  TabMe: undefined;
};

export type ShareStackNavParamList = {
  Feed: undefined;
  Search: undefined;
  Notifications: undefined;
  Me: undefined;
  Profile: undefined;
  Photo: undefined;
  Likes: undefined;
  Comments: undefined;
};
