import axios from 'axios';

export const axiosPublic = axios.create({
    baseURL:'https://asset-track-pro-server-pink.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;