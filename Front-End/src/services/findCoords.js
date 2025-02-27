import axios from 'axios'

const geocodeApiKey = import.meta.env.VITE_OPENCAGEDATA_API_KEY;

export const findGeocode = async (location) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${geocodeApiKey}&language=en&pretty=1`;
    console.log('url:',url);
    const response = await axios.get(url);
    console.log(response.data.results[0]?.geometry);
    return response.data.results[0]?.geometry || null;
};

