import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import { ShareStackNavParamList } from "../navTypes";

const Photo: React.FC<NativeStackScreenProps<ShareStackNavParamList, "Photo">> =
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
      ></View>
    );
  };

export default Photo;
