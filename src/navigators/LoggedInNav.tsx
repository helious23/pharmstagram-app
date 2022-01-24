import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import { Ionicons } from "@expo/vector-icons";
import { logUserOut } from "../apollo";

const Tabs = createBottomTabNavigator();

const LoggedInNav = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Feed"
        component={Feed}
        options={{
          headerRight: () => (
            <Ionicons
              name="log-out-outline"
              size={25}
              onPress={() => logUserOut()}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default LoggedInNav;
