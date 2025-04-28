import React from "react";

const RwgSignUp = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">
          HamamPass&apos;a Katılın
        </h1>
        <p className="mt-2 text-gray-600">
          İşletmenizi listelemek ve rezervasyonlarınızı doğrudan Google
          üzerinden almak için kaydolun.
        </p>

        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              İşletme Adı
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="İşletme adınızı girin"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              E-posta Adresi
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="E-posta adresinizi girin"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Telefon Numarası
            </label>
            <input
              type="tel"
              className="mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Telefon numaranızı girin"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            Kaydol
          </button>
        </form>
      </div>
    </div>
  );
};

export default RwgSignUp;
