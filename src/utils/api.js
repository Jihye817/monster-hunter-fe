import axios from "axios";
import instance from "./axios";

const login = async (userData) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/loginRequest",
      userData
    );
    console.log(response)
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log(response.data.accessToken);
      return { success: true, data: response.data };
    } else {
      throw new Error("로그인이 실패하였습니다.");
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

//monster
const getMonsterLists = async () => {
  try {
    const response = await instance.get("/monster/list");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getMonsterDetail = async (seq) => {
  try {
    const response = await instance.get("/monster/detail/" + seq);
    if (response.status === 200) {
      console.log(response)
      return response.data;
    } else {
      throw new Error("몬스터 상세정보 에러가 발생하였습니다.");
    }
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
  login,
  getMonsterLists,
  getMonsterDetail,
  getBoardPostLists,
  getPostDetail,
  createNewPost,
};

export default apiModules;
