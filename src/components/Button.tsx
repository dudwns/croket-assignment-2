import styled from "styled-components";

interface ButtonType {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  $bgColor: string;
  $hBgColor: string;
  onClick?: VoidFunction;
}

const Button = ({ type, text, $bgColor, $hBgColor, onClick }: ButtonType) => {
  return (
    <StyledButton
      type={type}
      $bgColor={$bgColor}
      $hBgColor={$hBgColor}
      onClick={onClick && onClick}
    >
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ $bgColor: string; $hBgColor: string }>`
  width: 140px;
  height: 40px;
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.$bgColor};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.$hBgColor};
  }
`;

export default Button;
