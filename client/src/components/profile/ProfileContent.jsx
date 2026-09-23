import Feed from '../feed/Feed';
import LocationsSection from '../locations/LocationsSection';
import NotificationsSection from '../notifications/NotificationsSection';
import ProfileInfo from './ProfileInfo';


const ProfileContent = ({ activeSection} ) => {

    switch (activeSection) {
        case 'locations':
            return <LocationsSection />;
        
        case 'notifications':
            return <NotificationsSection />;

        case 'profileInfo':
            return <ProfileInfo />;

        case 'overview':
        default:
            return <Feed />
    }
}

export default ProfileContent