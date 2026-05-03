import style from "./TextArea.module.css";

function TextArea({
  id,
  name,
  isRequired,
  isError = false,
  minLength = 15,
  value,
  onChange,
  ...props
}) {
  const messageClassName = `${style.textArea} ${isError ? style.textAreaError : ""}`;

  return (
    <textarea
      className={messageClassName}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      required={isRequired}
      minLength={minLength}
      aria-invalid={isError}
      {...props}
    ></textarea>
  );
}

export default TextArea;
