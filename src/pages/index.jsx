import FooterComponent from "../components/base/Footer";
import HeaderComponent from "../components/base/HeaderComponent";
import Loader from "../components/base/Loader";
import Profile from "../components/base/Profile";

const HomePage = () => {
    return (
        <div>
            <HeaderComponent />
            <Loader />
            <Profile />
            <FooterComponent />
        </div>
    );
};

export default HomePage;
