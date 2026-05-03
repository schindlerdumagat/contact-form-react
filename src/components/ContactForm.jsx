import { useState } from "react";
import FormGroup from "./FormGroup";
import Label from "./Label";
import TextInput from "./TextInput";
import Error from "./Error";
import Legend from "./Legend";
import QueryOption from "./QueryOption";
import TextArea from "./TextArea";
import ConsentField from "./ConsentField";
import Button from "./Button";
import { validations, validationRules } from "../utils";
import style from "./ContactForm.module.css";

const INITIAL_FORM_DATA = {
  firstName: {
    value: "",
    errorMessage: "",
  },
  lastName: {
    value: "",
    errorMessage: "",
  },
  email: {
    value: "",
    errorMessage: "",
  },
  queryType: {
    value: "",
    errorMessage: "",
  },
  message: {
    value: "",
    errorMessage: "",
  },
  consent: {
    value: false,
    errorMessage: "",
  },
}

const INITIAL_FORM_STATE = {
    hasSubmitAttempt: false,
    hasFormError: false
  }

function ContactForm({ onSuccess }) {

  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  function handleChange(e) {

    const newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const inputName = e.target.name;
    setFormData(prev => {

      const errorMessage = formState.hasSubmitAttempt ? 
        validateField(newValue, validationRules[inputName]) 
        : 
        prev[inputName].errorMessage;

      return {
        ...prev,
        [inputName]: {
          ...prev[inputName],
          errorMessage,
          value: newValue,
        }
      }
    })

  };
  
  function handleSubmit(e) {
    e.preventDefault();
    
    let hasError = false;

    const newFormData = {};

    for (const field in formData) {
      const fieldValue = formData[field].value;
      const errorMessage = validateField(fieldValue, validationRules[field]);
      if (errorMessage) {
        hasError = true;
      }
      newFormData[field] = {
        value: fieldValue,
        errorMessage: errorMessage
      }
    }

    if(!hasError) {
      onSuccess();
      resetForm();
    } else {
      setFormData(newFormData);
      setFormState(prev => ({
        ...prev,
        hasFormError: hasError,
        hasSubmitAttempt: true
      }))
    }

  }

  function resetForm() {
    setFormData(INITIAL_FORM_DATA);
    setFormState(INITIAL_FORM_STATE)
  }

  function validateField(value, validationRules) {
    let errorMessage = "";
    for(const rule of validationRules) {

      const validationResult = validations[rule](value);
      if (validationResult) {
        errorMessage = validationResult;
        break;
      }
    }

    return errorMessage;
  }

  let isFirstNameError = false;
  let isLastNameError = false;
  let isEmailError = false;
  let isQueryTypeError = false;
  let isMessageError = false;
  let isConsentError = false;

  if (formState.hasSubmitAttempt) {
    isFirstNameError = !!formData.firstName.errorMessage;
    isLastNameError = !!formData.lastName.errorMessage;
    isEmailError = !!formData.email.errorMessage;
    isQueryTypeError = !!formData.queryType.errorMessage;
    isMessageError = !!formData.message.errorMessage;
    isConsentError = !!formData.consent.errorMessage;
  }

  return (
    <form className={style.form} aria-labelledby="form-title" onSubmit={handleSubmit} noValidate={true} aria-describedby="success-message">
      <h2 id="form-title" className={style.formTitle}>Contact Us</h2>
      <div className={style.formControls}>
        <div className={style.formFields}>
          <FormGroup className={style.firstName}>
            <Label isRequired={true} htmlFor="first-name">First Name</Label>
            <TextInput isError={isFirstNameError} value={formData.firstName.value} onChange={handleChange} type="text" id="first-name" name="firstName" isRequired={false} autoComplete="given-name" aria-describedby="first-name-error" />
            {isFirstNameError && <Error id="first-name-error">{formData.firstName.errorMessage}</Error>}
          </FormGroup>
          <FormGroup className={style.lastName}>
            <Label isRequired={true} htmlFor="last-name">Last Name</Label>
            <TextInput isError={isLastNameError} value={formData.lastName.value} onChange={handleChange} type="text" id="last-name" name="lastName" isRequired={false} autoComplete="family-name" aria-describedby="last-name-error" />
            {isLastNameError && <Error id="last-name-error">{formData.lastName.errorMessage}</Error>}
          </FormGroup>
          <FormGroup className={style.email}>
            <Label isRequired={true} htmlFor="email">Email Address</Label>
            <TextInput isError={isEmailError} value={formData.email.value} onChange={handleChange} type="email" id="email" name="email" isRequired={false} autoComplete="email" aria-describedby="email-error" />
            {isEmailError && <Error id="email-error">{formData.email.errorMessage}</Error>}
          </FormGroup>
          <fieldset className={style.formFieldset}>
            <Legend isRequired={true}>Query Type</Legend>
            <ul className={style.queryOptions} role="list">
              <QueryOption isError={isQueryTypeError} selectedOption={formData.queryType.value} onChange={handleChange} id="general-inquiry" value="general-inquiry" aria-describedby="query-error" required={true}>General Inquiry</QueryOption>
              <QueryOption isError={isQueryTypeError} selectedOption={formData.queryType.value} onChange={handleChange} id="support-request" value="support-request" aria-describedby="query-error">Support Request</QueryOption>
            </ul>
            {isQueryTypeError && <Error id="query-error" className={style.queryError}>{formData.queryType.errorMessage}</Error>}
          </fieldset>
          <FormGroup className={style.email}>
            <Label isRequired={true} htmlFor="message">Message</Label>
            <TextArea isError={isMessageError} value={formData.message.value} onChange={handleChange} id="message" name="message" isRequired={true} aria-describedby="message-error" rows={4} />
            {isMessageError && <Error id="message-error">{formData.message.errorMessage}</Error>}
          </FormGroup>
        </div>
        <ConsentField isError={isConsentError} isChecked={formData.consent.value} onChange={handleChange} errorMessage={formData.consent.errorMessage} />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )

}

export default ContactForm;