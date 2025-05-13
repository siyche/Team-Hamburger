import { jwtDecode } from "jwt-decode";

// Return true if token is expired, invalid, or missing; false otherwise
export const checkTokenExpiration = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};
