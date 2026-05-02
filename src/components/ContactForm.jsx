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
import { validations } from "../utils";
import style from "./ContactForm.module.css";

function ContactForm() {

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

  const [hasSubmitAttempt, setHasSubmitAttempt] = useState(false);

  function handleChange(e) {

    if (e.target.type === "checkbox") {
      setFormData(prev => {
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
      return {
        ...prev,
        [e.target.name]: {
          ...[e.target.name],
          value: e.target.value,
        }
      }
    });

  };

  function handleSubmit(e) {
    e.preventDefault();

    setHasSubmitAttempt(true);

    const { firstName, lastName, email, queryType, message, consent } = formData;

    const nameValidations = ["isEmpty"];
    const emailValidations = ["isEmpty", "isEmail"];
    const queryTypeValidations = ["hasQueryValue"];
    const messageValidations = ["isEmpty", "isWithinRange"];
    const consentValidations = ["isChecked"];

    const firstNameCheck = validateField(firstName, nameValidations);
    const lastNameCheck = validateField(lastName, nameValidations);
    const emailCheck = validateField(email, emailValidations);
    const queryTypeCheck = validateField(queryType, queryTypeValidations);
    const messageCheck = validateField(message, messageValidations);
    const consentCheck = validateField(consent, consentValidations);

  }

  function validateField(value, validations) {



  }

  return (
    <form className={style.form} aria-labelledby="form-title" onSubmit={handleSubmit}>
      <h2 id="form-title" className={style.formTitle}>Contact Us</h2>
      <div className={style.formControls}>
        <div className={style.formFields}>
          <FormGroup className={style.firstName}>
            <Label isRequired={true} htmlFor="first-name">First Name</Label>
            <TextInput value={formData.firstName.value} onChange={handleChange} type="text" id="first-name" name="firstName" isRequired={false} isError={false} autoComplete="given-name" aria-describedby="first-name-error" />
            <Error id="first-name-error">{formData.firstName.errorMessage}</Error>
          </FormGroup>
          <FormGroup className={style.lastName}>
            <Label isRequired={true} htmlFor="last-name">Last Name</Label>
            <TextInput value={formData.lastName.value} onChange={handleChange} type="text" id="last-name" name="lastName" isRequired={false} isError={false} autoComplete="family-name" aria-describedby="last-name-error" />
            <Error id="last-name-error">{formData.lastName.errorMessage}</Error>
          </FormGroup>
          <FormGroup className={style.email}>
            <Label isRequired={true} htmlFor="email">Email Address</Label>
            <TextInput value={formData.email.value} onChange={handleChange} type="email" id="email" name="email" isRequired={false} isError={false} autoComplete="email" aria-describedby="email-error" />
            <Error id="email-error">{formData.email.errorMessage}</Error>
          </FormGroup>
          <fieldset className={style.formFieldset}>
            <Legend isRequired={true}>Query Type</Legend>
            <ul className={style.queryOptions} role="list">
              <QueryOption selectedOption={formData.queryType.value} onChange={handleChange} id="general-inquiry" value="general-inquiry" aria-describedby="query-error" required={true}>General Inquiry</QueryOption>
              <QueryOption selectedOption={formData.queryType.value} onChange={handleChange} id="support-request" value="support-request" aria-describedby="query-error">Support Request</QueryOption>
            </ul>
            <Error id="query-error" className={style.queryError}>{formData.queryType.errorMessage}</Error>
          </fieldset>
          <FormGroup className={style.email}>
            <Label isRequired={true} htmlFor="message">Message</Label>
            <TextArea value={formData.message.value} onChange={handleChange} id="message" name="message" isRequired={true} isError={false} aria-describedby="message-error" rows={4} />
            <Error id="message-error">{formData.message.errorMessage}</Error>
          </FormGroup>
        </div>
        <ConsentField isChecked={formData.consent.value} onChange={handleChange} errorMessage={formData.message.errorMessage} />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )

}

export default ContactForm;