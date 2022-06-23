import axios from 'axios';

const getRates = async () => {
  const response = await axios.get('https://openexchangerates.org/api/latest.json?app_id=023762cd6c044859bd6454118d73c458');
  return response.data;
};

export default getRates;
