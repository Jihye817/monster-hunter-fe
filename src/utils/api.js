import axios from "axios";

//monster
const getMonsterLists = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/monster/list"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getMonsterDetail = async (seq) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/monster/detail?seq=" + seq
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//board
const getBoardPostLists = async (page) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/board/list?page=" + page
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getPostDetail = async (seq) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/board/detail/" + seq
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createNewPost = async (newPost) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/board/insert",
      newPost
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const apiModules = {
  getMonsterLists,
  getMonsterDetail,
  getBoardPostLists,
  getPostDetail,
  createNewPost,
};

export default apiModules;
