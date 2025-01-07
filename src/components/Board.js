import { useNavigate } from "react-router-dom";
import { mockPost } from "../mockData";
import PostListItem from "./PostListItem";
import { ROUTES } from "../utils/constants";
import { useEffect, useState } from "react";
import apiModules from "../utils/api";

const Board = () => {
  const [postList, setPostList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const navigateToPostCreate = () => {
    navigate(ROUTES.POST_CREATE);
  };

  useEffect(() => {
    fetchPostLists();
  }, [currentPage]);

  const fetchPostLists = async () => {
    try {
      let posts = await apiModules.getBoardPostLists(currentPage);
      setPostList(posts.data.content);
      setTotalPages(posts.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    if (page < 0 || page >= totalPages) {
      return;
    } else {
      setCurrentPage(page);
    }
  };

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
            <div className="no_data">게시물이 없습니다.</div>
          ) : (
            postList.map((item) => {
              return <PostListItem item={item} key={item.seq} />;
            })
          )}
        </div>
        <div className="bottom_wrap">
          <div className="board_search_bar_wrap">
            <input type="text" placeholder="검색어를 입력해주세요"></input>
            <button className="primary">검색</button>
          </div>
          <div className="write_btn_wrap">
            <button className="primary" onClick={navigateToPostCreate}>
              글쓰기
            </button>
          </div>
        </div>
        <div className="pagination_wrap">
          <img
            src={require("../assets/icons/arrow_left_w.png")}
            onClick={() => handlePageChange(currentPage - 1)}
          ></img>
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index;
            return (
              <span
                key={index}
                className={page === currentPage ? "active" : ""}
                onClick={() => handlePageChange(page)}
              >
                {page + 1}
              </span>
            );
          })}
          <img
            src={require("../assets/icons/arrow_right_w.png")}
            onClick={() => handlePageChange(currentPage + 1)}
          ></img>
        </div>
      </div>
    </>
  );
};

export default Board;
