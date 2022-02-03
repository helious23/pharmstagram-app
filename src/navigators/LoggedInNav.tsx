import { ThemeConsumer, useTheme } from "styled-components/native";
import { LoggedInNavParamList } from "../navTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<LoggedInNavParamList>();

const LoggedInNav = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "fullScreenModal",
      }}
    >
      <Stack.Screen
        name="TabsNav"
        component={TabsNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UploadNav"
        component={UploadNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UploadForm"
        component={UploadForm}
        options={{
          headerStyle: {
            backgroundColor: theme.mainBgColor,
          },
          headerTintColor: theme.fontColor,
          title: "사진 업로드",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
