import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNativeFile } from "apollo-upload-client";
import {
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { LoggedInNavParamList } from "../navTypes";
import { useEffect } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { FEED_PHOTO } from "../fragment";
import {
  uploadPhoto,
  uploadPhotoVariables,
} from "../__generated__/uploadPhoto";
import FormError from "../components/auth/FormError";
import { Keyboard } from "react-native";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ok
      error
      photo {
        ...FeedPhoto
      }
    }
  }
  ${FEED_PHOTO}
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Photo = styled.Image<{ height: number; width: number }>`
  height: ${(props) => props.height * 0.4}px;
  width: ${(props) => props.width}px;
`;

const CaptionContainer = styled.View`
  margin-top: 20px;
  padding: 0px 20px;
`;
const Caption = styled.TextInput<{ hasError: boolean }>`
  background-color: ${(props) => props.theme.formBgColor};
  border: 1px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.formBorderColor)};
  color: ${(props) => props.theme.formFontColor};
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text<{ valid: boolean }>`
  color: ${(props) => props.theme.BLUE.BLUE_0};
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  opacity: ${(props) => (props.valid ? 1 : 0.3)};
`;

interface IFormProps {
  caption: string;
}

const UploadForm: React.FC<
  NativeStackScreenProps<LoggedInNavParamList, "UploadForm">
> = ({ route, navigation }) => {
  const { control, handleSubmit, formState, setError } = useForm<IFormProps>({
    mode: "onChange",
  });
  const { height, width } = useWindowDimensions();
  const theme = useTheme();

  const [uploadPhotoMutation, { loading, error, called, data }] = useMutation<
    uploadPhoto,
    uploadPhotoVariables
  >(UPLOAD_PHOTO_MUTATION);

  console.log("called", called);
  console.log("loading", loading);
  console.log("error", error);

  const onValid: SubmitHandler<IFormProps> = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: "a.jpg",
      type: "image/jpeg",
    });
    console.log(route.params.file);

    uploadPhotoMutation({
      variables: {
        file: file,
        caption,
      },
    });
    console.log(file);
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={
        formState.isValid
          ? handleSubmit(onValid)
          : () => {
              Keyboard.dismiss();
              setError("caption", { message: "사진 설명이 필요합니다." });
            }
      }
    >
      <HeaderRightText valid={formState.isValid}>다음</HeaderRightText>
    </TouchableOpacity>
  );

  const HeaderRightLoading = () => (
    <ActivityIndicator color={theme.fontColor} style={{ marginRight: 10 }} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      headerLeft: loading
        ? () => null
        : () => (
            <Ionicons
              name="close"
              size={24}
              color={theme.fontColor}
              onPress={() => navigation.navigate("UploadNav")}
            />
          ),
    });
  }, [formState.isValid, loading]);

  return (
    <DismissKeyboard>
      <Container>
        <Photo
          resizeMode="contain"
          source={{ uri: route.params.file }}
          height={height}
          width={width}
        />
        <CaptionContainer>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <View>
                <Caption
                  placeholder="사진 설명"
                  returnKeyType="done"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(onValid)}
                  hasError={Boolean(formState.errors.caption?.message)}
                />
                <FormError message={formState.errors.caption?.message} />
              </View>
            )}
            name="caption"
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default UploadForm;
