import style from "./QueryOption.module.css";

function QueryOption({
  children,
  id,
  value,
  onChange,
  selectedOption,
  ...props
}) {
  const radioClassName = `${style.queryOption} ${selectedOption === value ? style.queryOptionChecked : ""}`;

  return (
    <li className={radioClassName}>
      <input
        value={value}
        onChange={onChange}
        className={style.queryInput}
        type="radio"
        id={id}
        name="queryType"
        {...props}
      />
      <label className={style.queryLabel} htmlFor={id}>
        {children}
      </label>
    </li>
  );
}

export default QueryOption;
