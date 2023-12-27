import './RedirectLink.scss'
const RedirectLink = ({serviceUrl, pathImg, title} : {serviceUrl: string, pathImg: string, title: string}) => {
    const redirectPost = () => {
        window.open(serviceUrl);
    };
    return (
        <div className='calendarLink'>
            <a 
            onClick = {redirectPost} 
            target="_blank"> 
                <img src = {pathImg}></img> 
                <p className='calendarLabel'>{title}</p>
            </a>
        </div>
    );
};

export { RedirectLink };

