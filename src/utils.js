const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validations = {
  isEmpty: (val) => val.trim().length === 0 && "This field is required",
  isEmail: (val) => !validEmailRegex.test(val) && "Please enter a valid email address",
  hasQueryValue: (val) => !val && "Please select a query type",
  isWithinRange: (val) => val.trim().length < 15 && "Message must have a minimum of 15 characters",
  isChecked: (val) => !val && "To submit this form, please consent to being contacted",
}

const validationRules = {
  firstName: ["isEmpty"],
  lastName: ["isEmpty"],
  email: ["isEmpty", "isEmail"],
  queryType: ["hasQueryValue"],
  message: ["isEmpty", "isWithinRange"],
  consent: ["isChecked"],
}

export {
  validations,
  validationRules
}