export type LoggedOutNavParamList = {
  Welcome: undefined;
  Login: {
    username: string;
    password: string;
    message: string;
  };
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
  Profile: {
    username: string;
    id: number;
  };
  Photo: undefined;
  Likes: { photoId: number };
  Comments: undefined;
};
