import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { useEffect, useState } from "react";
import apiModules from "../utils/api";
import TextareaAutosize from "react-textarea-autosize";

const PostDetail = ({ id }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    fseq: params.id,
    id: "test1",
    body: "",
  });

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
      let postComments = await apiModules.getComment(params.id);
      setPost({
        ...postDetail,
        regDate: postDetail.regDate.split("T")[0],
      });
      setComments(postComments.data.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleInputChange = (e) => {
    const body = e.target.value;
    setNewComment({
      ...newComment,
      body: body,
    });
    console.log(newComment.body);
  };

  const handleCommentBtnClick = async () => {
    try {
      const response = await apiModules.createNewComment(newComment);
      if (response.success) {
        alert("성공적으로 저장되었습니다.");
      } else {
        alert("댓글이 저장되지 않았습니다.");
      }
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
        <div className="post_text_wrap">
          <pre>{post.body}</pre>
        </div>
        <div className="post_btn_wrap">
          <button className="primary" onClick={navigateToPostCreate}>
            글쓰기
          </button>
        </div>
        <div>
          <div>댓글</div>
          {comments.map((item) => (
            <div key={item.seq} className="comment_wrap">
              <div className="comment_title">
                <div>
                  <span className="comment_nickname">{item.id}</span>
                  <span>
                    {new Date(item.regDate)
                      .toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
                      .slice(0, 21)
                      .replaceAll(". ", "-")
                      .replace(/-오전|-오후/g, "")}
                  </span>
                </div>
                <div className="comment_edit">
                  {item.id === "test1" && (
                    <>
                      <span>수정</span>
                      <div className="title_bar"></div>
                      <span>삭제</span>
                    </>
                  )}
                </div>
              </div>
              <div className="comment_body">{item.body}</div>
            </div>
          ))}
          <div className="comment_new_wrap">
            <TextareaAutosize
              className="comment_textarea"
              onChange={handleInputChange}
            ></TextareaAutosize>
            <div>
              <button className="primary" onClick={handleCommentBtnClick}>
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
