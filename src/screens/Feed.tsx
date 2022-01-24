import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { LoggedInNavParamList } from "../navTypes";

const Feed: React.FC<BottomTabScreenProps<LoggedInNavParamList, "Feed">> =
  () => {
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
        <Text style={{ color: theme.fontColor }}>Feed</Text>
      </View>
    );
  };

export default Feed;
