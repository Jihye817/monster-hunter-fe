import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import apiModules from "../utils/api";

const Mypage = () => {
  const [passwordCheck, setPasswordCheck] = useState();
  const [isValidated, setIsValidated] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [userId, setUserId] = useState();
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [isNicknameUnique, setIsNicknameUnique] = useState(true);
  const [mypageUserData, setMypageUserData] = useState({
    password: "",
    nickname: "",
    email: "",
    weapon: "",
  });
  const [updatedData, setUpdatedData] = useState({
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

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEmailInputBlur = () => {
    if (updatedData.email !== mypageUserData.email) {
      setIsEmailUnique(false);
    }
  };

  const handleNicknameInputBlur = () => {
    if (updatedData.nickname !== mypageUserData.nickname) {
      setIsNicknameUnique(false);
    }
  };

  const fetchUserData = async () => {
    try {
      let userData = JSON.parse(localStorage.getItem("userData"));
      let userDetail = await apiModules.getUserData(userData.id);
      setUserId(userData.id);
      setMypageUserData({
        nickname: userDetail.data.nickname,
        email: userDetail.data.email,
        weapon: userDetail.data.weapon,
      });
      setUpdatedData({
        nickname: userDetail.data.nickname,
        email: userDetail.data.email,
        weapon: userDetail.data.weapon,
      });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handlePassInputBlur = (e) => {
    const inputPassword = e.target.value;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    const validatePassword =
      inputPassword.length >= 8 && passwordRegex.test(inputPassword);
    setUpdatedData((prevUserData) => ({
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
    const isSame = updatedData.password === inputPassword;
    setIsPasswordSame(isSame);
  };
  const handleModifyClick = async () => {
    if (
      updatedData.password !== undefined &&
      isPasswordSame &&
      isEmailUnique &&
      isNicknameUnique
    ) {
      try {
        let response = await apiModules.modifyUser(userId, updatedData);
        if (response.success) {
          alert("성공적으로 수정되었습니다.");
          navigate(ROUTES.MAIN);
        }
      } catch (error) {
        console.log("error : ", error);
      }
    } else {
      if (!isEmailUnique) {
        alert("이메일 중복확인을 해주세요.");
      } else if (!isEmailUnique) {
        alert("닉네임 중복확인을 해주세요.");
      } else if (updatedData.password === undefined) {
        alert("비밀번호를 입력해주세요.");
      } else if (!isPasswordSame) {
        alert("비밀번호 확인이 일치하지 않습니다.");
      } else {
        alert("수정에 실패하였습니다.");
      }
    }
  };

  const handleEmailCheck = async () => {
    if (mypageUserData.email === updatedData.email) {
      alert("이전과 동일한 이메일입니다.");
    } else {
      try {
        const response = await apiModules.emailCheck(mypageUserData.email);
        if (!response.data) {
          alert("사용가능한 이메일입니다.");
          setIsEmailUnique(true);
        } else {
          alert("사용불가능한 이메일입니다.");
          setIsEmailUnique(false);
        }
      } catch (error) {
        alert("실패하였습니다.");
      }
    }
  };

  const handleNicknameCheck = async () => {
    if (mypageUserData.nickname === updatedData.nickname) {
      alert("이전과 동일한 닉네임입니다.");
    } else {
      try {
        const response = await apiModules.nicknameCheck(
          mypageUserData.nickname
        );
        if (!response.data) {
          alert("사용가능한 닉네임입니다.");
          setIsNicknameUnique(true);
          console.log(isNicknameUnique);
        } else {
          alert("사용불가능한 닉네임입니다.");
          setIsNicknameUnique(false);
        }
      } catch (error) {
        alert("실패하였습니다.");
      }
    }
  };

  return (
    <>
      <div className="content_title">마이페이지</div>
      <div className="mypage_container">
        <div className="mypage_info_wrap">
          <div className="input_wrap">
            <div>아이디</div>
            <div>{userId}</div>
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
            <input
              name="nickname"
              type="text"
              onChange={handleInputChange}
              onBlur={handleNicknameInputBlur}
              value={updatedData.nickname}
            ></input>
            <button className="primary" onClick={handleNicknameCheck}>
              중복확인
            </button>
          </div>
          <div className="input_wrap">
            <div>이메일</div>
            <input
              name="email"
              type="email"
              onChange={handleInputChange}
              onBlur={handleEmailInputBlur}
              value={updatedData.email}
            ></input>
            <button className="primary" onClick={handleEmailCheck}>
              중복확인
            </button>
          </div>
          <div className="input_wrap">
            <div>주무기</div>
            <select
              name="weapon"
              onChange={handleInputChange}
              value={updatedData.weapon}
            >
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
          <button className="outlined" onClick={navigateToMain}>
            취소
          </button>
          <button className="primary" onClick={handleModifyClick}>
            수정
          </button>
        </div>
      </div>
    </>
  );
};

export default Mypage;
