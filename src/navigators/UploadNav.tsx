import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  MaterialTabNavParamList,
  SelectPhotoStackNavParamList,
} from "../navTypes";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { ThemeConsumer } from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

const MaterialTab = createMaterialTopTabNavigator<MaterialTabNavParamList>();
const Stack = createNativeStackNavigator<SelectPhotoStackNavParamList>();

const UploadNav = () => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <MaterialTab.Navigator
          tabBarPosition="bottom"
          screenOptions={{
            tabBarStyle: {
              backgroundColor: theme.mainBgColor,
            },
            tabBarActiveTintColor: theme.fontColor,
            tabBarIndicatorStyle: {
              backgroundColor: theme.fontColor,
              top: 0,
            },
          }}
        >
          <MaterialTab.Screen name="Select">
            {({ navigation }) => (
              <Stack.Navigator
                screenOptions={{
                  headerTintColor: theme.fontColor,
                  headerLeft: () => (
                    <Ionicons
                      name="close"
                      size={24}
                      color={theme.fontColor}
                      onPress={() => navigation.navigate("TabsNav")}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: theme.mainBgColor,
                  },
                }}
              >
                <Stack.Screen
                  name="StackSelect"
                  component={SelectPhoto}
                  options={{
                    headerTitle: "사진을 선택하세요",
                    title: "사진을 선택하세요",
                  }}
                />
              </Stack.Navigator>
            )}
          </MaterialTab.Screen>
          <MaterialTab.Screen name="Take" component={TakePhoto} />
        </MaterialTab.Navigator>
      )}
    </ThemeConsumer>
  );
};

export default UploadNav;
