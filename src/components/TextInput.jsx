import style from "./TextInput.module.css";

function TextInput({
  type = "text",
  id,
  name,
  value,
  onChange,
  autoComplete,
  isRequired,
  isError = false,
  ...props
}) {
  const inputClassName = `${style.formInput} ${isError ? style.formInputError : ""}`;

  return (
    <input 
      className={inputClassName} 
      type={type}
      id={id}
      name={name}
      autoComplete={autoComplete}
      required={isRequired}
      value={value}
      onChange={onChange}
      aria-invalid={isError}
      { ...props }
    />
  )
}

export default TextInput;
