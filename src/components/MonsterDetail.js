import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const MonsterDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const navigateToMonsterList = () => {
    navigate(ROUTES.MONSTER_LIST);
  };
  console.log(params.id);

  return (
    <>
      <div className="monster_list_title">몬스터 정보</div>
      <div className="detail_breadcrumb">
        <div>
          <img src={require("../assets/icons/arrow_left_w.png")} alt="arrow_left"></img>
        </div>
        <span onClick={navigateToMonsterList}>목록으로</span>
      </div>
      <div className="detail_container">
        <div className="detail_wrap">
          <div className="detail_title">설명</div>
          <div>
            강인한 몸이 특징인 《벽수》. 영역 의식이 강하며 행동 범위가 넓고
            공격성이 높다. 종종 대규모 무리도 목격된다.
          </div>
        </div>
        <div className="detail_img_wrap">
          <img src={require("../assets/monsters/pictures/1.png")} alt="monster_picture"></img>
        </div>
      </div>
    </>
  );
};

export default MonsterDetail;
