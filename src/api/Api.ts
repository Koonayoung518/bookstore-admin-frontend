import axios from "axios";

class Api {
  async getData(url: string, params: any) {
    try {
      const response = await axios.get(url, { params });
      console.log(response.data);

      const result = await response.data;
      return result;
    } catch (err) {
      console.log(url + ":: get data error");
    }
  }

  async postData(url: string, data: any) {
    try {
      const response = await axios.post(url, data);
      console.log(response.data);

      const result = await response.data;
      return result;
    } catch (err) {
      console.log(url + ":: post data error");
    }
  }

  async putData(url: string, data: any) {
    try {
      const response = await axios.put(url, data);
      console.log(response.data);

      const result = await response.data;
      return result;
    } catch (err) {
      console.log(url + ":: put data error");
    }
  }

  async deleteData(url: string) {
    try {
      const response = await axios.delete(url);
      console.log(response.data);

      const result = await response.data;
      return result;
    } catch (err) {
      console.log(url + ":: delete data error");
    }
  }
}

export default Api;
