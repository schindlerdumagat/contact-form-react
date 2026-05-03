import style from "./SuccessMessage.module.css";

function SuccessMessage() {

  return (
    <div className={style.messageContainer} id="success-message" aria-live="polite">
      <div className={style.messageTitleContainer}>
        <img src="/images/icon-success-check.svg" alt="" width={20} height={20} />
        <h2 className={style.messageTitle}>Message Sent!</h2>
      </div>
      <p className={style.messageDescription}>Thanks for completing the form. We’ll be in touch soon!</p>
    </div>
  )
}

export default SuccessMessage;