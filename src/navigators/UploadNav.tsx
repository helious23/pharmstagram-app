import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialTabNavParamList } from "../navTypes";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";

const MaterialTab = createMaterialTopTabNavigator<MaterialTabNavParamList>();

const UploadNav = () => {
  return (
    <MaterialTab.Navigator>
      <MaterialTab.Screen name="SelectPhoto" component={SelectPhoto} />
      <MaterialTab.Screen name="TakePhoto" component={TakePhoto} />
    </MaterialTab.Navigator>
  );
};

export default UploadNav;
