import axios from "axios";

export class API {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAllRes() {
    try {
      const response = await axios.get(
        this.baseUrl, HeaderConfig("token")
      )
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async postOneRes(resource) {
    try {
      const response = await axios.post(
        this.baseUrl,
        JSON.stringify(resource),
        HeaderConfig("token")
      )
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async getOneRes(_id) {
    try {
      const res = await axios.get(
        `${this.baseUrl}/${_id}`, HeaderConfig("token")
      )
      return res.data;
    } catch (err) {
      throw err;
    }
  }


  async deleteOneRes(_id) {
    try {
      const res = await axios.delete(
        `${this.baseUrl}/${_id}`, HeaderConfig("token")
      )
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async putOneRes(resource) {
    try {
      const response = await axios.put(
        `${this.baseUrl}/${resource._id}`,
        JSON.stringify(resource),
        HeaderConfig("token")
      )
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}



export const HeaderConfig = (TokenName = "token") => {
  const token = localStorage.getItem(TokenName);

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};