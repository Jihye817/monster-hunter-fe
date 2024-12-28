import { useNavigate } from "react-router-dom";

export const MonsterListItem = ({ item }) => {
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`/monsterdetail/${item.id}`);
  };
  return (
    <div className="list_item">
      <div className="icon">
        <img
          src={require("../assets/monsters/icons/" + item.icon)}
          alt="돼지감자"
        ></img>
      </div>
      <div className="name">
        <span onClick={navigateToDetail}>{item.name}</span>
      </div>
      <div className="type">{item.type}</div>
      <div className="weak">{item.weak}</div>
    </div>
  );
};

export default MonsterListItem;
