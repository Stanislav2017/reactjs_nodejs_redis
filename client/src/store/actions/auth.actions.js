import { LOGOUT, REFRESH, SIGNIN, SIGNUP } from "../types/auth.types";

export function signin(payload) {
  return { type: SIGNIN, ...payload };
}

export function signup(payload) {
  return { type: SIGNUP, ...payload };
}

export function logout() {
  return { type: LOGOUT };
}

export function refresh() {
  return { type: REFRESH };
}
