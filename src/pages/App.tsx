import { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./main/Main";
import News from "./news/News";
import Profile from "./profile/Profile";
import Login from "./login/Login";
import Header from "../components/Header/Header";

const App = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
        const userInfo = getUserFromLS();
        if (userInfo) {
            setIsLogin(userInfo.isLoggedIn);
            setUsername(userInfo.user);
            setAvatar(userInfo.avatar);
        }
    }, []);

    //TO DO: put "currentUser" into a variable
    const getUserFromLS = () => {
        const loggedUser = localStorage.getItem("currentUser");
        if (loggedUser) {
            const userInfo = JSON.parse(localStorage.getItem("currentUser")!);
            return userInfo;
        }
    };

    const logFunc = (login: string, avatar: string) => {
        setIsLogin(true);
        setUsername(login);
        setAvatar(avatar);
    };

    //что?
    return (
        <BrowserRouter>
            <Header
                isLoggedIn={isLogin}
                username={username}
                avatar={avatar}
                setIsLogin={setIsLogin}
            />
            <Routes>
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/" element={<Main />} />
                <Route path="/news" element={<News />} />
                <Route path="/profile" element={<Profile username={username} />} />
                <Route
                    path="/login"
                    element={<Login setUserData={(login, avatar) => logFunc(login, avatar)} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
