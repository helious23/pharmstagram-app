import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import {
  SelectPhotoStackNavParamList,
  LoggedInNavParamList,
} from "../navTypes";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Top = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Bottom = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const ImageContainer = styled.TouchableOpacity``;

const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0;
`;

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.BLUE.BLUE_0};
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
`;

const SelectPhoto: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<SelectPhotoStackNavParamList>,
    NativeStackScreenProps<LoggedInNavParamList>
  >
> = ({ navigation }) => {
  const numColumns = 4;
  const theme = useTheme();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>();
  const [chosenPhoto, setChosenPhoto] = useState("");
  const [endCursor, setEndCursor] = useState("");
  const [hasNext, setHasNext] = useState(true);

  const getPhotos = async () => {
    const {
      assets: photos,
      endCursor,
      hasNextPage,
    } = await MediaLibrary.getAssetsAsync({
      first: 52,
    });
    setEndCursor(endCursor);
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
    setHasNext(hasNextPage);
  };

  const getMorePhotos = async () => {
    if (hasNext) {
      const { endCursor: newEndCursor, assets: morePhotos } =
        await MediaLibrary.getAssetsAsync({
          after: endCursor,
        });
      setPhotos(photos?.concat(morePhotos));
      setEndCursor(newEndCursor);
    }
  };

  const getPermissions = async () => {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (status !== MediaLibrary.PermissionStatus.GRANTED && canAskAgain) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "undetermined") {
        setOk(true);
        getPhotos();
      }
    } else if (status !== MediaLibrary.PermissionStatus.DENIED) {
      setOk(true);
      getPhotos();
    }
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("UploadForm", { file: chosenPhoto })}
    >
      <HeaderRightText>다음</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    getPermissions();
  }, [ok]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto]);

  const choosePhoto = (uri: string) => {
    setChosenPhoto(uri);
  };

  const renderItem = ({ item: photo }: { item: MediaLibrary.Asset }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{
          width: SCREEN_WIDTH / numColumns,
          height: SCREEN_WIDTH / numColumns,
        }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={20}
          color={chosenPhoto === photo.uri ? theme.BLUE.BLUE_0 : "transparent"}
        />
      </IconContainer>
    </ImageContainer>
  );

  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width: SCREEN_WIDTH, height: "100%" }}
          />
        ) : (
          <ActivityIndicator
            color={theme.fontColor}
            size="large"
            style={{ flex: 1, justifyContent: "center" }}
          />
        )}
      </Top>
      {photos ? (
        <Bottom>
          <FlatList
            data={photos}
            onEndReachedThreshold={1}
            onEndReached={() => getMorePhotos()}
            keyExtractor={(photo) => photo.id}
            renderItem={renderItem}
            numColumns={numColumns}
          />
        </Bottom>
      ) : null}
    </Container>
  );
};

export default SelectPhoto;
