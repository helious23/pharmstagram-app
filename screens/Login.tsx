import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { RefObject, useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { LoggedOutNavParamList } from "../navTypes";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthPlaceholder, STextInput } from "../components/auth/AuthShared";
import AuthBtn from "../components/auth/AuthBtn";

const Login: React.FC<NativeStackScreenProps<LoggedOutNavParamList, "Login">> =
  ({ navigation }) => {
    const passwordRef = useRef();
    const onNext = (nextRef: RefObject<TextInput>) => {
      nextRef.current.focus();
    };
    return (
      <AuthLayout>
        <View>
          <STextInput
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
          />
          <AuthPlaceholder change={false}>사용자 이름</AuthPlaceholder>
        </View>
        <View>
          <STextInput
            blurOnSubmit={false}
            ref={passwordRef}
            secureTextEntry
            returnKeyType="done"
            lastOne={true}
            onSubmitEditing={() => alert("Done")}
          />
          <AuthPlaceholder change={false}>비밀번호</AuthPlaceholder>
        </View>
        <AuthBtn text="로그인" disabled={true} onPress={() => null} />
      </AuthLayout>
    );
  };

export default Login;
