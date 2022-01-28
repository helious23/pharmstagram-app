import { Text, useWindowDimensions, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ShareStackNavParamList } from "../navTypes";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Avatar from "../components/Avatar";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";
import DefaultAvatar from "../components/DefaultAvatar";
import ScreenLayout from "../components/ScreenLayout";

const SEE_PROFILE = gql`
  query seeProfile($username: String!, $page: Int!) {
    seeProfile(username: $username) {
      id
      firstName
      username
      email
      bio
      avatar
      following {
        id
        username
        avatar
      }
      followers {
        id
        username
        avatar
      }
      totalFollowing
      totalFollowers
      totalPosts
      photos(page: $page) {
        results {
          id
          file
        }
        totalPages
      }
    }
  }
`;

const Container = styled.View`
  background-color: ${(props) => props.theme.mainBgColor};
  flex: 1;
`;
const Header = styled.View`
  padding: 20px 0px;
`;

const UserSection = styled.View`
  flex-direction: row;
`;

const UserData = styled.View<{ width: number }>`
  width: ${(props) => props.width * 0.7}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Posts = styled.View`
  width: 33%;
  justify-content: center;
  align-items: center;
`;
const TotalPosts = styled.Text`
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const Followers = styled.View`
  width: 33%;
  justify-content: center;
  align-items: center;
`;
const TotalFollowers = styled.Text`
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const Followings = styled.View`
  width: 33%;
  justify-content: center;
  align-items: center;
`;
const TotalFollowing = styled.Text`
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const UserText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const BioText = styled.Text`
  margin-top: 10px;
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
`;

const PhotoSection = styled.View``;

const Profile: React.FC<
  NativeStackScreenProps<ShareStackNavParamList, "Profile">
> = ({ route, navigation }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { data, loading } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE,
    {
      variables: {
        username: route.params.username,
        page: 1,
      },
    }
  );

  useEffect(() => {
    if (route.params.username) {
      navigation.setOptions({
        headerTitle: route.params.username,
      });
    }
  }, []);

  const theme = useTheme();
  return (
    <ScreenLayout loading={loading}>
      <Container>
        <Header>
          <UserSection>
            {data?.seeProfile?.avatar ? (
              <Avatar avatar={data?.seeProfile?.avatar} size={80} />
            ) : (
              <DefaultAvatar size={70} />
            )}
            <UserData width={SCREEN_WIDTH}>
              <Posts>
                <TotalPosts>{data?.seeProfile?.totalPosts}</TotalPosts>
                <UserText>게시물</UserText>
              </Posts>
              <Followers>
                <TotalFollowers>
                  {data?.seeProfile?.totalFollowers}
                </TotalFollowers>
                <UserText>팔로워</UserText>
              </Followers>
              <Followings>
                <TotalFollowing>
                  {data?.seeProfile?.totalFollowing}
                </TotalFollowing>
                <UserText>팔로잉</UserText>
              </Followings>
            </UserData>
          </UserSection>
          {data?.seeProfile?.bio ? (
            <BioText>{data.seeProfile.bio}</BioText>
          ) : null}
        </Header>
        <PhotoSection></PhotoSection>
      </Container>
    </ScreenLayout>
  );
};

export default Profile;
