export const API_URL = process.env.NEXT_PUBLIC_HEADLESS_CMS_API_URL ?? "https://staging.luckydaycompetitions.com";

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://app.luckydaycompetitions.com';

export const JWT_SECRET = process.env.JWT_SECRET

export const SESSION_COOKIE_NAME = "token";

export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
