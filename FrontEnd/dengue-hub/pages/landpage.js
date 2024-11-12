import Drawer from '../components/drawer';
import Navbar from '../components/navbar';
import Link from 'next/link';
import '../styles/custom.css';
import Image from 'next/image';

const LandPage = () => {
  return (
    <div className="layout relative min-h-screen">

      <Image
      
            className = "w-full h-full  rounded-t-3xl"
            src = "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/fiocruz-imagensraquel-portugalerodrigo-mexas-2.jpg?w=1600&h=900"
            sizes="100vw"
            placeholde="blur"
            alt = "background image"  
            quality = {100}
            fill
            style = {{
                objectFit: 'cover',
            }}
        />
        <Navbar /> 
        <Drawer /> 
        
    </div>

  );
};

export default LandPage;