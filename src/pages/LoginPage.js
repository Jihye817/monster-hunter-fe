import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../utils/constants";
import apiModules from "../utils/api";
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

const LoginPage = ({ setIsLoggedIn, setUserData }) => {
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
  });
  const navigate = useNavigate();
  const navigateToJoin = () => {
    navigate(ROUTES.JOIN);
  };

  const navigateToPasswordFind = () => {
    navigate(ROUTES.PASSWORDFIND);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleLoginClick = async () => {
    try {
      const response = await apiModules.login(loginData);
      if (response.success) {
        let accessToken = response.data.accessToken;
        let userId = response.data.id;
        let nickname = response.data.nickname;
        localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("userId", userId);
        let userData = {
          id: userId,
          nickname: nickname,
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        setUserData({
          id: userId,
          nickname: nickname,
        });
        setIsLoggedIn(true);
        navigate(ROUTES.MAIN);
      } else {
        alert("로그인이 실패하였습니다.");
      }
    } catch (error) {
      alert("로그인이 실패하였습니다.");
    }
  };

  return (
    <Container>
      <div className="login_wrap">
        <div>로그인</div>
        <input
          name="id"
          type="text"
          placeholder="아이디를 입력해주세요"
          onChange={handleInputChange}
        ></input>
        <input
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={handleInputChange}
        ></input>
        <button className="primary" onClick={handleLoginClick}>
          로그인
        </button>
        <div className="login_bottom">
          <span onClick={navigateToJoin}>회원가입</span>
          <div className="title_bar"></div>
          <span onClick={navigateToPasswordFind}>비밀번호 찾기</span>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
