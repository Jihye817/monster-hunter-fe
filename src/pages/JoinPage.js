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
            <input type="password" placeholder="비밀번호를 입력해주세요" />
          </div>
        </div>
        <div>
          <div>비밀번호 확인</div>
          <div className="join_input_wrap">
            <input type="password" placeholder="비밀번호를 다시 입력해주세요" />
          </div>
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
