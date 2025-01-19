import { useState } from "react";
import apiModules from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const MypagePassCheck = ({ id }) => {
  const [userData, setUserData] = useState({
    id: id,
    password: "",
  });
  const navigate = useNavigate();

  const handleCheckClick = async () => {
    try {
      const response = await apiModules.mypagePassCheck(userData);
      if (response.success) {
        navigate(ROUTES.MYPAGE);
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="content_title">마이페이지</div>
      <div className="mypage_check_container">
        <div>개인정보 보호를 위해 비밀번호를 입력해주세요</div>
        <input
          name="password"
          type="password"
          onChange={handleInputChange}
        ></input>
        <div>
          <button className="primary" onClick={handleCheckClick}>
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default MypagePassCheck;
