const usernameValidationRegex = /^[a-zA-Z0-9_]{3,30}$/;
const nameValidationRegex = /^[A-Za-z\s]{3,30}$/;
const genderValidationRegex = /^[mf]{1,1}$/;
const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isNumeric(str: any) {
  try {
    const result = !isNaN(str) && !isNaN(parseFloat(str));
    return result;
  } catch (e) {
    return false;
  }
}

export {
  nameValidationRegex,
  usernameValidationRegex,
  genderValidationRegex,
  emailValidationRegex,
  isNumeric
};
