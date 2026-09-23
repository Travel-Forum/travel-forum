import { useState } from "react"
import AppNavbar from "../components/navbar/AppNavbar"
import ProfileContent from "../components/profile/ProfileContent"

const Profile = () => {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <>
      <AppNavbar onSectionClick={setActiveSection} />
      <ProfileContent activeSection={activeSection} />
    </>
  )
}

export default Profile