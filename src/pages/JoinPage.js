import { useState } from "react";
import styled from "styled-components";

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
  const [inputs, setInputs] = useState({
    id: "",
    nickname: "",
    password: "",
  });
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [isValidated, setIsValidated] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);

  const handlePassInputBlur = (e) => {
    const inputPassword = e.target.value;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    const validatePassword =
      inputPassword.length > 8 && passwordRegex.test(inputPassword);

    setInputs((prevInputs) => ({
      ...prevInputs,
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
    const isSame = inputs.password === inputPassword;
    setIsPasswordSame(isSame);
  };

  return (
    <Container>
      <div className="join_wrap">
        <div>회원가입</div>
        <div>
          <div>
            <span>아이디</span>
            <span className="join_title_small">
              입력하신 이메일은 비밀번호 찾기에 사용됩니다.
            </span>
          </div>
          <div className="join_input_wrap">
            <input type="text" placeholder="아이디를 입력해주세요" />
            <button className="primary">중복확인</button>
          </div>
        </div>
        <div>
          <div>닉네임</div>
          <div className="join_input_wrap">
            <input type="text" placeholder="닉네임을 입력해주세요" />
            <button className="primary">중복확인</button>
          </div>
        </div>
        <div>
          <div>비밀번호</div>
          <div className="join_input_wrap">
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
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
            <select>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
        </div>
        <button className="primary join">회원가입</button>
        <button className="outlined join">취소</button>
      </div>
    </Container>
  );
};

export default JoinPage;
