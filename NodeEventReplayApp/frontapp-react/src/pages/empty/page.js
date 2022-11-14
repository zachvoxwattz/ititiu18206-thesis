import { Link } from 'react-router-dom'
import '../../assets/css/emptypage.css'

const EmptyPage = () => {
    return(
        <div id = 'emptyPage'>
            <h1 id = 'emptyNoticeLabel'>There is nothing here...<br/>Try 2 links below</h1>
            <div id = 'linkHolder'>
                <Link className='redirectLink' to="/connect">/connect</Link>
                <span />thistextisinvisiblebutifyoutrytohighlightitthencongrats
                <Link className='redirectLink' to="/app">/app</Link>
            </div>
        </div>
    )
}

export default EmptyPage
