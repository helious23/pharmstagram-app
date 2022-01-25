import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import { ShareStackNavParamList } from "../navTypes";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import { ThemeConsumer } from "styled-components/native";

const Stack = createNativeStackNavigator<ShareStackNavParamList>();

interface IShareStackNavProps {
  screenName: string;
}

const ShareStackNav: React.FC<IShareStackNavProps> = ({ screenName }) => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <Stack.Navigator
          screenOptions={{
            headerTintColor: theme.fontColor,
            headerStyle: {
              backgroundColor: theme.mainBgColor,
            },
            headerBackTitleVisible: false,
          }}
        >
          {screenName === "Feed" ? (
            <Stack.Screen name="Feed" component={Feed} />
          ) : null}
          {screenName === "Search" ? (
            <Stack.Screen name="Search" component={Search} />
          ) : null}
          {screenName === "Notifications" ? (
            <Stack.Screen name="Notifications" component={Notifications} />
          ) : null}
          {screenName === "Me" ? (
            <Stack.Screen name="Me" component={Me} />
          ) : null}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Photo" component={Photo} />
        </Stack.Navigator>
      )}
    </ThemeConsumer>
  );
};

export default ShareStackNav;
