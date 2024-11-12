import Drawer from '../components/drawer';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import SearchBar from '../components/searchbar';
import Link from 'next/link';
import '../styles/global.css';
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

        <a className="btn h-20 w-48 text-2xl text-white border-4 absolute right-20 top-20 rounded-full"
                href='/login'>
          Login
          <img src="/user-icon-white.svg" alt="Icone Login" width={30} className="" />
        </a>

        <div className="flex-1 p-16">
          <a  href='/'
              className="btn btn-ghost text-6xl font-bold">
              <h5>DENGUE <br></br>HUB</h5>
              <img src="/logo-mosquito.svg" alt="Logo" width={130} className="mr-1" />
          </a>
        </div>

      <div className="p-10 relative"><SearchBar/></div>
      {/* <header><Navbar /></header>  */}
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