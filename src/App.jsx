import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand();
  }, []);

  const user = window.Telegram.WebApp.initDataUnsafe?.user;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">🚀 Mini App</h1>
        <p className="text-gray-600 mb-6">
          Bienvenido a tu nuevo lienzo en blanco.
        </p>
        
        {user ? (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-left mb-6">
            <p className="text-sm font-semibold text-blue-800 mb-2">Usuario de Telegram:</p>
            <p className="text-gray-700">Nombre: {user.first_name} {user.last_name}</p>
            <p className="text-gray-700">Username: @{user.username}</p>
          </div>
        ) : (
          <p className="text-red-500 mb-6 text-sm">No se detectó usuario de Telegram (Abre desde el Bot)</p>
        )}

        <button 
          onClick={() => alert('¡Hola desde la Mini App!')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 transform hover:scale-105"
        >
          Interactuar
        </button>
      </div>
    </div>
  );
}

export default App;
