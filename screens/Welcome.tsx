import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoggedOutNavParamList } from "../navTypes";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import AuthBtn from "../components/auth/AuthBtn";

const LoginLink = styled.Text`
  color: ${(props) => props.theme.BLUE.BLUE_0};
  font-weight: 600;
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
`;

const Welcome: React.FC<
  NativeStackScreenProps<LoggedOutNavParamList, "Welcome">
> = ({ navigation }) => {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");

  return (
    <AuthLayout>
      <AuthBtn disabled={false} text="회원 가입" onPress={goToCreateAccount} />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>로그인</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default Welcome;
