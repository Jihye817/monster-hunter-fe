import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { useEffect, useState } from "react";
import apiModules from "../utils/api";

const MonsterDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [monster, setMonster] = useState([]);

  const navigateToMonsterList = () => {
    navigate(ROUTES.MONSTER_LIST);
  };

  useEffect(() => {
    fetchMonsterDetail();
  }, []);

  const fetchMonsterDetail = async () => {
    try {
      let monsterDetail = await apiModules.getMonsterDetail(params.id);
      console.log(monsterDetail);
      setMonster(monsterDetail);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <>
      <div className="content_title">{monster.name}</div>
      <div className="detail_breadcrumb">
        <div>
          <img
            src={require("../assets/icons/arrow_left_w.png")}
            alt="arrow_left"
          ></img>
        </div>
        <span onClick={navigateToMonsterList}>목록으로</span>
      </div>
      <div className="detail_container">
        <div className="detail_wrap">
          <div className="detail_title">설명</div>
          <div>{monster.description}</div>
        </div>
        <div className="detail_img_wrap">
          <img
            src={require(`../assets/monsters/pictures/${params.id}.png`)}
            alt="monster_picture"
          ></img>
        </div>
      </div>
    </>
  );
};

export default MonsterDetail;
