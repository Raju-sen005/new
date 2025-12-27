import { createContext, useState, useContext, useEffect } from 'react';

// Create the User Context
const UserContext = createContext();

// User Provider Component
export const UserProvider = ({ children }) => {
  // Retrieve from local storage if available
  const savedUserInfo = localStorage.getItem('userInfo');
  const savedShippingAddress = localStorage.getItem('shippingAddress');

  const [userInfo, setUserInfo] = useState(() => {
    return savedUserInfo ? JSON.parse(savedUserInfo) : {
      name: "John Doe",
      email: "account@gmail.com",
      phone: "123-456-7890",
    };
  });

  const [shippingAddress, setShippingAddress] = useState(() => {
    return savedShippingAddress ? JSON.parse(savedShippingAddress) : {
      name: "John Doe",
      company: "creative web pixel",
      address: "address",
      city: "your city",
      country: "your country",
      state: "your state",
      zip: "your zip code",
      phone: "00000000",
    };
  });

  // Sync userInfo and shippingAddress to localStorage
  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  return (
    <UserContext.Provider value={{
      userInfo,
      setUserInfo,
      shippingAddress,
      setShippingAddress,
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);







