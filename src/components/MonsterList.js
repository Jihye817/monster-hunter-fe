import { mockData } from "../mockData";
import MonsterListItem from "./MonsterListItem";
import apiModules from "../utils/api";
import { useEffect, useState } from "react";

const MonsterList = () => {
  // const listItem = mockData;
  const [listItem, setListItem] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredItem, setFilteredItem] = useState([]);

  useEffect(() => {
    fetchMonsterLists();
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setFilteredItem(listItem);
    } else {
      const filtered = listItem.filter(
        (item) => item.name.toLowerCase().includes(searchText.toLowerCase()) // 이름으로 검색
      );
      setFilteredItem(filtered);
    }
  }, [searchText, listItem]);

  const fetchMonsterLists = async () => {
    try {
      let monsterList = localStorage.getItem("monsterList");
      if (monsterList === null) {
        let monsterList = await apiModules.getMonsterLists();
        setListItem(monsterList);
        setFilteredItem(monsterList);
        localStorage.setItem("monsterList", JSON.stringify(monsterList));
      } else {
        const parsedList = JSON.parse(monsterList);
        setListItem(parsedList);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className="content_title">몬스터 정보</div>
      <div className="search_bar_wrap">
        <div className="icon_wrap">
          <img
            src={require("../assets/icons/search_w.png")}
            alt="검색아이콘"
          ></img>
        </div>
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          onChange={handleSearchInputChange}
        />
        <button className="primary">검색</button>
      </div>
      <div>
        <div className="list_title">
          <div className="icon">아이콘</div>
          <div className="name">이름</div>
          <div className="type">종류</div>
          <div className="weak">약점속성</div>
        </div>
        {filteredItem === undefined || filteredItem.length === 0 ? (
          <div className="no_data">데이터가 없습니다</div>
        ) : (
          filteredItem.map((item) => {
            return <MonsterListItem item={item} key={item.seq} />;
          })
        )}
      </div>
    </>
  );
};

export default MonsterList;
