import style from "./Error.module.css";

function Error({ children, id, className }) {

  const errorClassName = `${style.formError} ${className || ""}`;

  return (
    <span className={errorClassName} id={id} aria-live="polite">{children}</span>
  )
}

export default Error;