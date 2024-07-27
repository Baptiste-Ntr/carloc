import { isExpired, decodeToken } from 'react-jwt'

const getJWTFromServer = async () => {
  try {
    const response = await fetch('/get-jwt');
    if (response.ok) {
      const data = await response.json();
      return data.jwt;
    }
    return null;
  } catch (error) {
    console.error('Error fetching JWT:', error);
    return null;
  }
};

const verifyJWT = async () => {
  const token = await getJWTFromServer();
  if (!decodeToken(token) || !token) {
    return false;
  }

  if (isExpired(token)) {
    return false;
  }

  return true;
};

export default verifyJWT