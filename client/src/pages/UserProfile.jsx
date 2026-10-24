import { useParams } from "react-router-dom"

const UserProfile = () => {

    const { username }  = useParams();

    return (
        <h1>{username}</h1>
    );
}

export default UserProfile