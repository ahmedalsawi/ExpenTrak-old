import CrudAPIService from "./CrudAPIService";

const ETAPIs = new CrudAPIService({
  url: "/api",
  createConfig: () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  }
});

ETAPIs.createResources([{
    name: "labels"
  },
  {
    name: "accounts"
  },
  {
    name: "transactions"
  }
]);

export default ETAPIs;