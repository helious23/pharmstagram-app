import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";

const Likes = () => {
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
      <Text style={{ color: theme.fontColor }}>Likes</Text>
    </View>
  );
};

export default Likes;
