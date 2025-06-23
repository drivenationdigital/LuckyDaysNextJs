export const API_URL = process.env.HEADLESS_CMS_API_URL ?? "https://staging.luckydaycompetitions.com";

// const LIVE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://phpstack-889362-4370795.cloudwaysapps.com";
export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://lucky-days-sandy.vercel.app';