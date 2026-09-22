import ProfileSection from '../ProfileSection/ProfileSection';
import LocationsSection from '../../Locations/LocationsSection/LocationsSection'
import NotificationsSection from '../../Notifications/NotificationsSection/NotificationsSection'


const ProfileContent = ({ activeSection} ) => {

    switch (activeSection) {
        case 'locations':
            return <LocationsSection />;
        
        case 'notifications':
            return <NotificationsSection />;

        case 'overview':
        default:
            return <ProfileSection />
    }
}

export default ProfileContent