import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const PostDetail = () => {
  const navigate = useNavigate();
  const navigateToBoard = () => {
    navigate(ROUTES.BOARD);
  };
  return (
    <>
      <div className="content_title">자유게시판</div>
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
          <span>게시물 제목입니다.</span>
          <div>
            <span>작성자</span>
            <div className="title_bar"></div>
            <span>2024-01-01</span>
          </div>
        </div>
        <div className="post_text_wrap">게시물 내용입니다.</div>
        <div className="post_btn_wrap">
          <button className="primary">글쓰기</button>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
