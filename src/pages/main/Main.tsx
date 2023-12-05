import { useState, useEffect } from "react";

interface IMainProps {
    isLoggedIn: boolean;
}

const Main = () => {
    useEffect(() => {
        const fetchDate = async () => {
            const response = await fetch("http://localhost:3010");
            console.log(await response.text());
        };

        fetchDate();
    }, []);

    return <div className="main">Main</div>;
};

export default Main;
