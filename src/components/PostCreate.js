import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const PostCreate = () => {
  const navigate = useNavigate();
  const navigateToBoard = () => {
    navigate(ROUTES.BOARD);
  };
  return (
    <>
      <div className="content_title">글쓰기</div>
      <div className="detail_breadcrumb">
        <div>
          <img
            src={require("../assets/icons/arrow_left_w.png")}
            alt="arrow_left"
          ></img>
        </div>
        <span onClick={navigateToBoard}>목록으로</span>
      </div>

      <div className="post_detail_container">
        <div className="post_title_wrap">
          <input type="text" placeholder="제목을 입력해주세요"></input>
          <div>
            <span>작성자</span>
            <div className="title_bar"></div>
            <span>2024-01-01</span>
          </div>
        </div>
        <div className="post_text_wrap">
          <textarea className="post_textarea" placeholder="내용을 입력해주세요"></textarea>
        </div>
        <div className="post_btn_wrap">
          <button className="primary">글쓰기</button>
        </div>
      </div>
    </>
  );
};

export default PostCreate;
