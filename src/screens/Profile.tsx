import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ShareStackNavParamList } from "../navTypes";
import { useEffect } from "react";

const Profile: React.FC<
  NativeStackScreenProps<ShareStackNavParamList, "Profile">
> = ({ route, navigation }) => {
  useEffect(() => {
    if (route.params.username) {
      navigation.setOptions({
        headerTitle: route.params.username,
      });
    }
  }, []);

  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.mainBgColor,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: theme.fontColor }}>Someone's Profile</Text>
    </View>
  );
};

export default Profile;
