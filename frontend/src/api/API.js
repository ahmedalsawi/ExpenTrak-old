import axios from "axios";
import {
  HeaderConfig
} from "api/APIUtils";

class API {
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

  async getOneRes(id) {
    try {
      const res = await axios.get(
        `${this.baseUrl}/${id}`, HeaderConfig("token")
      )
      return res.data;
    } catch (err) {
      throw err;
    }
  }


  async deleteOneRes() {

  }

  async putOneRes() {

  }
}

export default API;