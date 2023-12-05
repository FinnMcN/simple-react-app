import "./styles.scss";

interface IProfileProps {
    username: string | null;
}

const Profile = ({ username }: IProfileProps) => {
    return <div>{username}</div>;
};

export default Profile;
