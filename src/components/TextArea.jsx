import style from "./TextArea.module.css"

function TextArea({ id, name, isRequired, isError, value, onChange, ...props }) {

  const messageClassName = `${style.textArea} ${isError ? style.textAreaError : ""}`

  return (
    <textarea
      className={messageClassName} 
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      required={isRequired}
      {...props}
    >
      
    </textarea>
  )
}

export default TextArea;