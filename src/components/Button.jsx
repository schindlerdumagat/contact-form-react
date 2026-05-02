import style from "./Button.module.css";

function Button({ type = "button", children }) {

  return (
    <button className={style.btn} type={type}>{children}</button>
  )

}

export default Button;