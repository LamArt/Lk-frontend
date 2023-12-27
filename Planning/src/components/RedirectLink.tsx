import './RedirectLink.scss'
const RedirectLink = ({serviceUrl, pathImg, title} : {serviceUrl: string, pathImg: string, title: string}) => {
    const redirectPost = () => {
        window.open(serviceUrl);
    };
    return (
            <a 
            onClick = {redirectPost} 
            target="_blank">
                <img src = {pathImg}></img> 
                <p className='calendarLabel'>{title}</p>
            </a>
    );
};

export { RedirectLink };

