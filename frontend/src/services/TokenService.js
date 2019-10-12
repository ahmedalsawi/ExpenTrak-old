class TokenService {

  formatToken(token) {
    if (token) {
      return `Token ${token}`
    }
  }

  storeToken(token) {}

  loadToken() {}

  genConfig() {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    return config;
  }

  tokenConfig = getState => {
    const token = getState().authReducer.token;

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
}