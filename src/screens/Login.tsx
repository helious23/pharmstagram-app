import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { RefObject, useEffect, useRef } from "react";
import { TextInput, View } from "react-native";
import { LoggedOutNavParamList } from "../navTypes";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthPlaceholder, STextInput } from "../components/auth/AuthShared";
import AuthBtn from "../components/auth/AuthBtn";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  username: string;
  password: string;
}

const Login: React.FC<NativeStackScreenProps<LoggedOutNavParamList, "Login">> =
  ({ navigation }) => {
    const { register, handleSubmit, setValue, watch, formState } =
      useForm<ILoginForm>();
    const passwordRef = useRef(null);
    const onNext = (nextRef: RefObject<TextInput>) => {
      nextRef?.current?.focus();
    };
    const onValid: SubmitHandler<ILoginForm> = (data) => {
      console.log(data);
    };

    useEffect(() => {
      register("username", { required: true });
      register("password", {
        required: true,
        minLength: {
          value: 4,
          message: "비밀번호는 4글자 이상입니다.",
        },
      });
    }, [register]);

    return (
      <AuthLayout>
        <View>
          <STextInput
            blurOnSubmit={false}
            change={Boolean(watch("username"))}
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setValue("username", text)}
            onSubmitEditing={() => onNext(passwordRef)}
          />
          <AuthPlaceholder change={Boolean(watch("username"))}>
            사용자 이름
          </AuthPlaceholder>
        </View>
        <View>
          <STextInput
            change={Boolean(watch("password"))}
            ref={passwordRef}
            secureTextEntry
            returnKeyType="done"
            lastOne={true}
            onChangeText={(text) => setValue("password", text)}
            onSubmitEditing={handleSubmit(onValid)}
          />
          <AuthPlaceholder change={Boolean(watch("password"))}>
            비밀번호
          </AuthPlaceholder>
        </View>
        <AuthBtn
          loading={false}
          text="로그인"
          disabled={!watch("username") || !watch("password")}
          onPress={handleSubmit(onValid)}
        />
      </AuthLayout>
    );
  };

export default Login;
