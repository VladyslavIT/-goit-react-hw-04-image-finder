import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29531020-3b97d8056313c52b7859c1bca';

async function fetchImages(nameGallery, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: KEY,
        q: nameGallery,
        image_type: `photo`,
        orientation: `horizontal`,
        per_page: 12,
        page,
      },
    });

    return response.data;
  } catch (error) {
    toast.error('Oops, something went wrong');
  }
}

export { fetchImages };
