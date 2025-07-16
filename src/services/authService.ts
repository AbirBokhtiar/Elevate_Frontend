import api from '../../utils/axios';

async function handleLogin(email:string, password:string) {
  try {
    const response = await api.post('/auth/login', { email, password });
    const token = response.data.token; 
    localStorage.setItem('token', token);
    
  } catch (error) {
    console.error('Login failed:', error);
  }
}