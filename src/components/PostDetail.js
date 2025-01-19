import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { useEffect, useState } from "react";
import apiModules from "../utils/api";
import TextareaAutosize from "react-textarea-autosize";

const PostDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [postUserData, setPostUserData] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [updateComment, setUpdateComment] = useState({
    fseq: params.id,
    id: "",
    nickname: "",
    type: "B",
    body: "",
  });
  const [updateCommentSeq, setUpdateCommentSeq] = useState(null);
  const [newComment, setNewComment] = useState({
    fseq: params.id,
    id: "",
    nickname: "",
    type: "B",
    body: "",
  });

  const navigateToBoard = () => {
    navigate(ROUTES.BOARD);
  };
  const navigateToPostCreate = () => {
    navigate(ROUTES.POST_CREATE);
  };

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
    fetchPostDetail();
  }, []);

  useEffect(() => {
    setNewComment({ ...newComment, ...postUserData });
  }, [postUserData]);

  const fetchPostDetail = async () => {
    try {
      let postDetail = await apiModules.getPostDetail(params.id);
      let postComments = await apiModules.getComment("B", params.id);
      let userData = JSON.parse(localStorage.getItem("userData"));
      setPostUserData(userData);
      setUpdateComment({
        ...updateComment,
        nickname: userData.nickname,
        id: userData.id,
      });
      setPost({
        ...postDetail,
        regDate: postDetail.regDate.split("T")[0],
      });
      setComments(postComments.data);
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
  };

  const handleUpdateCommentChange = (e) => {
    const body = e.target.value;
    setUpdateComment({
      ...updateComment,
      body: body,
    });
    console.log(updateComment);
  };

  const handleCommentUpdateClick = async (seq) => {
    try {
      const response = await apiModules.updateComment(seq, updateComment);
      if (response.success) {
        alert("성공적으로 수정되었습니다.");
        fetchPostDetail();
        setUpdateCommentSeq(null);
      } else {
        alert("댓글이 수정되지 않았습니다.");
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleUpdateButtonClick = (seq, body) => {
    setUpdateCommentSeq(seq);
    setUpdateComment({
      ...updateComment,
      body: body,
    });
  };

  const handleCommentDeleteClick = async (seq) => {
    try {
      const response = await apiModules.deleteComment(seq);
      if (response.success) {
        alert("성공적으로 삭제되었습니다.");
        fetchPostDetail();
      } else {
        alert("댓글이 삭제되지 않았습니다.");
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleCommentBtnClick = async () => {
    console.log(newComment);
    if (isLoggedIn) {
      try {
        const response = await apiModules.createNewComment(newComment);
        if (response.success) {
          alert("성공적으로 저장되었습니다.");
          setNewComment({
            ...newComment,
            body: "",
          });
          fetchPostDetail();
        } else {
          alert("댓글이 저장되지 않았습니다.");
        }
      } catch (error) {
        console.log("error : ", error);
      }
    } else {
      alert("로그인이 필요합니다.");
      navigate(ROUTES.LOGIN);
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
          <div className="comment_head">댓글</div>
          {comments.map((item) => (
            <div key={item.seq} className="comment_wrap">
              <div className="comment_title">
                <div>
                  <span className="comment_nickname">{item.nickname}</span>
                  <span>
                    {new Date(item.regDate).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                </div>
                <div className="comment_edit">
                  {item.id === postUserData.id && (
                    <>
                      <span
                        onClick={() =>
                          handleUpdateButtonClick(item.seq, item.body)
                        }
                      >
                        수정
                      </span>
                      <div className="title_bar"></div>
                      <span onClick={() => handleCommentDeleteClick(item.seq)}>
                        삭제
                      </span>
                    </>
                  )}
                </div>
              </div>
              {updateCommentSeq === item.seq ? (
                <div className="comment_update_wrap">
                  <TextareaAutosize
                    className="comment_textarea"
                    value={updateComment.body}
                    onChange={handleUpdateCommentChange}
                  ></TextareaAutosize>
                  <div>
                    <button
                      className="outlined"
                      onClick={() => setUpdateCommentSeq(null)}
                    >
                      취소
                    </button>
                    <button
                      className="primary"
                      onClick={() => handleCommentUpdateClick(item.seq)}
                    >
                      수정
                    </button>
                  </div>
                </div>
              ) : (
                <div className="comment_body">{item.body}</div>
              )}
            </div>
          ))}
          <div className="comment_new_wrap">
            <TextareaAutosize
              className="comment_textarea"
              value={newComment.body}
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
