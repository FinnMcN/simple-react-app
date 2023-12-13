import "./loginError.scss";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ILoginError {
    closeErrorWindow: () => void;
}

const LoginError = ({ closeErrorWindow }: ILoginError) => {
    return (
        <div className="error-window">
            <div className="error-window-text">Incorrect username or password</div>
            <FontAwesomeIcon
                onClick={closeErrorWindow}
                className="error-window-icon"
                icon={regular("circle-xmark")}
                style={{ color: "#d12020" }}
            />
        </div>
    );
};

export default LoginError;
