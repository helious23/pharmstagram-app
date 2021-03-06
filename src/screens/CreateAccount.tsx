import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { RefObject, useRef } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { TextInput, View } from "react-native";
import AuthBtn from "../components/auth/AuthBtn";
import AuthLayout from "../components/auth/AuthLayout";
import { STextInput, AuthPlaceholder } from "../components/auth/AuthShared";
import { LoggedOutNavParamList } from "../navTypes";
import { gql, useMutation } from "@apollo/client";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";
import FormError from "../components/auth/FormError";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $email: String!
    $firstName: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      email: $email
      firstName: $firstName
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;

interface IFormCreateAccount {
  email: string;
  firstName: string;
  username: string;
  password: string;
  result?: string;
}

const CreateAccount: React.FC<
  NativeStackScreenProps<LoggedOutNavParamList, "CreateAccount">
> = ({ navigation }) => {
  const {
    handleSubmit,
    control,
    formState,
    clearErrors,
    watch,
    setError,
    getValues,
  } = useForm<IFormCreateAccount>({
    mode: "onChange",
  });

  const [createAccountMutation, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION);

  const firstNameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const onNext = (nextRef: RefObject<TextInput>) => {
    nextRef?.current?.focus();
  };

  const onCompleted = (data: createAccount) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (error) {
      return setError("result", {
        message: error,
      });
    }
    const { username, password } = getValues();
    if (ok) {
      navigation.navigate("Login", {
        username,
        password,
        message: "????????? ?????????????????????. ????????? ?????????.",
      });
    }
  };

  const onValid: SubmitHandler<IFormCreateAccount> = (data) => {
    if (loading) {
      return;
    }
    createAccountMutation({
      variables: {
        ...data,
      },
      onCompleted,
    });
  };

  const clearCreateError = () => {
    if (formState.errors.result) {
      clearErrors("result");
    }
  };

  return (
    <AuthLayout>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "????????? ????????? ????????? ???????????????",
            },
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <>
              <STextInput
                change={Boolean(watch("email"))}
                blurOnSubmit={false}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onBlur={onBlur}
                value={value}
                onChange={clearCreateError}
                onChangeText={onChange}
                onSubmitEditing={() => onNext(firstNameRef)}
                hasError={Boolean(formState.errors.email?.message)}
              />
              <FormError message={formState?.errors?.email?.message} />
            </>
          )}
          name="email"
        />

        <AuthPlaceholder change={Boolean(watch("email"))}>
          ?????????
        </AuthPlaceholder>
      </View>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <>
              <STextInput
                autoCorrect={false}
                blurOnSubmit={false}
                onBlur={onBlur}
                value={value}
                change={Boolean(watch("firstName"))}
                ref={firstNameRef}
                returnKeyType="next"
                onChange={clearCreateError}
                onChangeText={onChange}
                onSubmitEditing={() => onNext(usernameRef)}
                hasError={Boolean(formState.errors.firstName?.message)}
              />
              <FormError message={formState?.errors?.firstName?.message} />
            </>
          )}
          name="firstName"
        />

        <AuthPlaceholder change={Boolean(watch("firstName"))}>
          ??????
        </AuthPlaceholder>
      </View>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <>
              <STextInput
                onBlur={onBlur}
                value={value}
                blurOnSubmit={false}
                change={Boolean(watch("username"))}
                ref={usernameRef}
                returnKeyType="next"
                onChange={clearCreateError}
                onChangeText={onChange}
                autoCapitalize="none"
                onSubmitEditing={() => onNext(passwordRef)}
                hasError={Boolean(formState.errors.username?.message)}
              />
              <FormError message={formState?.errors?.username?.message} />
            </>
          )}
          name="username"
        />
        <AuthPlaceholder change={Boolean(watch("username"))}>
          ????????? ??????
        </AuthPlaceholder>
      </View>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 6,
              message: "??????????????? 6?????? ???????????????",
            },
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <>
              <STextInput
                blurOnSubmit={false}
                onBlur={onBlur}
                value={value}
                change={Boolean(watch("password"))}
                ref={passwordRef}
                secureTextEntry
                returnKeyType="done"
                lastOne={true}
                onChange={clearCreateError}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(onValid)}
                hasError={Boolean(formState.errors.password?.message)}
              />
              <FormError message={formState?.errors?.password?.message} />
            </>
          )}
          name="password"
        />
        <AuthPlaceholder change={Boolean(watch("password"))}>
          ????????????
        </AuthPlaceholder>
      </View>
      <AuthBtn
        loading={loading}
        text="?????? ??????"
        disabled={!formState.isValid || loading}
        onPress={handleSubmit(onValid)}
      />
      <FormError message={formState?.errors?.result?.message} />
    </AuthLayout>
  );
};

export default CreateAccount;
