import FormGroup from "./FormGroup";
import Label from "./Label";
import Error from "./Error";
import style from "./ConsentField.module.css";

function ConsentField({ isChecked, onChange, errorMessage, isError, ...props }) {

  return (
    <FormGroup>
      <div className={style.consentContainer}>
        <input className={style.consentCheckbox} type="checkbox" id="consent" name="consent" checked={isChecked} onChange={onChange} aria-invalid={isError} aria-describedby="consent-error" {...props} />
        <Label htmlFor="consent" isRequired={true}>I consent to being contacted by the team</Label>
      </div>
      {errorMessage && <Error id="consent-error">{errorMessage}</Error>}
    </FormGroup>
  )
}

export default ConsentField;