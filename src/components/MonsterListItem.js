import { useNavigate } from "react-router-dom";

export const MonsterListItem = ({ item }) => {
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`/monsterdetail/${item.seq}`);
  };
  return (
    <div className="list_item">
      <div className="icon">
        <img
          src={require("../assets/monsters/pictures/" + item.seq + ".png")}
          // src={require("../assets/monsters/icons/icon_" + "1" + ".png")}
          alt="monster icon"
        ></img>
      </div>
      <div className="name">
        <label onClick={navigateToDetail}>
          <span>[{item.nickname}]</span>
          <span>{item.name}</span>
        </label>
      </div>
      <div className="type">{item.type}</div>
      <div className="weak">{item.weak}</div>
    </div>
  );
};

export default MonsterListItem;
