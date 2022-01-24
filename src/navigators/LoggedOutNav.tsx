import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";
import { LoggedOutNavParamList } from "../navTypes";
import { ThemeConsumer, useTheme } from "styled-components/native";

const Stack = createNativeStackNavigator<LoggedOutNavParamList>();

const LoggedOutNav = () => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <Stack.Navigator
          screenOptions={{
            headerTitle: () => false,
            headerStyle: { backgroundColor: theme.mainBgColor },
            headerShadowVisible: false,
            headerTintColor: theme.fontColor,
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{}}
          />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </ThemeConsumer>
  );
};

export default LoggedOutNav;
