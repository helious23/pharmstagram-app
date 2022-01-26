import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, View } from "react-native";
import { useTheme } from "styled-components/native";
import { ShareStackNavParamList } from "../navTypes";
import { gql, useQuery } from "@apollo/client";
import { USER_FRAGMENT } from "../fragment";
import {
  seePhotoLikes,
  seePhotoLikesVariables,
} from "../__generated__/seePhotoLikes";
import ScreenLayout from "../components/ScreenLayout";
import { useState } from "react";
import UserRow from "../components/UserRow";
import { seePhotoLikes_seePhotoLikes } from "../__generated__/seePhotoLikes";

const SEE_PHOTO_LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

const Likes: React.FC<NativeStackScreenProps<ShareStackNavParamList, "Likes">> =
  ({ route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery<
      seePhotoLikes,
      seePhotoLikesVariables
    >(SEE_PHOTO_LIKES_QUERY, {
      variables: {
        id: route?.params?.photoId,
      },
      skip: !route.params.photoId,
    });

    const onRefresh = async () => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    };

    const renderUser = ({
      item: user,
    }: {
      item: seePhotoLikes_seePhotoLikes | null;
    }) => user && <UserRow {...user} />;

    const keyExtractor = (user: seePhotoLikes_seePhotoLikes | null) =>
      user?.id + "";

    const theme = useTheme();

    return (
      <ScreenLayout loading={loading}>
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: "100%",
                height: 0.8,
                backgroundColor: theme.formBorderColor,
              }}
            ></View>
          )}
          data={data?.seePhotoLikes}
          keyExtractor={keyExtractor}
          renderItem={renderUser}
          style={{ width: "100%" }}
        />
      </ScreenLayout>
    );
  };

export default Likes;
