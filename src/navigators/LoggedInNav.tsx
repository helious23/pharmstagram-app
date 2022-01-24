import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Feed from "../screens/Feed";
import { ThemeConsumer } from "styled-components/native";
import Search from "../screens/Search";
import Notification from "../screens/Notifications";
import Profile from "../screens/Profile";
import { LoggedInNavParamList } from "../navTypes";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";

const Tabs = createBottomTabNavigator<LoggedInNavParamList>();

const LoggedInNav = () => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <Tabs.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.mainBgColor,
              borderTopColor: theme.formFontColor,
            },
            tabBarActiveTintColor: theme.tabBarBtnColor,
            tabBarShowLabel: false,
          }}
        >
          <Tabs.Screen
            name="Feed"
            component={Feed}
            options={{
              tabBarIcon: ({ color, focused, size }) => (
                <TabIcon
                  color={color}
                  focused={focused}
                  size={size}
                  iconName="home"
                  focusedIconName="home-outline"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({ color, focused, size }) => (
                <TabIcon
                  color={color}
                  focused={focused}
                  size={size}
                  iconName="search"
                  focusedIconName="search-outline"
                />
              ),
            }}
          />

          <Tabs.Screen
            name="Camera"
            component={View}
            options={{
              tabBarIcon: ({ color, focused, size }) => (
                <TabIcon
                  color={color}
                  focused={focused}
                  size={size + 5}
                  iconName="camera"
                  focusedIconName="camera-outline"
                />
              ),
            }}
          />

          <Tabs.Screen
            name="Notification"
            component={Notification}
            options={{
              tabBarIcon: ({ color, focused, size }) => (
                <TabIcon
                  color={color}
                  focused={focused}
                  size={size + 2}
                  iconName="heart"
                  focusedIconName="heart-outline"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color, focused, size }) => (
                <TabIcon
                  color={color}
                  focused={focused}
                  size={size}
                  iconName="person"
                  focusedIconName="person-outline"
                />
              ),
            }}
          />
        </Tabs.Navigator>
      )}
    </ThemeConsumer>
  );
};

export default LoggedInNav;
