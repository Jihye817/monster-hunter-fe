import { useEffect, useState } from "react";
import apiModules from "../utils/api";
import MonsterListItem from "../components/MonsterListItem";
import PostListItem from "../components/PostListItem";

const SearchPage = ({ searchKeyword }) => {
  const [searchResults, setSearchResults] = useState({
    totalBoardCount: 0,
    totalMonsterCount: 0,
  });
  const getSearchResults = async () => {
    const response = await apiModules.searchTotal(searchKeyword);
    if (response.success) {
      setSearchResults(response.data);
    } else {
      alert("검색에 실패하였습니다.");
    }
  };

  useEffect(() => {
    if (searchKeyword) {
      getSearchResults();
    }
  }, [searchKeyword]);

  return (
    <>
      <div className="search_top">
        <span>" {searchKeyword} "</span>에 대한 검색결과입니다.
      </div>
      {searchResults.totalMonsterCount !== 0 ? (
        <div>
          <div className="search content_title">
            <span>몬스터 정보</span>
            {searchResults.totalMonsterCount > 3 ? <span>+ 더보기</span> : null}
          </div>
          <div>
            {searchResults.monsters.map((item) => (
              <MonsterListItem item={item} key={item.seq} />
            ))}
          </div>
        </div>
      ) : (
        <div>데이터가 없습니다.</div>
      )}
      {searchResults.totalBoardCount !== 0 ? (
        <div>
          <div className="search content_title">
            <span>자유게시판</span>
            {searchResults.totalBoardCount > 3 ? <span>+ 더보기</span> : null}
          </div>
          <div className="search board_container">
            {searchResults.boards.map((item) => (
              <PostListItem item={item} key={item.seq} />
            ))}
          </div>
        </div>
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </>
  );
};

export default SearchPage;
