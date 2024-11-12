import Drawer from '../components/drawer';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import SearchBar from '../components/searchbar';
import Link from 'next/link';
import '../styles/custom.css';
import Image from 'next/image';

const LandPage = () => {
  return (
    <div className="layout 
    flex flex-col h-screen justify-between
    bg-cover"
    style={{
      backgroundImage: "url(https://jornaldopeninha.com.br/wp-content/uploads/2022/03/goiania-e-a-cidade-brasileira-com-mais-registros-de-casos-de-dengue-em-2-22-768x490.png",
    }}
    >
      {/* <header><Navbar /></header>  */}
      <SearchBar/>
      {/* <drawer className="absolute"><Drawer /></drawer>  */}
      <main className = "Image" > 
        {/* { <Image
              className = "rounded-t-3xl"
              src = "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/fiocruz-imagensraquel-portugalerodrigo-mexas-2.jpg?w=1600&h=900"
              sizes="100vw"
              placeholde="blur"
              alt = "background image"  
              quality = {100}
              fill
              style = {{
                  objectFit: 'cover',
              }}
          /> } */}
        </main>
      <footer className=""><Footer /></footer>

    </div>

  );
};

export default LandPage;