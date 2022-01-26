import styled, { useTheme } from "styled-components/native";

const SAvatar = styled.Image<{ size: number }>`
  margin-right: 10px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
`;

interface IAvatarProps {
  avatar: string;
  size: number;
}

const Avatar: React.FC<IAvatarProps> = ({ avatar, size }) => {
  const theme = useTheme();
  return (
    <SAvatar
      size={size}
      source={{ uri: avatar }}
      resizeMode="cover"
      style={{
        borderColor: theme.tabBarBrodrColor,
        borderWidth: 0.2,
      }}
    />
  );
};

export default Avatar;
