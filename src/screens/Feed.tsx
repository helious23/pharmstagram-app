import { useQuery, gql } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragment";
import { ShareStackNavParamList } from "../navTypes";
import {
  seeFeed,
  seeFeedVariables,
  seeFeed_seeFeed,
} from "../__generated__/seeFeed";

export const FEED_QUERY = gql`
  query seeFeed($lastId: Int) {
    seeFeed(lastId: $lastId) {
      user {
        username
        avatar
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
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Feed: React.FC<NativeStackScreenProps<ShareStackNavParamList, "Feed">> =
  () => {
    const [lastId, setLastId] = useState<number>();
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch, fetchMore } = useQuery<
      seeFeed,
      seeFeedVariables
    >(FEED_QUERY);

    const refresh = async () => {
      try {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
      } catch (error) {
        console.log(error);
      }
    };

    const renderPhoto = ({ item: photo }: { item: seeFeed_seeFeed | null }) => {
      return <View>{photo && <Photo {...photo} />}</View>;
    };

    return (
      <ScreenLayout loading={loading}>
        <FlatList
          refreshing={refreshing}
          onRefresh={refresh}
          onEndReachedThreshold={1}
          onEndReached={() =>
            fetchMore({
              variables: {
                lastId:
                  data?.seeFeed && data?.seeFeed[data?.seeFeed?.length - 1]?.id,
              },
            })
          }
          data={data?.seeFeed}
          showsVerticalScrollIndicator={false}
          keyExtractor={(photo) => photo?.id + ""}
          renderItem={renderPhoto}
        />
      </ScreenLayout>
    );
  };

export default Feed;
