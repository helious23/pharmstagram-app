import React from "react";
import styled from "styled-components/native";
import { KeyboardAvoidingView, useColorScheme, Platform } from "react-native";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
  background-color: ${(props) => props.theme.mainBgColor};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 5%;
`;

const Logo = styled.Image`
  width: 100%;
  margin: 50px auto;
  height: 20%;
  max-width: 80%;
  margin-bottom: 30px;
`;

const AuthLayout: React.FC = ({ children }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <Logo
            resizeMode="contain"
            source={
              isDark
                ? require("../../assets/logo_white.png")
                : require("../../assets/logo_black.png")
            }
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};

export default AuthLayout;
