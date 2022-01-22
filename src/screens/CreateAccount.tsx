import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { RefObject, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import AuthBtn from "../components/auth/AuthBtn";
import AuthLayout from "../components/auth/AuthLayout";
import { STextInput, AuthPlaceholder } from "../components/auth/AuthShared";
import { LoggedOutNavParamList } from "../navTypes";

interface IFormCreateAccount {
  email: string;
  firstName: string;
  username: string;
  password: string;
}

const CreateAccount: React.FC<
  NativeStackScreenProps<LoggedOutNavParamList, "CreateAccount">
> = () => {
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    clearErrors,
    watch,
    setError,
    getValues,
  } = useForm<IFormCreateAccount>({
    mode: "onChange",
  });
  const firstNameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const onNext = (nextRef: RefObject<TextInput>) => {
    nextRef?.current?.focus();
  };
  const onValid: SubmitHandler<IFormCreateAccount> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    register("email", {
      required: true,
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "유효한 이메일 주소를 입력하세요",
      },
    });
    register("firstName", {
      required: true,
    });
    register("username", {
      required: true,
    });
    register("password", {
      required: true,
      minLength: {
        value: 6,
        message: "비밀번호는 6글자 이상입니다.",
      },
    });
  }, [register]);

  return (
    <AuthLayout>
      <View>
        <STextInput
          change={Boolean(watch("email"))}
          blurOnSubmit={false}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onChangeText={(text) => setValue("email", text)}
          onSubmitEditing={() => onNext(firstNameRef)}
        />
        <AuthPlaceholder change={Boolean(watch("email"))}>
          이메일
        </AuthPlaceholder>
      </View>
      <View>
        <STextInput
          autoCorrect={false}
          blurOnSubmit={false}
          change={Boolean(watch("firstName"))}
          ref={firstNameRef}
          returnKeyType="next"
          onChangeText={(text) => setValue("firstName", text)}
          onSubmitEditing={() => onNext(usernameRef)}
        />
        <AuthPlaceholder change={Boolean(watch("firstName"))}>
          성명
        </AuthPlaceholder>
      </View>
      <View>
        <STextInput
          blurOnSubmit={false}
          change={Boolean(watch("username"))}
          ref={usernameRef}
          returnKeyType="next"
          onChangeText={(text) => setValue("username", text)}
          onSubmitEditing={() => onNext(passwordRef)}
        />
        <AuthPlaceholder change={Boolean(watch("username"))}>
          사용자 이름
        </AuthPlaceholder>
      </View>
      <View>
        <STextInput
          blurOnSubmit={false}
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
        text="가입 하기"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
