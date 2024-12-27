import { useState } from "react";
import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme/theme";
import apiModules from "./api";

const Body = styled.div`
  height: 100vh;
  margin: 0 auto;
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
`;
const Container = styled.div`
  margin: 0 auto;
  height: 100%;
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
  height: calc(100vh - 101px);
`;

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = async () => {
    // setTheme(() => {
    //   return theme === "dark" ? "light" : "dark";
    // });
    await apiModules.test();
  };
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Body>
        <Container>
          <Header>
            <span className="title">몬스터 헌터 사이트</span>
            <div className="title_btn_wrap">
              <span>로그인</span>
              <div className="title_bar"></div>
              <span>회원가입</span>
            </div>
          </Header>
          <Main>
            <nav>
              <div>자유게시판</div>
              <div>몬스터 정보</div>
            </nav>
            <section>
              <div className="main_banner_wrap">
                <img src={require("./assets/image/main_banner.png")}></img>
              </div>
              <div className="main_text">
                안녕하세요
                <br /> 몬스터 헌터 정보 사이트입니다.
              </div>
            </section>
          </Main>
        </Container>
        {/* <button onClick={toggleTheme}>테마변경</button> */}
      </Body>
    </ThemeProvider>
  );
}

export default App;
