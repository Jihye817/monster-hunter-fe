import axios from "axios";

//monster
const getMonsterLists = async () => {
  try {
    const response = await axios.get("http://59.11.225.224:8080/monster/list");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getMonsterDetail = async (seq) => {
  try {
    const response = await axios.get(
      "http://59.11.225.224:8080/monster/detail?seq=" + seq
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//board
const getBoardPostLists = async () => {
  try {
    const response = await axios.get("http://59.11.225.224:8080/board/list");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const apiModules = {
  getMonsterLists,
  getMonsterDetail,
  getBoardPostLists,
};

export default apiModules;
