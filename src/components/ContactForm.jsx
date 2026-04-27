import { useState } from "react";

import FormGroup from "./FormGroup";
import Label from "./Label";
import TextInput from "./TextInput";
import Error from "./Error";
import Legend from "./Legend";
import QueryOption from "./QueryOption";
import TextArea from "./TextArea";
import style from "./ContactForm.module.css";

function ContactForm() {

  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <form className={style.form} aria-labelledby="form-title">
      <h2 id="form-title" className={style.formTitle}>Contact Us</h2>
      <div className={style.formControls}>
        <FormGroup className={style.firstName}>
          <Label isRequired={true} htmlFor="first-name">First Name</Label>
          <TextInput type="text" id="first-name" name="firstName" isRequired={false} isError={false} autoComplete="given-name" aria-describedby="first-name-error" />
          <Error id="first-name-error">This field is required</Error>
        </FormGroup>
        <FormGroup className={style.lastName}>
          <Label isRequired={true} htmlFor="last-name">Last Name</Label>
          <TextInput type="text" id="last-name" name="lastName" isRequired={false} isError={false} autoComplete="family-name" aria-describedby="last-name-error" />
          <Error id="last-name-error">This field is required</Error>
        </FormGroup>
        <FormGroup className={style.email}>
          <Label isRequired={true} htmlFor="email">Email Address</Label>
          <TextInput type="email" id="email" name="email" isRequired={false} isError={false} autoComplete="email" aria-describedby="email-error" />
          <Error id="email-error">This field is required</Error>
        </FormGroup>
        <fieldset className={style.formFieldset}>
          <Legend isRequired={true}>Query Type</Legend>
          <ul className={style.queryOptions} role="list">
            <QueryOption selectedOption={query} onChange={handleChange} id="general-inquiry" value="general-inquiry" aria-describedby="query-error" required={true}>General Inquiry</QueryOption>
            <QueryOption selectedOption={query} onChange={handleChange} id="support-request" value="support-request" aria-describedby="query-error">Support Request</QueryOption>
          </ul>
          <Error id="query-error" className={style.queryError}>Please select a query type</Error>
        </fieldset>
        <FormGroup className={style.email}>
          <Label isRequired={true} htmlFor="message">Message</Label>
          <TextArea id="message" name="message" isRequired={true} isError={false} aria-describedby="message-error" rows={4} />
          <Error id="message-error">This field is required</Error>
        </FormGroup>
      </div>
    </form>
  )

}

export default ContactForm;