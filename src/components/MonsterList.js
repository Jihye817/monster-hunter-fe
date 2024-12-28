const MonsterList = () => {
  return (
    <>
      <div className="monster_list_title">몬스터 정보</div>
      <div className="search_bar_wrap">
        <div className="icon_wrap">
          <img src={require("../assets/icons/icon_search_w.png")}></img>
        </div>
        <input type="text" placeholder="검색어를 입력해주세요" />
        <button className="primary">검색</button>
      </div>
      <div>리스트</div>
    </>
  );
};

export default MonsterList;
