import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import { ShareStackNavParamList } from "../navTypes";

const Feed: React.FC<NativeStackScreenProps<ShareStackNavParamList, "Feed">> =
  ({ navigation }) => {
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
        <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
          <Text style={{ color: theme.fontColor }}>GO TO PHOTO</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default Feed;
