import style from "./Legend.module.css";

function Legend({ children, isRequired }) {

  return (
    <legend className={style.legend}>
      {children}
      {isRequired && <span className={style.required}>*</span>}
    </legend>
  )

}

export default Legend;