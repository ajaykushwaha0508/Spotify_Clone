import {Link} from "react-router-dom";
const TextWithHover = ({displayText , active ,targetLink}) =>{
    return (
        <Link to={targetLink}>
        <div className=" flex items-center cursor-pointer">
            <div className={`${active?"text-white" : "text-gray-400" } text-sm font-semibold hover:text-white`}>
                    {displayText}
            </div>
        </div>
        </Link>
    )
}

export default TextWithHover;