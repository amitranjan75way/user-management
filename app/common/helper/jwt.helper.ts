import jwt from 'jsonwebtoken';
import { Payload } from '../dto/base.dto';
import { loadConfig } from "./config.hepler";

loadConfig();

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRY = '1h'; // 60 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days


export const generateTokens = (payload: Payload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
  return { accessToken, refreshToken };
};
 
export const validateToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
};

// export const updateAccessToken = (refreshToken: string) => {
//   try {
//     const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as Payload;
//     const newAccessToken = jwt.sign({ userId: decoded.userId, email: decoded.email }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
//     return { valid: true, newAccessToken };
//   } catch (error) {
//     return { valid: false, error };
//   }
// };