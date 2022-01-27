import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { useUser } from "../hooks/useUser";
import { ShareStackNavParamList } from "../navTypes";
import { useEffect } from "react";

const Me: React.FC<NativeStackScreenProps<ShareStackNavParamList, "Me">> = ({
  navigation,
}) => {
  const { data } = useUser();
  useEffect(() => {
    if (data?.me) {
      navigation.setOptions({
        headerTitle: data.me.username,
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
      <Text style={{ color: theme.fontColor }}>Me</Text>
    </View>
  );
};

export default Me;
