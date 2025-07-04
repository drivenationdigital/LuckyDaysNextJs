export const API_URL = process.env.HEADLESS_CMS_API_URL ?? "https://staging.luckydaycompetitions.com";

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://lucky-days-next-js.vercel.app';

export const JWT_SECRET = process.env.JWT_SECRET
export const SESSION_COOKIE_NAME = "token";