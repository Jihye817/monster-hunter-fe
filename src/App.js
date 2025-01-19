import { useEffect, useState } from "react";
import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme/theme";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ROUTES } from "./utils/constants";
import MainPage from "./pages/MainPage";
import MonsterList from "./components/MonsterList";
import MonsterDetail from "./components/MonsterDetail";
import Board from "./components/Board";
import PostDetail from "./components/\bPostDetail";
import PostCreate from "./components/PostCreate";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import Mypage from "./components/Mypage";
import apiModules from "./utils/api";
import MypagePassCheck from "./components/MypagePassCheck";

const Body = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
`;
const Container = styled.div`
  margin: 0 auto;
  min-width: 1200px;
  max-width: 1200px;
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
`;
const Header = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eff0f5;
  justify-content: space-between;
`;
const Main = styled.div`
  display: flex;
  padding: 20px;
  min-height: calc(100vh - 101px);
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  color: #404049;
  font-size: 14px;
`;

function App() {
  const [theme, setTheme] = useState("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    nickname: "",
  });

  const checkLoginStatus = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      try {
        let tokens = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        const response = await apiModules.validateToken(tokens);
        if (response.success) {
          setUserData({
            id: response.data.id,
            nickname: response.data.nickname,
          });
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("error : ", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const toggleTheme = async () => {
    // setTheme(() => {
    //   return theme === "dark" ? "light" : "dark";
    // });
  };
  const navigate = useNavigate();
  const navigateToMain = () => {
    navigate(ROUTES.MAIN);
  };
  const navigateToMypagePassCheck = () => {
    navigate(ROUTES.MYPAGE_PASS_CHECK);
  };
  const navigateToBoard = () => {
    navigate(ROUTES.BOARD);
  };
  const navigateToMonsterList = () => {
    navigate(ROUTES.MONSTER_LIST);
  };
  const navigateToLogin = () => {
    navigate(ROUTES.LOGIN);
  };
  const navigateToJoin = () => {
    navigate(ROUTES.JOIN);
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate(ROUTES.MAIN);
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Body>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />}
          ></Route>
          <Route path={ROUTES.JOIN} element={<JoinPage />}></Route>
          <Route
            path="*"
            element={
              <Container>
                <Header>
                  <span className="title" onClick={navigateToMain}>
                    MONSTER HUNTER :KR
                  </span>
                  <div className="title_btn_wrap">
                    {isLoggedIn ? (
                      <>
                        <span style={{cursor: "default"}}>{userData.nickname}님 환영합니다!</span>
                        <div className="title_bar"></div>
                        <span onClick={navigateToMypagePassCheck}>
                          마이페이지
                        </span>
                        <div className="title_bar"></div>
                        <span onClick={handleLogoutClick}>로그아웃</span>
                      </>
                    ) : (
                      <>
                        <span onClick={navigateToLogin}>로그인</span>
                        <div className="title_bar"></div>
                        <span onClick={navigateToJoin}>회원가입</span>
                      </>
                    )}
                  </div>
                </Header>
                <Main>
                  <nav>
                    <div onClick={navigateToBoard}>자유게시판</div>
                    <div onClick={navigateToMonsterList}>몬스터 정보</div>
                  </nav>
                  <section>
                    <Routes>
                      <Route path={ROUTES.MAIN} element={<MainPage />}></Route>
                      <Route
                        path={ROUTES.MYPAGE_PASS_CHECK}
                        element={<MypagePassCheck id={userData.id} />}
                      ></Route>
                      <Route path={ROUTES.MYPAGE} element={<Mypage/>}></Route>
                      <Route
                        path={ROUTES.MONSTER_LIST}
                        element={<MonsterList />}
                      ></Route>
                      <Route path={ROUTES.BOARD} element={<Board />}></Route>
                      <Route
                        path={ROUTES.POST_DETAIL}
                        element={<PostDetail />}
                      ></Route>
                      <Route
                        path={ROUTES.POST_CREATE}
                        element={<PostCreate />}
                      ></Route>
                      <Route
                        path={ROUTES.MONSTER_DETAIL}
                        element={<MonsterDetail />}
                      ></Route>
                    </Routes>
                    <Footer>
                      © 2024. Park Jihye. All rights reserved.
                      wlgul817@gmail.com
                    </Footer>
                  </section>
                </Main>
              </Container>
            }
          ></Route>
        </Routes>
        {/* <button onClick={toggleTheme}>테마변경</button> */}
      </Body>
    </ThemeProvider>
  );
}

export default App;
