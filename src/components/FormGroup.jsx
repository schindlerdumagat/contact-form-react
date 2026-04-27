import style from "./FormGroup.module.css";

function FormGroup({ children, className }) {

  const groupClassName = `${className} ${style.formGroup}`;

  return (
    <div className={groupClassName}>
      {children}
    </div>
  )

}

export default FormGroup;