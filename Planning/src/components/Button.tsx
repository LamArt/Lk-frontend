import { Button } from "antd";
import "./Button.scss";

const ButtonMail = () => {
  const redirectYandexPost = () => {
    const redirectUrl = "https://mail.yand.ru";
    window.location.href = redirectUrl;
  };
  return (
    <Button
      type="primary"
      disabled={false}
      className="mail"
      onClick={redirectYandexPost}
    >
      <div className="mail-container">
        <img
          src="/icons/yaMail.svg"
          style={{
            width: "20px",
            marginRight: "8px",
          }}
        ></img>
        Непрочитанные сообщения
      </div>
    </Button>
  );
};
export default ButtonMail;
