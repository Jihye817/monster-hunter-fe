import axios from "axios";
import instance from "./axios";

//login
const login = async (userData) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/loginRequest",
      userData
    );
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
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

const validateToken = async (tokens) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/validate-token",
      tokens
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

//join
const join = async (userData) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/register",
      userData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

const idCheck = async (id) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/check-id?id=" + id
    );
    console.log(response)
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

const emailCheck = async (email) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/check-email?email=" + email
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

const nicknameCheck = async (nickname) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/check-nickname?nickname=" + nickname
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

//mypage
const mypagePassCheck = async (userData) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/user/" + userData.id + "/passCheck",
      { password: userData.password }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

const getUserData = async (id) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/user/" + id
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

const modifyUser = async (id, userData) => {
  try {
    const response = await axios.put(
      process.env.REACT_APP_SERVER_URL + "/user/update/" + id,
      userData
    );
    return { success: true, data: response.data };
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

//comment
const getComment = async (type, id) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL +
        "/comment/list?type=" +
        type +
        "&fseq=" +
        id
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

const createNewComment = async (newComment) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/comment/insert",
      newComment
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

const updateComment = async (seq, updateComment) => {
  try {
    const response = await axios.put(
      process.env.REACT_APP_SERVER_URL + "/comment/update/" + seq,
      updateComment
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

const deleteComment = async (seq) => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/comment/delete/" + seq
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "서버에 문제가 발생하였습니다.",
    };
  }
};

const apiModules = {
  login,
  join,
  nicknameCheck,
  idCheck,
  emailCheck,
  validateToken,
  mypagePassCheck,
  getUserData,
  modifyUser,
  getMonsterLists,
  getMonsterDetail,
  getBoardPostLists,
  getPostDetail,
  createNewPost,
  getComment,
  createNewComment,
  updateComment,
  deleteComment,
};

export default apiModules;
