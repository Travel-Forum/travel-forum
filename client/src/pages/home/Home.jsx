import { Link } from "react-router-dom";
import Navigation from '../../components/Navigation/Navigation';

const Home = () => {

    return (
        <>
          <Navigation />
        <div>
            <h1>Home</h1>

            <Link to="/signin">Sign In</Link>

            <br />

            <Link to="/signup">Sign Up</Link>
        </div>
        </>
    )
}

export default Home