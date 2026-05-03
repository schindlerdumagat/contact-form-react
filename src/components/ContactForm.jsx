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

function ContactForm({ onSuccess }) {

  const [formState, setFormState] = useState({
    hasSubmitAttempt: false,
    hasFormError: false
  })

  const [formData, setFormData] = useState({
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
  });

  function handleChange(e) {

    if (e.target.type === "checkbox") {
      setFormData(prev => {

        if(formState.hasSubmitAttempt) {
          const errorMessage = validateField(e.target.checked, validationRules[e.target.name]);
          updateErrorMessage(errorMessage, e.target.name);
        }

        return {
          ...prev,
          consent: {
            ...prev.consent,
            value: e.target.checked
          }
        }
      });
      return;
    }

    setFormData(prev => {

      if(formState.hasSubmitAttempt) {
        const errorMessage = validateField(e.target.value, validationRules[e.target.name]);
        updateErrorMessage(errorMessage, e.target.name);
      }

      return {
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name],
          value: e.target.value,
        }
      }
    });

  };
  
  function handleSubmit(e) {
    e.preventDefault();
    
    let hasError = false;

    for (const field in formData) {
      const { value } = formData[field];
      const errorMessage = validateField(value, validationRules[field]);
      if (errorMessage) {
        hasError = true;
      }
      updateErrorMessage(errorMessage, field);
    }

    if(!hasError) {
      onSuccess();
      setFormState(prev => ({
        ...prev,
        hasFormError: false,
        hasSubmitAttempt: false
      }))
    } else {
      setFormState(prev => ({
        ...prev,
        hasFormError: hasError,
        hasSubmitAttempt: true
      }))
    }

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

  function updateErrorMessage(error, field) {

    setFormData(prev => {
      return {
        ...prev, 
        [field]: {
          ...prev[field],
          errorMessage: error
        }
      }
    })

  }

  return (
    <form className={style.form} aria-labelledby="form-title" onSubmit={handleSubmit} noValidate={true} aria-describedby="success-message">
      <h2 id="form-title" className={style.formTitle}>Contact Us</h2>
      <div className={style.formControls}>
        <div className={style.formFields}>
          <FormGroup className={style.firstName}>
            <Label isRequired={true} htmlFor="first-name">First Name</Label>
            <TextInput isError={formState.hasSubmitAttempt && !!formData.firstName.errorMessage} value={formData.firstName.value} onChange={handleChange} type="text" id="first-name" name="firstName" isRequired={false} autoComplete="given-name" aria-describedby="first-name-error" />
            {formData.firstName.errorMessage && <Error id="first-name-error">{formData.firstName.errorMessage}</Error>}
          </FormGroup>
          <FormGroup className={style.lastName}>
            <Label isRequired={true} htmlFor="last-name">Last Name</Label>
            <TextInput isError={formState.hasSubmitAttempt && !!formData.lastName.errorMessage} value={formData.lastName.value} onChange={handleChange} type="text" id="last-name" name="lastName" isRequired={false} autoComplete="family-name" aria-describedby="last-name-error" />
            {formData.lastName.errorMessage && <Error id="last-name-error">{formData.lastName.errorMessage}</Error>}
          </FormGroup>
          <FormGroup className={style.email}>
            <Label isRequired={true} htmlFor="email">Email Address</Label>
            <TextInput isError={formState.hasSubmitAttempt && !!formData.email.errorMessage} value={formData.email.value} onChange={handleChange} type="email" id="email" name="email" isRequired={false} autoComplete="email" aria-describedby="email-error" />
            {formData.email.errorMessage && <Error id="email-error">{formData.email.errorMessage}</Error>}
          </FormGroup>
          <fieldset className={style.formFieldset}>
            <Legend isRequired={true}>Query Type</Legend>
            <ul className={style.queryOptions} role="list">
              <QueryOption isError={formState.hasSubmitAttempt && !!formData.queryType.errorMessage} selectedOption={formData.queryType.value} onChange={handleChange} id="general-inquiry" value="general-inquiry" aria-describedby="query-error" required={true}>General Inquiry</QueryOption>
              <QueryOption isError={formState.hasSubmitAttempt && !!formData.queryType.errorMessage} selectedOption={formData.queryType.value} onChange={handleChange} id="support-request" value="support-request" aria-describedby="query-error">Support Request</QueryOption>
            </ul>
            {formData.queryType.errorMessage && <Error id="query-error" className={style.queryError}>{formData.queryType.errorMessage}</Error>}
          </fieldset>
          <FormGroup className={style.email}>
            <Label isRequired={true} htmlFor="message">Message</Label>
            <TextArea isError={formState.hasSubmitAttempt && !!formData.message.errorMessage} value={formData.message.value} onChange={handleChange} id="message" name="message" isRequired={true} aria-describedby="message-error" rows={4} />
            {formData.message.errorMessage && <Error id="message-error">{formData.message.errorMessage}</Error>}
          </FormGroup>
        </div>
        <ConsentField isError={formState.hasSubmitAttempt && !!formData.consent.errorMessage} isChecked={formData.consent.value} onChange={handleChange} errorMessage={formData.consent.errorMessage} />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )

}

export default ContactForm;