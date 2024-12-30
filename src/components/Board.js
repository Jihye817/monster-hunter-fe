import { useNavigate } from "react-router-dom";
import { mockPost } from "../mockData";
import PostListItem from "./PostListItem";

const Board = () => {
  const postList = mockPost;

  return (
    <>
      <div className="content_title">자유게시판</div>
      <div className="board_container">
        <div className="list_title">
          <div className="post_number">번호</div>
          <div
            className="post_title"
            style={{ width: "500px", paddingLeft: "0px", textAlign: "center" }}
          >
            제목
          </div>
          <div className="post_nickname">닉네임</div>
          <div className="post_view">조회수</div>
          <div className="post_created_at">등록일</div>
        </div>
        <div className="post_list_wrap">
          {postList === undefined || postList.length === 0 ? (
            <>
              <span>게시물이 없습니다.</span>
            </>
          ) : (
            postList.map((item) => {
              return <PostListItem item={item} key={item.id} />;
            })
          )}
        </div>
        <div className="bottom_wrap">
          <div className="board_search_bar_wrap">
            <input type="text" placeholder="검색어를 입력해주세요"></input>
            <button className="primary">검색</button>
          </div>
          <div className="write_btn_wrap">
            <button className="primary">글쓰기</button>
          </div>
        </div>
        <div className="pagination_wrap">
          <img src={require("../assets/icons/arrow_left_w.png")}></img>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <img src={require("../assets/icons/arrow_right_w.png")}></img>
        </div>
      </div>
    </>
  );
};

export default Board;
