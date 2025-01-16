import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../utils/constants";
import apiModules from "../utils/api";

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

const JoinPage = () => {
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    nickname: "",
    password: "",
    weapon: "",
  });
  const [isIdUnique, setIsIdUnique] = useState(false);
  const [isEmailUnique, setIsEmailUnique] = useState(false);
  const [isNicknameUnique, setIsNicknameUnique] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState();
  const [isValidated, setIsValidated] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const navigate = useNavigate();
  const navigateToMain = () => {
    navigate(ROUTES.MAIN);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    console.log(userData);
  };

  const handlePassInputBlur = (e) => {
    const inputPassword = e.target.value;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    const validatePassword =
      inputPassword.length >= 8 && passwordRegex.test(inputPassword);

    setUserData((prevUserData) => ({
      ...prevUserData,
      password: inputPassword,
    }));
    setIsValidated(validatePassword);

    if (passwordCheck === inputPassword) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }
  };

  const handleInputIsSameBlur = (e) => {
    const inputPassword = e.target.value;
    setPasswordCheck(inputPassword);
    const isSame = userData.password === inputPassword;
    setIsPasswordSame(isSame);
  };

  const handleJoinClick = async () => {
    let isJoinReady =
      isValidated &&
      isPasswordSame &&
      isIdUnique &&
      isNicknameUnique &&
      isEmailUnique;
    if (isJoinReady) {
      try {
        const response = await apiModules.join(userData);
        if (response.success) {
          alert("성공적으로 회원가입 되었습니다.");
          navigate(ROUTES.MAIN);
        } else {
          alert("회원가입이 실패하였습니다.");
        }
      } catch (error) {
        alert("회원가입이 실패하였습니다.");
      }
    } else {
      alert("입력사항을 확인해주세요.");
    }
  };

  return (
    <Container>
      <div className="join_wrap">
        <div>회원가입</div>
        <div>
          <div>아이디</div>
          <div className="join_input_wrap">
            <input
              name="id"
              type="text"
              placeholder="아이디를 입력해주세요"
              onChange={handleInputChange}
            />
            <button className="primary">중복확인</button>
          </div>
        </div>
        <div>
          <div>
            <span>이메일</span>
            <span className="join_title_small">
              입력하신 이메일은 비밀번호 찾기에 사용됩니다.
            </span>
          </div>
          <div className="join_input_wrap">
            <input
              name="email"
              type="email"
              placeholder="ex) abc@mail.com"
              onChange={handleInputChange}
            />
            <button className="primary">중복확인</button>
          </div>
        </div>
        <div>
          <div>닉네임</div>
          <div className="join_input_wrap">
            <input
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              onChange={handleInputChange}
            />
            <button className="primary">중복확인</button>
          </div>
        </div>
        <div>
          <div>비밀번호</div>
          <div className="join_input_wrap">
            <input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleInputChange}
              onBlur={handlePassInputBlur}
            />
          </div>
          {!isValidated && (
            <span className="input_warning">
              비밀번호는 특수문자/숫자/영문자가 포함된 8자 이상이어야 합니다.
            </span>
          )}
        </div>
        <div>
          <div>비밀번호 확인</div>
          <div className="join_input_wrap">
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              onBlur={handleInputIsSameBlur}
            />
          </div>
          {!isPasswordSame && (
            <span className="input_warning">비밀번호가 일치하지 않습니다.</span>
          )}
        </div>
        <div>
          <div>주 무기</div>
          <div className="join_input_wrap">
            <select name="weapon" onChange={handleInputChange}>
              <option>건랜스</option>
              <option>대검</option>
              <option>라이트보우건</option>
              <option>랜스</option>
              <option>수렵피리</option>
              <option>슬래시액스</option>
              <option>쌍검</option>
              <option>조충곤</option>
              <option>차지액스</option>
              <option>태도</option>
              <option>한손검</option>
              <option>활</option>
              <option>해머</option>
              <option>헤비보우건</option>
            </select>
          </div>
        </div>
        <button className="primary join" onClick={handleJoinClick}>
          회원가입
        </button>
        <button className="outlined join" onClick={navigateToMain}>
          취소
        </button>
      </div>
    </Container>
  );
};

export default JoinPage;
