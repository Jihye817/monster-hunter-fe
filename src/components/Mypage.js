import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const Mypage = () => {
  const [passwordCheck, setPasswordCheck] = useState();
  const [isValidated, setIsValidated] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [userData, setUserData] = useState({
    password: "",
    nickname: "",
    email: "",
    weapon: "",
  });

  const navigate = useNavigate();
  const navigateToMain = () => {
    alert("정보 수정이 취소되었습니다.");
    navigate(ROUTES.MAIN);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
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

  return (
    <>
      <div className="content_title">마이페이지</div>
      <div className="mypage_container">
        <div className="mypage_info_wrap">
          <div className="input_wrap">
            <div>아이디</div>
            <div>test1</div>
          </div>
          <div className="input_wrap">
            <div>비밀번호</div>
            <div className="password_wrap">
              <input type="password" onBlur={handlePassInputBlur}></input>
              {!isValidated && (
                <span className="input_warning">
                  비밀번호는 특수문자/숫자/영문자가 포함된 8자 이상이어야
                  합니다.
                </span>
              )}
            </div>
          </div>

          <div className="input_wrap">
            <div>비밀번호 확인</div>
            <div className="password_wrap">
              <input type="password" onBlur={handleInputIsSameBlur}></input>
              {!isPasswordSame && (
                <span className="input_warning">
                  비밀번호가 일치하지 않습니다.
                </span>
              )}
            </div>
          </div>

          <div className="input_wrap">
            <div>닉네임</div>
            <input type="text" onChange={handleInputChange}></input>
            <button className="primary">중복확인</button>
          </div>
          <div className="input_wrap">
            <div>이메일</div>
            <input type="email" onChange={handleInputChange}></input>
            <button className="primary">중복확인</button>
          </div>
          <div className="input_wrap">
            <div>주무기</div>
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
        <div className="mypage_btn_wrap">
          <button className="outlined" onClick={navigateToMain}>취소</button>
          <button className="primary">수정</button>
        </div>
      </div>
    </>
  );
};

export default Mypage;
