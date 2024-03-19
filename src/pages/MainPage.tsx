import styled from "styled-components";
import datas from "../data/data.json";
import useSelect from "../hooks/useSelect";
import Button from "../components/Button";
import { TITLE } from "../constants";

const MainPage = () => {
  const {
    size,
    sizeRef,
    colorRef,
    handleChangeSelect,
    getDisabledCheck,
    getOptionName,
    handleSubmitForm,
    handleClickCancel,
  } = useSelect(datas);

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmitForm}>
          {datas.data.titleList.map((title, index) => (
            <Select
              key={title}
              defaultValue=""
              name={title}
              disabled={title !== TITLE.SIZE && size === ""}
              onChange={(e) => handleChangeSelect(e, title)}
              ref={title === TITLE.SIZE ? sizeRef : colorRef}
            >
              <option value="" disabled={true}>
                {title}
              </option>
              {datas.data.groupList[index].options.map((option) => (
                <option key={option} value={option} disabled={getDisabledCheck(option)}>
                  {getOptionName(title, option)}
                </option>
              ))}
            </Select>
          ))}
          <ButtonContainer>
            <Button
              type="submit"
              text="출력"
              $bgColor="rgb(60, 140, 236)"
              $hBgColor="rgb(60, 160, 236)"
            />
            <Button
              type="button"
              text="취소"
              $bgColor="rgb(150, 172, 198)"
              $hBgColor="rgb(182, 181, 187)"
              onClick={handleClickCancel}
            />
          </ButtonContainer>
        </Form>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Select = styled.select`
  width: 300px;
  padding: 8px;
  outline: none;
  cursor: pointer;
  border-radius: 3px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  padding-top: 10px;
`;

export default MainPage;
