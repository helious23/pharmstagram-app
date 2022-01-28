export type LoggedOutNavParamList = {
  Welcome: undefined;
  Login: {
    username: string;
    password: string;
    message: string;
  };
  CreateAccount: undefined;
};

export type TabsNavParamList = {
  TabFeed: undefined;
  TabSearch: undefined;
  Camera: undefined;
  TabNotifications: undefined;
  TabMe: undefined;
};

export type LoggedInNavParamList = {
  TabsNav: undefined;
  UploadNav: undefined;
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
  PhotoDetail: {
    id: number;
  };
  Likes: { photoId: number };
  Comments: undefined;
};

export type MaterialTabNavParamList = {
  SelectPhoto: undefined;
  TakePhoto: undefined;
};
