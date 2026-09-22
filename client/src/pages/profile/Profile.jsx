import { useState } from "react"
import Navbar from "../../components/Navbar/Navbar.jsx"
import ProfileContent from "../../components/Profile/ProfileContent/ProfileContent.jsx"

const Profile = () => {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <>
      <Navbar onSectionClick={setActiveSection} />
      <ProfileContent activeSection={activeSection} />
    </>
  )
}

export default Profile