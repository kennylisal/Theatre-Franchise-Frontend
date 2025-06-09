import axios from "axios";
import type { AuthTokensPayload } from "./interface";

async function adminLogin(
  username: string,
  password: string
): Promise<{
  success: boolean;
  payload: AuthTokensPayload;
}> {
  try {
    const body = {
      username: username,
      newPassword: password,
    };
    console.log(body);
    const request = await axios.post("http://localhost:3000/auth/login", body);
    if (request.status === 200) {
      const tokens: AuthTokensPayload = request.data;
      return { success: true, payload: tokens };
    } else {
      return { success: false, payload: { accessToken: "", refreshToken: "" } };
    }
  } catch (error) {
    console.log(error);
    return { success: false, payload: { accessToken: "", refreshToken: "" } };
  }
}

export { adminLogin };
