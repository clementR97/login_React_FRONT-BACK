import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import NavBar from './ComponentAccueil/Navbar.jsx';
import Hero from './ComponentAccueil/Hero.jsx';
import Footer from './ComponentAccueil/Footer.jsx';
const Accueil = ()=>{
 return(
    <>
    <CssBaseline enableColorScheme />
    <NavBar/>
    <Hero/>
    <Footer/>
    </>
 )
}
export default Accueil