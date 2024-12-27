import axios from "axios";

const test = async () => {
  try {
    const response = await axios.get("http://59.11.225.224:8080/")
  } catch (error) {
    console.log(error);
  }
};

const apiModules = {
  test
}

export default apiModules;