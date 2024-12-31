import axios from "axios";

const test = async () => {
  try {
    const response = await axios.get("http://59.11.225.224:8080/");
  } catch (error) {
    console.log(error);
  }
};

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

const apiModules = {
  test,
  getMonsterLists,
  getMonsterDetail,
};

export default apiModules;
