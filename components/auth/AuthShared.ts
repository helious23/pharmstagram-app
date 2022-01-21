import styled from "styled-components/native";

interface ITextInputProps {
  hasError?: boolean;
  lastOne?: boolean;
  change?: boolean;
}

export const STextInput = styled.TextInput<ITextInputProps>`
  background-color: ${(props) => props.theme.formBgColor};
  border: 1px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.formBorderColor)};
  padding: ${(props) => (props.change ? "16px 0 4px 12px" : "10px 12px")};
  margin-bottom: 8px;
  border-radius: 4px;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;

export const AuthPlaceholder = styled.Text<{ change: boolean }>`
  position: absolute;
  top: ${(props) => (props.change ? "6px" : "11px")};
  left: 13px;
  font-size: ${(props) => (props.change ? "10px" : "16px")};
  color: ${(props) => props.theme.fontColor};
`;
