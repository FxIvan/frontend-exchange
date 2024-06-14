import secureLocalStorage from "react-secure-storage";

const config = {
  headers: {
    Authorization: `Bearer ${secureLocalStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

export default config;
