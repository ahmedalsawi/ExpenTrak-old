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