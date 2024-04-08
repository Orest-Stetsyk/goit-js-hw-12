import { elem, word, showLoading } from "../main";

export function fetchingFrom() {
  const options = {
    method: "GET"
  };

  const params = new URLSearchParams({
    key: '43271859-59a58ad2885d01442ce560ecb',
    q: word,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `https://pixabay.com/api/?${params}`;

  showLoading();

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
};