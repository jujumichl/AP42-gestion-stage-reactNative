import React, { createContext, useState, useContext } from 'react';
import { postConnexion } from '../api/login';

// 1. Création du contexte
const AuthContext = createContext();

// 2. Le Provider qui entoure l'application pour fournir des données à tout composant
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function login (unEmail, unMdp) {
    const body = await postConnexion(unEmail, unMdp)
    setUser({email: unEmail, token: body.token});
    setIsLoading(true);
    console.log('Connexion réussie - JWT : ' + body.token);
  }

  function logout () {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personnalisé pour faciliter l'accès aux données de l'utilisateur connecté
export const useAuth = () => useContext(AuthContext);