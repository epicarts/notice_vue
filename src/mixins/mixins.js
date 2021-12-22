import axios from "axios";

export default {
  methods: {
    async $api(url, method, data) {
      return (
        await axios({
          method: method,
          url,
          data,
        }).catch((e) => {
          console.log(e);
        })
      ).data;
    },
    async $getapi(url, params) {
      return await axios
        .get(url, { params: params })
        .then(function (response) {
          return response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async $postapi(url, data) {
      return await axios
        .post(url, data)
        .then(function (response) {
          return response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async $deleteApi(url) {
      return await axios
        .delete(url)
        .then(function (response) {
          return response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async $patchApi(url, data) {
      return await axios
        .patch(url, data)
        .then(function (response) {
          return response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
