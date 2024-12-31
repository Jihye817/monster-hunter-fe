const MainPage = () => {
  return (
    <div className="main_container">
      <div className="main_banner_wrap">
        <img src={require("../assets/images/main_banner.jpeg")} alt="banner" />
      </div>
      <div className="main_text">
        안녕하세요
        <br /> 몬스터 헌터 정보 사이트입니다.
      </div>
    </div>
  );
};

export default MainPage;
