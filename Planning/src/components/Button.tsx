import { Button } from "antd";
import "./Button.scss";
import { useEffect, useState } from "react";
import { useGetCountMailQuery } from "../store/mailApi/mailApi";
const ButtonMail = () => {
  const [countEmails, setCountEmails] = useState(0);
  const { data, refetch } = useGetCountMailQuery();
  useEffect(() => {
    const fetchMail = async () => {
      try {
        await refetch();
        if (data && "count" in data) {
          const mails = data.count;
          if (mails > 100) {
            setCountEmails(99);
          }
          setCountEmails(mails);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMail();

    const intervalId = setInterval(() => {
      fetchMail();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [data, refetch]);

  const redirectYandexPost = () => {
    const redirectUrl = "https://mail.yandex.ru";
    window.open(redirectUrl);
  };
  return (
    <div className="content-container">
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
    </div>
  );
};
export default ButtonMail;
