export interface IUserData {
    login: string;
    password: string;
    avatar: string;
}

export interface IUserDataInLS extends IUserData {
    isLoggedIn: boolean;
}

export interface IHeaderProps {
    isLoggedIn: boolean;
    username: string | null;
    avatar: string | null;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
