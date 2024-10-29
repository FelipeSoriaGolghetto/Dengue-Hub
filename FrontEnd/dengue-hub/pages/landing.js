import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-green-200 flex flex-col items-center p-4">
      <header className="flex justify-between items-center w-full max-w-4xl">
        <h1 className="text-4xl font-bold">DENGUE HUB</h1>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">Login</button>
      </header>

      <main className="flex flex-col items-center mt-8 w-full max-w-4xl">
        <Image 
          src="/mosquito.jpg" 
          alt="Mosquito"
          width={400} 
          height={300}
          className="rounded-lg"
        />
        
        <div className="mt-8 w-full flex items-center">
          <input 
            type="text" 
            placeholder="O que deseja saber sobre a dengue" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300" 
          />
          <button className="p-3 ml-2 bg-gray-700 text-white rounded-lg">
            🔍
          </button>
        </div>

        <section className="grid grid-cols-2 gap-6 mt-12">
          <div className="flex flex-col items-center">
            <div className="text-2xl">⚠️</div>
            <h2 className="font-bold mt-2">PREVENÇÃO</h2>
            <p className="text-center mt-1">Conheça as maneiras corretas para se proteger da dengue</p>
            <button className="mt-2 text-blue-600">Saiba mais</button>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-2xl">🏥</div>
            <h2 className="font-bold mt-2">TRATAMENTO</h2>
            <p className="text-center mt-1">Entenda como tratar corretamente caso esteja infectado</p>
            <button className="mt-2 text-blue-600">Saiba mais</button>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-2xl">🦟</div>
            <h2 className="font-bold mt-2">AEDES AEGYPTI</h2>
            <p className="text-center mt-1">Descubra fatos importantes e curiosidades sobre o mosquito!</p>
            <button className="mt-2 text-blue-600">Saiba mais</button>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-2xl">📊</div>
            <h2 className="font-bold mt-2">ESTATÍSTICAS</h2>
            <p className="text-center mt-1">Veja dados atualizados sobre casos de dengue no Brasil</p>
            <button className="mt-2 text-blue-600">Saiba mais</button>
          </div>
        </section>
      </main>
    </div>
  );
}
