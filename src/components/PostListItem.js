import { useNavigate } from "react-router-dom";

const PostList = ({ item }) => {
  const navigate = useNavigate();

  const navigateToPost = () => {
    navigate(`/board/${item.seq}`);
  };
  return (
    <div className="list_item" key={item.seq}>
      <div className="post_number">{item.seq}</div>
      <div className="post_title">
        <span onClick={navigateToPost}>{item.title}</span>
      </div>
      <div className="post_nickname">{item.nickname}</div>
      <div className="post_view">0</div>
      <div className="post_created_at">{item.regDate.split("T")[0]}</div>
    </div>
  );
};

export default PostList;
