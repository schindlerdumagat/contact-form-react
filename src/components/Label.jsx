import style from "./Label.module.css";

function Label({ children, isRequired = false, htmlFor }) {
  
  return (
    <label className={style.label} htmlFor={htmlFor}>
      {children}
      {isRequired && <span className={style.required}>*</span>}
    </label>
  )

}

export default Label;