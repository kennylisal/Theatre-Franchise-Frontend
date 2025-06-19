import type { UserJWTData } from "./interface";

const checkUserVerification = async (): Promise<{
  success: boolean;
  data: UserJWTData;
}> => {};

export { checkUserVerification };
