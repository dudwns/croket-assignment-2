import styled from "styled-components";

interface ButtonType {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  color: string;
  hcolor: string;
  onClick?: VoidFunction;
}

const Button = ({ type, text, color, hcolor, onClick }: ButtonType) => {
  return (
    <StyledButton type={type} color={color} hcolor={hcolor} onClick={onClick && onClick}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ color: string; hcolor: string }>`
  width: 140px;
  height: 40px;
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.color};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hcolor};
  }
`;

export default Button;
