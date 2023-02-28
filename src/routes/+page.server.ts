import {EMAIL, PHONE_NUMBER} from '$env/static/private'

export function load() {
  return {
    email: EMAIL,
    phoneNumber: PHONE_NUMBER
  };
}