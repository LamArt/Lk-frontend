import { Button } from "antd";
import "./Button.scss";
import { useGetAllPostsQuery } from "../store/testApi";
import { useEffect, useState } from "react";

const ButtonMail = () => {
  const { data } = useGetAllPostsQuery({});
  const [countEmails, setCountEmails] = useState(6);
  console.log(data);
  const redirectYandexPost = () => {
    const redirectUrl = "https://mail.yandex.ru";
    window.location.href = redirectUrl;
  };
  return (
    <Button
      type="primary"
      disabled={countEmails > 0 ? false : true}
      className="mail"
      onClick={redirectYandexPost}
    >
      <div className="mail-container">
        <div className="mail-img__container">
          <img
            className="mail-container__img"
            src="/icons/yaMail.svg"
            alt="yandexMail"
          />
          <div className={countEmails > 0 ? "mail-active" : ""}></div>
        </div>
        {countEmails > 0 ? (
          <>
            <div>Непрочитанные сообщения</div>
            <span>{countEmails}</span>
          </>
        ) : (
          <div>Все письма прочитаны</div>
        )}
      </div>
    </Button>
  );
};
export default ButtonMail;
