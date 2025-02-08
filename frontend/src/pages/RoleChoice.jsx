import React from 'react';
import { useRouter } from 'next/router';

const RoleChoice = () => {
  const router = useRouter();

  const handleRoleSelection = (role) => {
    if (role === 'Exporter') {
      router.push('/login/exporter');
    } else if (role === 'Farmer') {
      router.push('/login/farmer');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <div 
          className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-200" 
          onClick={() => handleRoleSelection('Exporter')}
        >
          <h2 className="text-xl font-semibold">Exporter</h2>
        </div>
        <div 
          className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-200" 
          onClick={() => handleRoleSelection('Farmer')}
        >
          <h2 className="text-xl font-semibold">Farmer</h2>
        </div>
      </div>
    </div>
  );
};

export default RoleChoice;