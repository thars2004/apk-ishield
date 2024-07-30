// validators.js
export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validateName = (name) => {
  const re = /^[A-Za-z]+$/;
  return re.test(name);
};

export const validatePassword = (password) => {
  
  return password.length >= 8;
};