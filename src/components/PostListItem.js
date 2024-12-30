import { useNavigate } from "react-router-dom";

const PostList = ({item}) => {
  const navigate = useNavigate();

  const navigateToPost = () => {
    navigate(`/board/${item.id}`);
  };
  return (
    <div className="list_item" key={item.id}>
      <div className="post_number">{item.id}</div>
      <div className="post_title">
        <span onClick={navigateToPost}>{item.title}</span>
      </div>
      <div className="post_nickname">{item.nickname}</div>
      <div className="post_view">{item.view}</div>
      <div className="post_created_at">{item.created_at}</div>
    </div>
  );
};

export default PostList;
