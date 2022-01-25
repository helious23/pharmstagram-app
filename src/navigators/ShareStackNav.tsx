import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import { ShareStackNavParamList } from "../navTypes";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import { ThemeConsumer } from "styled-components/native";
import { Image, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { logUserOut } from "../apollo";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";

const Stack = createNativeStackNavigator<ShareStackNavParamList>();

interface IShareStackNavProps {
  screenName: string;
}

const ShareStackNav: React.FC<IShareStackNavProps> = ({ screenName }) => {
  const isDark = useColorScheme() === "dark";
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
            <Stack.Screen
              name="Feed"
              component={Feed}
              options={{
                headerTitle: () => (
                  <Image
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      maxHeight: 30,
                    }}
                    resizeMode="contain"
                    source={
                      isDark
                        ? require("../assets/logo_white.png")
                        : require("../assets/logo_black.png")
                    }
                  />
                ),
              }}
            />
          ) : null}
          {screenName === "Search" ? (
            <Stack.Screen name="Search" component={Search} />
          ) : null}
          {screenName === "Notifications" ? (
            <Stack.Screen name="Notifications" component={Notifications} />
          ) : null}
          {screenName === "Me" ? (
            <Stack.Screen
              name="Me"
              component={Me}
              options={{
                headerRight: () => (
                  <Ionicons
                    style={{ marginRight: 5 }}
                    onPress={() => logUserOut()}
                    name="log-out-outline"
                    size={28}
                    color={theme.fontColor}
                  />
                ),
              }}
            />
          ) : null}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Photo" component={Photo} />
          <Stack.Screen name="Likes" component={Likes} />
          <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
      )}
    </ThemeConsumer>
  );
};

export default ShareStackNav;
