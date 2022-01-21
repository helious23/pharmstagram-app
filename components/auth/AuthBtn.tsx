import React from "react";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${(props) => props.theme.BLUE.BLUE_0};
  padding: 15px 10px;
  border-radius: 5px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.btnFontColor};
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

interface IAuthBtnProps {
  disabled: boolean;
  text: string;
  onPress: () => void;
}

const AuthBtn: React.FC<IAuthBtnProps> = ({ disabled, text, onPress }) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
};

export default AuthBtn;
