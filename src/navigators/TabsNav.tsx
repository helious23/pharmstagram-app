import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeConsumer } from "styled-components/native";
import { TabsNavParamList } from "../navTypes";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "./ShareStackNav";
import { useUser } from "../hooks/useUser";
import Avatar from "../components/Avatar";

const Tabs = createBottomTabNavigator<TabsNavParamList>();

const TabsNav = () => {
  const { data } = useUser();

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
            name="TabFeed"
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
          >
            {() => <StackNavFactory screenName="Feed" />}
          </Tabs.Screen>
          <Tabs.Screen
            name="TabSearch"
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
          >
            {() => <StackNavFactory screenName="Search" />}
          </Tabs.Screen>

          <Tabs.Screen
            name="Camera"
            component={View}
            listeners={({ navigation }) => {
              return {
                tabPress: (event) => {
                  event.preventDefault();
                  navigation.navigate("UploadNav");
                },
              };
            }}
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
            name="TabNotifications"
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
          >
            {() => <StackNavFactory screenName="Notifications" />}
          </Tabs.Screen>
          <Tabs.Screen
            name="TabMe"
            options={{
              tabBarIcon: ({ color, focused, size }) =>
                data?.me?.avatar ? (
                  <Avatar avatar={data.me.avatar} size={30} focused={focused} />
                ) : (
                  <TabIcon
                    color={color}
                    focused={focused}
                    size={size}
                    iconName="person"
                    focusedIconName="person-outline"
                  />
                ),
            }}
          >
            {() => <StackNavFactory screenName="Me" />}
          </Tabs.Screen>
        </Tabs.Navigator>
      )}
    </ThemeConsumer>
  );
};

export default TabsNav;
