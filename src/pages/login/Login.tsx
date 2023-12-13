import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginError from "../../components/LoginError/LoginError";
import { IUserData, IUserDataInLS } from "../../interfaces/interfaces";
import "./login.scss";

const Login = ({ setUserData }: { setUserData: (login: string, avatar: string) => void }) => {
    //form ref elements
    const login = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const submit = useRef<HTMLButtonElement | null>(null);

    //state for LoginError showing
    const [incorrectUserData, setIncorrectUserData] = useState<boolean>(false);

    //navigation
    const navigate = useNavigate();

    const checkUserData = async () => {
        try {
            const inputData = {
                user: login.current?.value!,
                password: password.current?.value!,
            };
            const response = await fetch("http://localhost:3010/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(inputData),
            });
        } catch (error) {
            console.error(`Couldn't fetch users data. Error logs:${error}`);
        }
    };

    const fetchUsersData = async (): Promise<IUserData[] | undefined> => {
        try {
            const response = await fetch("http://localhost:3010/users");
            const data = response.json();

            return data;
        } catch (error) {
            console.error(`Couldn't fetch users data. Error logs:${error}`);
        }
    };

    //TO DO: validate input data
    const checkInputData = async () => {
        const userData = await fetchUsersData();
        let isValidUserData = false;

        if (userData) {
            userData.forEach((user: IUserData) => {
                const loginInput = login.current?.value!;
                const passwordInput = password.current?.value!;

                if (user.login === loginInput && user.password === passwordInput) {
                    putUserDataInLS(user);
                    isValidUserData = true;
                }
            });
        }

        return isValidUserData;
    };

    const redirectToProfie = async () => {
        const isValidUserData = await checkInputData();
        if (isValidUserData) {
            const userData = localStorage.getItem("currentUser");
            const userLogin = JSON.parse(userData!).user;
            const userAvatar = JSON.parse(userData!).avatar;

            console.log(userLogin, userAvatar);

            setUserData(userLogin, userAvatar);
            navigate("/Profile");

            //simulate profile loading
            //TO DO: make loading screen
            /* setTimeout(() => {
                setUserData(userLogin, userAvatar);
                navigate("/Profile");
            }, 2000); */
        } else {
            setIncorrectUserData(true);
        }
    };

    const putUserDataInLS = (user: IUserData) => {
        const userData = JSON.stringify({
            user: user.login,
            password: user.password,
            avatar: user.avatar,
            isLoggedIn: true,
        });
        localStorage.setItem("currentUser", userData);
    };

    const submitOnClick = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        redirectToProfie();
    };

    return (
        <div className="login">
            {incorrectUserData ? (
                <LoginError closeErrorWindow={() => setIncorrectUserData(false)} />
            ) : null}
            <form className="login-form">
                <div className="input-block">
                    <label className="input-name" htmlFor="login">
                        Username
                    </label>
                    <input
                        className="input"
                        type="text"
                        id="login"
                        autoComplete="off"
                        ref={login}
                    />
                </div>
                <div className="input-block">
                    <label className="input-name" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="input"
                        type="text"
                        id="password"
                        autoComplete="off"
                        ref={password}
                    />
                </div>
                <button className="btn" ref={submit} onClick={submitOnClick}>
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default Login;
