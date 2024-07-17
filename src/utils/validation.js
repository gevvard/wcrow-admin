import {
  emailRegex,
  firstnameRegex,
  lastnameRegex,
  passwordRegex,
  phoneNumberRegex,
} from "./regex";

export const firstnameValidation = {
  required: "Required",
  pattern: { value: firstnameRegex, message: "Wrong name" },
};

export const lastnameValidation = {
  required: "Required",
  pattern: { value: lastnameRegex, message: "Wrong username" },
};

export const emailValidation = {
  required: "Required",
  pattern: { value: emailRegex, message: "Wrong email" },
};

export const passwordValidation = {
  required: "Required",
  pattern: { value: passwordRegex, message: "Wrong password" },
};
