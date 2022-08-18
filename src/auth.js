import jwtDecode from "jwt-decode";

export function verify(accessToken) {
  try {
    const decodedToken = jwtDecode(accessToken);
    const { isVerified, exp } = decodedToken;
    const currentTime = Date.now().valueOf();

    return { isTokenValid: currentTime < exp, isUserVerified: isVerified };
  } catch (e) {
    return { isTokenValid: false, isUserVerified: false };
  }
}

export function getAccessToken() {
  return localStorage.getItem("auth-token");
}

export function removeAccessToken() {
  return localStorage.removeItem("auth-token");
}
