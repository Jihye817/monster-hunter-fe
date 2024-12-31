import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../utils/constants";

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

const LoginPage = () => {
  const navigate = useNavigate();

  const navigateToJoin = () => {
    navigate(ROUTES.JOIN);
  };

  return (
    <Container>
      <div className="login_wrap">
        <div>로그인</div>
        <input type="text" placeholder="아이디를 입력해주세요"></input>
        <input type="password" placeholder="비밀번호를 입력해주세요"></input>
        <button className="primary">로그인</button>
        <div className="login_bottom">
          <span onClick={navigateToJoin}>회원가입</span>
          <div className="title_bar"></div>
          <span>비밀번호 찾기</span>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
