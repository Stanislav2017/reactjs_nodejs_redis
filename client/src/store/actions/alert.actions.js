import {
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_ERRORS,
  HIDE_ERRORS,
  HIDE_ERROR,
} from "../types/alert.types";

export function showAlert(payload) {
  return { type: SHOW_ALERT, payload };
}

export function hideAlert() {
  return { type: HIDE_ALERT };
}

export function showErrors(payload) {
  return { type: SHOW_ERRORS, payload };
}

export function hideErrors() {
  return { type: HIDE_ERRORS };
}

export function hideError(payload) {
  return { type: HIDE_ERROR, payload };
}
