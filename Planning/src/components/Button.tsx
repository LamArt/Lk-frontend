import { Button } from "antd";
import "./Button.scss";
import { useEffect, useState } from "react";
import { useGetCountMailMutation } from "../store/mailApi/mailApi";
const ButtonMail = () => {
  const [countEmails, setCountEmails] = useState(6);
  const [mutate, { data }] = useGetCountMailMutation();
  console.log(data);
  const fetchData = async () => {
    try {
      try {
        const response = await mutate({
          /* Передайте здесь параметры, если необходимо */
        });
        // Assuming your response has a property 'count'
        if ("data" in response) {
          // Assuming your response has a property 'count'
          setCountEmails(response.data.count);
        } else {
          console.error("No data property in the response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      // Assuming your response has a property 'count'
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const redirectYandexPost = () => {
    const redirectUrl = "https://mail.yandex.ru";
    window.open(redirectUrl);
  };
  return (
    <Button
      type="primary"
      disabled={countEmails > 0 ? false : true}
      className="mail"
      onClick={fetchData}
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
