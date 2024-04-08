import axios from 'axios';
import { showLoading } from '../main';
export async function connectionFrom(word,currentPage) {
  const params = new URLSearchParams({
    key: '43271859-59a58ad2885d01442ce560ecb',
    q: word,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: `15`,
  });

  showLoading();

  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
  } catch (error) {
    throw new Error(response.status);
  }
};