export class TokenService {

  static formatToken(token) {
    if (token) {
      return `Token ${token}`
    }
  }

  static storeToken(TokenName, token) {}

  static loadToken(TokenName) {

    // TODO implement session storage as well
    const token = localStorage.getItem(TokenName);

    return token;
  }

  static genConfig(TokenName) {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    let token = localStorage.getItem(TokenName);
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  }

  static tokenConfig = getState => {
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