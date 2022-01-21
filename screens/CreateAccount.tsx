import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { RefObject, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import AuthBtn from "../components/auth/AuthBtn";
import AuthLayout from "../components/auth/AuthLayout";
import { STextInput, AuthPlaceholder } from "../components/auth/AuthShared";

import { LoggedOutNavParamList } from "../navTypes";

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
  } = useForm({
    mode: "onChange",
  });
  const firstNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const onNext = (nextRef: RefObject<TextInput>) => {
    nextRef.current.focus();
  };

  return (
    <AuthLayout>
      <View>
        <STextInput
          change={Boolean(watch("email"))}
          blurOnSubmit={false}
          placeholderTextColor="gray"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          {...register("email", {
            required: true,
          })}
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
          ref={firstNameRef}
          returnKeyType="next"
          onChangeText={(text) => setValue("firstname", text)}
          onSubmitEditing={() => onNext(usernameRef)}
        />
        <AuthPlaceholder change={false}>성명</AuthPlaceholder>
      </View>
      <View>
        <STextInput
          blurOnSubmit={false}
          ref={usernameRef}
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
      <AuthBtn text="가입 하기" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
};

export default CreateAccount;
