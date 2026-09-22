import ProfileSection from '../ProfileSection/ProfileSection';
import LocationsSection from '../../Locations/LocationsSection/LocationsSection';
import NotificationsSection from '../../Notifications/NotificationsSection/NotificationsSection';
import ProfileInfo from '../ProfileInfo/ProfileInfo';


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
            return <ProfileSection />
    }
}

export default ProfileContent