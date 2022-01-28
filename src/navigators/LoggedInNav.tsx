import { ThemeConsumer } from "styled-components/native";
import { LoggedInNavParamList } from "../navTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";

const Stack = createNativeStackNavigator<LoggedInNavParamList>();

const LoggedInNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "fullScreenModal",
      }}
    >
      <Stack.Screen name="TabsNav" component={TabsNav} />
      <Stack.Screen name="UploadNav" component={UploadNav} />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
