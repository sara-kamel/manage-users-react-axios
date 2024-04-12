import axios from 'axios';
const API_URL = 'https://65f074dcda8c6584131bd2f8.mockapi.io/api/practic/users';

export const getUsers = async () => {
  try {
    const respone = await axios.get(API_URL);
    return { error: null, data: respone.data };
  } catch (error) {
    return { error: error.message };
  }
};
export const getUserById = async (userId) => {
  try {
    const respone = await axios.get(`${API_URL}/${userId}`);
    return { error: null, data: respone.data };
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const addUser = async (userName, userEmail) => {
  try {
    const newUser = {
      userName: userName,
      email: userEmail,
    };
    const respone = await axios.post(API_URL, newUser);
    return { error: null, data: respone.data };
  } catch (error) {
    return { error: error.message };
  }
};

export const updateUser = async (user, name, email) => {
  try {
    const updatedUser = { ...user, userName: name, email: email };
    const respone = await axios.put(`${API_URL}/${user.id}`, updatedUser);
    return { error: null, data: respone.data };
  } catch (error) {
    return { error: error.message };
  }
};
