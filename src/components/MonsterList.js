import { mockData } from "../mockData";
import MonsterListItem from "./MonsterListItem";

const MonsterList = () => {
  const listItem = mockData;
  return (
    <>
      <div className="monster_list_title">몬스터 정보</div>
      <div className="search_bar_wrap">
        <div className="icon_wrap">
          <img
            src={require("../assets/icons/icon_search_w.png")}
            alt="검색아이콘"
          ></img>
        </div>
        <input type="text" placeholder="검색어를 입력해주세요" />
        <button className="primary">검색</button>
      </div>
      <div>
        <div className="list_title">
          <div className="icon">아이콘</div>
          <div className="name">이름</div>
          <div className="type">종류</div>
          <div className="weak">약점속성</div>
        </div>
        {listItem === undefined || listItem.length === 0 ? (
          <span>데이터가 없습니다</span>
        ) : (
          listItem.map((item) => {
            return <MonsterListItem item={item} key={item.id}/>;
          })
        )}
      </div>
    </>
  );
};

export default MonsterList;
