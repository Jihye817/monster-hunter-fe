import styled from "styled-components";
import apiModules from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { useState } from "react";

const Container = styled.div`
  margin: 0 auto;
  min-width: 1200px;
  max-width: 1200px;
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PasswordFindPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  const navigateToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleInputChange = (e) => {
    setId(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await apiModules.passwordFind(id);
      if (response.success) {
        alert("메일이 성공적으로 발송되었습니다.");
        navigateToLogin();
      } else {
        alert("메일 발송에 실패하였습니다.");
      }
    } catch (error) {
      alert("메일 발송에 실패하였습니다.");
    }
  };

  return (
    <Container>
      <div className="pass_wrap">
        <div>비밀번호 찾기 - 임시 비밀번호 발급</div>
        <div>
          아이디 입력 후 아래 버튼을 눌러주세요.
          <br />
          재로그인 후 꼭 비밀번호를 변경해주세요.
        </div>
        <div className="pass_div_title">아이디</div>
        <input type="text" onChange={handleInputChange} />
        <button className="primary" onClick={handleButtonClick}>
          임시 비밀번호 발급
        </button>
      </div>
    </Container>
  );
};

export default PasswordFindPage;
