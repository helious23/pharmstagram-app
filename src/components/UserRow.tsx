import styled from "styled-components/native";
import Avatar from "./Avatar";
import DefaultAvatar from "./DefaultAvatar";
import { seePhotoLikes_seePhotoLikes } from "../__generated__/seePhotoLikes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ShareStackNavParamList } from "../navTypes";

const Container = styled.View`
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const UserContainer = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

const Username = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const BtnContainer = styled.View``;

const FollowBtn = styled.TouchableOpacity`
  width: 90px;
  padding: 8px 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.BLUE.BLUE_0};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const UnFollowText = styled.Text`
  color: white;
`;

const FollowText = styled.Text`
  color: white;
`;

const UserRow: React.FC<seePhotoLikes_seePhotoLikes> = ({
  id,
  avatar,
  username,
  isFollowing,
  isMe,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ShareStackNavParamList, "Likes">>();
  return (
    <Container>
      <UserContainer
        onPress={() => navigation.navigate("Profile", { username, id })}
      >
        {avatar ? (
          <Avatar avatar={avatar} size={40} />
        ) : (
          <DefaultAvatar size={40} />
        )}
        <Username>{username}</Username>
      </UserContainer>
      {isMe ? null : (
        <BtnContainer>
          <FollowBtn>
            {isFollowing ? (
              <UnFollowText>팔로우 취소</UnFollowText>
            ) : (
              <FollowText>팔로우</FollowText>
            )}
          </FollowBtn>
        </BtnContainer>
      )}
    </Container>
  );
};

export default UserRow;
