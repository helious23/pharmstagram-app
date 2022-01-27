import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "styled-components/native";
import { ShareStackNavParamList } from "../navTypes";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT, USER_FRAGMENT } from "../fragment";
import { seePhoto, seePhotoVariables } from "../__generated__/seePhoto";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { useState } from "react";

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      user {
        ...UserFragment
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
      likedBy {
        username
        avatar
      }
      ...PhotoFragment
    }
  }
  ${USER_FRAGMENT}
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const PhotoDetail: React.FC<
  NativeStackScreenProps<ShareStackNavParamList, "PhotoDetail">
> = ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const {
    params: { id },
  } = route;
  const { data, loading, refetch } = useQuery<seePhoto, seePhotoVariables>(
    SEE_PHOTO,
    {
      variables: {
        id,
      },
    }
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const theme = useTheme();
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: theme.mainBgColor }}
        contentContainerStyle={{
          backgroundColor: theme.mainBgColor,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data?.seePhoto && <Photo {...data?.seePhoto} fullView={true} />}
      </ScrollView>
    </ScreenLayout>
  );
};

export default PhotoDetail;
