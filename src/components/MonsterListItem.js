export const MonsterListItem = ({item}) => {
  return (
    <>
      <div className="list_item">
        <div className="icon">
          <img
            src={require("../assets/monsters/icons/" + item.icon)}
            alt="돼지감자"
          ></img>
        </div>
        <div className="name">{item.name}</div>
        <div className="type">{item.type}</div>
        <div className="weak">{item.weak}</div>
      </div>
    </>
  );
};

export default MonsterListItem;
