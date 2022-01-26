import React from "react";
import { useEffect, useState } from "react";
import { Dimensions, Image, Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { seeFeed_seeFeed } from "../__generated__/seeFeed";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ShareStackNavParamList } from "../navTypes";
import { Ionicons } from "@expo/vector-icons";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import { toggleLike, toggleLikeVariables } from "../__generated__/toggleLike";
import DefaultAvatar from "./DefaultAvatar";
import Avatar from "./Avatar";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const Username = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;
const File = styled.Image``;

const PhotoData = styled.View`
  padding: 10px;
`;

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Likes = styled.TouchableOpacity`
  margin-top: 10px;
`;

const LikeCountContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const LikedUser = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;
const LikeCounter = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

const LikeText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const Caption = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;
const CaptionText = styled.View`
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
`;

const HashTag = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const HashTagText = styled.Text`
  color: ${(props) => props.theme.BLUE.BLUE_0};
`;

const NormalText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const Photo: React.FC<seeFeed_seeFeed> = ({
  id,
  user,
  caption,
  file,
  isLiked,
  likes,
  likedBy,
}) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<ShareStackNavParamList, "Photo">>();
  const goToProfile = () => {
    navigation.navigate("Profile", { username: user.username, id: user.id });
  };
  const [imageHeight, setImageHeight] = useState(SCREEN_HEIGHT / 3);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      if (height >= SCREEN_HEIGHT / 3) {
        setImageHeight(SCREEN_HEIGHT / 3);
      } else {
        setImageHeight(height);
      }
    });
  }, [file]);

  const updateToggleLike: MutationUpdaterFunction<
    toggleLike,
    toggleLikeVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {
    if (result.data) {
      const {
        data: {
          toggleLike: { ok },
        },
      } = result;
      if (ok) {
        const photoId = `Photo:${id}`;
        cache.modify({
          id: photoId,
          fields: {
            isLiked(prev) {
              return !prev;
            },
            likes(prev, { readField }) {
              if (readField("isLiked")) {
                return prev - 1;
              } else {
                return prev + 1;
              }
            },
          },
        });
      }
    }
  };

  const [toggleLikeMutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        id,
      },
      update: updateToggleLike,
    }
  );

  return (
    <Container key={id}>
      <Header onPress={goToProfile}>
        {user.avatar && <Avatar avatar={user.avatar} size={25} />}
        <Username>{user.username}</Username>
      </Header>
      {file && (
        <File
          resizeMode="cover"
          source={{ uri: file }}
          style={{ width: SCREEN_WIDTH, height: imageHeight }}
        />
      )}
      <PhotoData>
        <Actions>
          <Action onPress={() => toggleLikeMutation()}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={30}
              color={isLiked ? theme.likeHeartColor : theme.fontColor}
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons
              name="chatbubble-outline"
              size={25}
              color={theme.fontColor}
            />
          </Action>
          <Action>
            <Ionicons
              name="paper-plane-outline"
              size={25}
              color={theme.fontColor}
            />
          </Action>
        </Actions>

        <Likes
          onPress={() =>
            navigation.navigate("Likes", {
              photoId: id,
            })
          }
        >
          {likedBy ? (
            likes === 1 ? (
              <LikeCountContainer>
                <View>
                  <LikedUser>{likedBy?.username}</LikedUser>
                  <LikeText>님이 좋아합니다</LikeText>
                </View>
              </LikeCountContainer>
            ) : (
              <LikeCountContainer>
                {likedBy.avatar ? (
                  <Avatar avatar={likedBy.avatar} size={25} />
                ) : (
                  <DefaultAvatar size={25} />
                )}

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <LikedUser>{likedBy?.username}</LikedUser>
                  <LikeText>님</LikeText>
                </View>
                <View style={{ marginLeft: 5, flexDirection: "row" }}>
                  <LikeCounter>외 {likes - 1}명</LikeCounter>
                  <LikeText>이 좋아합니다</LikeText>
                </View>
              </LikeCountContainer>
            )
          ) : likes > 0 ? (
            <LikeCounter>좋아요 {likes}개</LikeCounter>
          ) : null}
        </Likes>
        <Caption>
          <TouchableOpacity onPress={goToProfile}>
            <Username>{user.username}</Username>
          </TouchableOpacity>
          <CaptionText>
            {caption?.split(" ").map((word, index) =>
              /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/.test(word) ? (
                <HashTag key={index}>
                  <HashTagText>{word} </HashTagText>
                </HashTag>
              ) : (
                <NormalText key={index}>{word} </NormalText>
              )
            )}
          </CaptionText>
        </Caption>
      </PhotoData>
    </Container>
  );
};

export default Photo;
