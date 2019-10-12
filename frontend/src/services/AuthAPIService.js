import axios from "axios";


class AuthAPIService {
  constructor() {
    this.endpoint = "/api/auth";
  }

  login = async (userInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const {
      email,
      password
    } = userInfo;

    const body = JSON.stringify({
      email,
      password
    });

    try {
      const res = await axios.post(`${this.endpoint}/login`, body, config);
      return res.data;
    } catch (err) {
      throw err;
    }
  };


  register = async (userInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify(
      userInfo
    );

    try {
      const res = await axios.post(`${this.endpoint}/register`, body, config);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  loadUser = async (token) => {

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    try {
      const res = await axios.get(`${this.endpoint}/user`, config);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  logout = () => {};
}

export default AuthAPIService;