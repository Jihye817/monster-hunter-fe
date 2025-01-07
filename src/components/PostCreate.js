import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import apiModules from "../utils/api";

const PostCreate = () => {
  const [newPost, setNewPost] = useState({
    nickname: "",
    title: "",
    // body: "",
  });
  const navigate = useNavigate();
  const navigateToBoard = () => {
    navigate(ROUTES.BOARD);
  };

  const handleSubmitButton = async () => {
    try {
      let titleText = document.getElementById("title").value;
      let bodyText = document.getElementById("body").value;
      if (titleText === "" || bodyText === "") {
        alert("제목과 내용은 비워둘 수 없습니다.");
      } else {
        setNewPost({
          nickname: "tester",
          title: titleText,
          body: bodyText,
        });

        const response = await apiModules.createNewPost(newPost);
        if (response === 200) {
          navigate(ROUTES.BOARD);
        } else {
          alert("등록에 실패하였습니다.");
        }
      }
    } catch (error) {
      console.log("error : ", error);
    }
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
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            id="title"
          ></input>
          <div>
            <span>작성자</span>
            <div className="title_bar"></div>
            <span>2024-01-01</span>
          </div>
        </div>
        <div className="post_text_wrap">
          <TextareaAutosize
            id="body"
            className="post_textarea"
            placeholder="내용을 입력해주세요"
          ></TextareaAutosize>
        </div>
        <div className="post_btn_wrap">
          <button className="outlined">취소</button>
          <button className="primary" onClick={handleSubmitButton}>
            등록
          </button>
        </div>
      </div>
    </>
  );
};

export default PostCreate;
