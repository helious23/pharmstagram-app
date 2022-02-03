import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { MaterialTabNavParamList, LoggedInNavParamList } from "../navTypes";
import { Camera } from "expo-camera";
import styled, { useTheme } from "styled-components/native";
import { useEffect, useState, useRef } from "react";
import { CameraType, FlashMode } from "expo-camera/build/Camera.types";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const TakenPhoto = styled.Image`
  flex: 1;
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.theme.cameraBtnColor};
  border: 3px solid ${(props) => props.theme.cameraBtnBorderColor};
  border-radius: 30px;
`;

const CameraChangeBtn = styled.TouchableOpacity``;

const SliderContainer = styled.View``;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FlashBtn = styled.TouchableOpacity``;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const PhotoActions = styled.View`
  flex-direction: row;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.BLUE.BLUE_0};
  padding: 10px 20px;
  border-radius: 5px;
  margin: 20px;
`;

const PhotoActionText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: white;
`;

const TakePhoto: React.FC<
  CompositeScreenProps<
    MaterialTopTabScreenProps<MaterialTabNavParamList, "Take">,
    NativeStackScreenProps<LoggedInNavParamList>
  >
> = ({ navigation }) => {
  const theme = useTheme();
  const cameraRef = useRef<Camera | null>();
  const isFocused = useIsFocused();

  const [ok, setOk] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState("");
  const [zoom, setZoom] = useState(0);

  const [cameraType, setCameraType] = useState<CameraType>(
    Camera.Constants.Type.front
  );
  const [flashMode, setFlashMode] = useState<FlashMode>(
    Camera.Constants.FlashMode.auto
  );

  const getPermissions = async () => {
    const { status, canAskAgain, granted } =
      await Camera.getCameraPermissionsAsync();
    if (status !== "granted" && canAskAgain) {
      const { granted } = await Camera.requestCameraPermissionsAsync();
      setOk(granted);
    } else if (status === "granted") {
      setOk(granted);
    }
  };

  const onCameraSwtich = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const onCameraReady = () => setCameraReady(true);

  const takePhoto = async () => {
    if (cameraRef.current && cameraReady) {
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };

  const onZoomValueChange = (value: number) => {
    setZoom(value);
  };

  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const goToUpload = async (save: boolean) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate("UploadForm", { file: takenPhoto });
  };

  const onUpload = () => {
    Alert.alert(
      "사진을 저장하시겠습니까?",
      "사진을 앨범에 저장하거나, \n 저장하지 않고 바로 업로드 하세요",
      [
        {
          text: "저장 후 업로드",
          onPress: () => goToUpload(true),
        },
        {
          text: "저장하지 않고 업로드",
          // style: "destructive", // ios only
          onPress: () => goToUpload(false),
        },
      ]
    );
  };

  const onDismiss = () => setTakenPhoto("");

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <Container>
      {isFocused ? (
        <>
          <StatusBar hidden={true} />
          {takenPhoto === "" ? (
            <Camera
              type={cameraType}
              style={{ flex: 1 }}
              zoom={zoom}
              flashMode={flashMode}
              ref={(camera) => {
                cameraRef.current = camera;
              }}
              onCameraReady={onCameraReady}
            >
              <CloseBtn onPress={() => navigation.navigate("TabsNav")}>
                <Ionicons name="close" size={30} color={theme.mainBgColor} />
              </CloseBtn>
            </Camera>
          ) : (
            <>
              <TakenPhoto source={{ uri: takenPhoto }} />
              <CloseBtn onPress={() => navigation.navigate("TabsNav")}>
                <Ionicons name="close" size={30} color={theme.mainBgColor} />
              </CloseBtn>
            </>
          )}
        </>
      ) : (
        <ActivityIndicator
          color={theme.fontColor}
          style={{ flex: 1, justifyContent: "center" }}
        />
      )}
      <Actions>
        {takenPhoto === "" ? (
          <>
            <SliderContainer>
              <Slider
                style={{ width: 200, height: 40 }}
                value={zoom}
                minimumValue={0}
                maximumValue={0.3}
                minimumTrackTintColor={theme.fontColor}
                maximumTrackTintColor={theme.formBorderColor}
                onValueChange={onZoomValueChange}
              />
            </SliderContainer>
            <ButtonsContainer>
              <FlashBtn onPress={onFlashChange}>
                <Ionicons
                  size={30}
                  color={theme.fontColor}
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? "flash-off-outline"
                      : flashMode === Camera.Constants.FlashMode.on
                      ? "flash"
                      : flashMode === Camera.Constants.FlashMode.auto
                      ? "eye"
                      : "alert-circle-outline"
                  }
                />
              </FlashBtn>
              <TakePhotoBtn onPress={takePhoto} />
              <CameraChangeBtn onPress={onCameraSwtich}>
                <Ionicons
                  name="ios-camera-reverse-outline"
                  color={theme.fontColor}
                  size={40}
                />
              </CameraChangeBtn>
            </ButtonsContainer>
          </>
        ) : (
          <PhotoActions>
            <PhotoAction onPress={onDismiss}>
              <PhotoActionText>다시 찍기</PhotoActionText>
            </PhotoAction>
            <PhotoAction onPress={onUpload}>
              <PhotoActionText>사진 업로드</PhotoActionText>
            </PhotoAction>
          </PhotoActions>
        )}
      </Actions>
    </Container>
  );
};

export default TakePhoto;
