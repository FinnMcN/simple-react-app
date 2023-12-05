import { Link } from "react-router-dom";
import { IHeaderProps } from "../../interfaces/interfaces";
import logo from "../../images/DressLikeMe.png";
import ProfileButton from "../ProfileButton/ProfileButton";
import "./styles.scss";

const Header = ({ isLoggedIn, username, avatar, setIsLogin }: IHeaderProps) => {
    const ProfileClick = () => {
        return isLoggedIn ? "profile" : "login";
    };

    return (
        <div className="header">
            <Link to="./" className="page-name">
                <img className="logo" src={logo} alt="JPG" />
            </Link>
            <div className="links">
                <Link to="news" className="link">
                    News
                </Link>
                {isLoggedIn ? (
                    <ProfileButton username={username} avatar={avatar} setIsLogin={setIsLogin} />
                ) : (
                    <Link to={ProfileClick()} className="link">
                        Profile
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
