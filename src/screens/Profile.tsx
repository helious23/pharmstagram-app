import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";

const Profile = () => {
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
      <Text style={{ color: theme.fontColor }}>Profile</Text>
    </View>
  );
};

export default Profile;
