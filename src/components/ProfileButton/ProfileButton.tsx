import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./profileButton.scss";

interface IProfileButton {
    username: string | null;
    //fix type
    avatar: any;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileButton = ({ username, avatar, setIsLogin }: IProfileButton) => {
    const profileButton = useRef<HTMLDivElement | null>(null);
    const profileOptions = useRef<HTMLDivElement | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [currentTheme, setCurrentTheme] = useState();
    const currentDropdownState = useRef<boolean>(false);
    const activeBtnClass = "profile_options" + " " + "shown";

    useEffect(() => {
        currentDropdownState.current = isActive;
    }, [isActive]);

    useEffect(() => {
        //this function will always run when clicking outside of element
        //because i don't know how to get access to prev value outside of setState callback
        //FIXED BY ADDING CURRENT(PREV) STATE INTO useRef HOOK
        const hideHeaderOptions = (e: any) => {
            if (
                currentDropdownState.current &&
                profileButton.current &&
                profileOptions.current &&
                !profileButton.current.contains(e.target) &&
                !profileOptions.current.contains(e.target)
            ) {
                setIsActive(false);
            }
        };

        window.addEventListener("click", hideHeaderOptions);
        return () => {
            window.removeEventListener("click", hideHeaderOptions);
        };
    }, []);

    const toggleProfileOptions = () => {
        setIsActive((prev) => !prev);
    };

    const logOut = () => {
        localStorage.clear();
        setIsLogin(false);
    };

    return (
        <div>
            <div ref={profileButton} className="profile_button" onClick={toggleProfileOptions}>
                <img className="profile_img" src={avatar} alt="png" />
                <FontAwesomeIcon icon={solid("caret-down")} className="profile_button-icon" />
            </div>
            <div ref={profileOptions} className={isActive ? activeBtnClass : "profile_options"}>
                <Link to={"/profile"} className="profile_option profile_link">
                    <img className="profile_img" src={avatar} alt="image" />
                    <div>{username}</div>
                </Link>
                <div className="profile_option theme_link">Тема: {currentTheme}</div>
                <div className="profile_option logout_link" onClick={logOut}>
                    Выйти
                </div>
            </div>
        </div>
    );
};

export default ProfileButton;
