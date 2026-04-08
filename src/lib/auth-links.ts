function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const CONSOLE_PATH = "/console";

export function getExternalConsoleOrigin() {
  const value =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_CONSOLE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!value) {
    return "";
  }

  return trimTrailingSlash(value);
}

export function getExternalAuthUrl(path: string) {
  const origin = getExternalConsoleOrigin();

  if (!origin) {
    return null;
  }

  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getExternalConsoleUrl() {
  const origin = getExternalConsoleOrigin();

  if (!origin) {
    return null;
  }

  return `${origin}${CONSOLE_PATH}`;
}
