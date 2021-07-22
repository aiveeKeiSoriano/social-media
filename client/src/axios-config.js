import axios from "axios";

export default function initAxios(history) {
  axios.defaults.baseURL = "https://social-media-aiveekei.herokuapp.com/";

  axios.interceptors.request.use(
    function (req) {
      let token = localStorage.getItem("access_token");
      if (!token) {
        console.log("Token not found");
      } else {
        req.headers["Authorization"] = "Bearer " + token;
      }
      return req;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  async function getRefresh(token) {
    let response = await axios.post("/auth/token", { refresh_token: token });
    let data = response.data;
    localStorage.setItem("access_token", data.access_token);
  }

  axios.interceptors.response.use(
    function (res) {
      return res;
    },
    async function (error) {
      let originalRequest = error.config;
      if (error.response) {
        let { status, data } = error.response;
        if (status === 403) {
          let refresh_token = localStorage.getItem("refresh_token");
          if (!refresh_token || data.message === "refresh token expired") {
            history.push("/login");
          } else {
            await getRefresh(refresh_token);
            return axios(originalRequest);
          }
        }
      }
      return Promise.reject(error);
    }
  );
}
