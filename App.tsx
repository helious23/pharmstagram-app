import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { useColorScheme } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./theme";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";

const Container = styled.View`
  background-color: ${(props) => props.theme.bgColor};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

export default function App() {
  const [loading, setLoading] = useState(false);
  const onFinish = () => setLoading(false);
  const preload = async (): Promise<void> => {
    const fontsToLoad = [Ionicons.font];
    const imagesToLoad = [
      require("./assets/logo_black.png"),
      require("./assets/logo_white.png"),
    ];
    const fontPromise = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagePromise = imagesToLoad.map((image) => Asset.loadAsync(image));
    await Promise.all([...fontPromise, ...imagePromise]);
  };
  const isDark = useColorScheme() === "dark";

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  return (
    <NavigationContainer>
      <LoggedOutNav />
    </NavigationContainer>
  );
}
