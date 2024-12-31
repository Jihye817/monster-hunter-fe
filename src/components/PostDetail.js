import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { useEffect, useState } from "react";
import apiModules from "../utils/api";

const PostDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  const navigateToBoard = () => {
    navigate(ROUTES.BOARD);
  };
  const navigateToPostCreate = () => {
    navigate(ROUTES.POST_CREATE);
  };

  useEffect(() => {
    fetchPostDetail();
  }, []);

  const fetchPostDetail = async () => {
    try {
      let postDetail = await apiModules.getPostDetail(params.id);
      postDetail.regDate = postDetail.regDate.split("T")[0];
      setPost(postDetail);
    } catch (error) {
      console.log("error : ", error);
    }
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
          <span>{post.title}</span>
          <div>
            <span>{post.nickname}</span>
            <div className="title_bar"></div>
            <span>{post.regDate}</span>
          </div>
        </div>
        <div className="post_text_wrap">{post.body}</div>
        <div className="post_btn_wrap">
          <button className="primary" onClick={navigateToPostCreate}>
            글쓰기
          </button>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
