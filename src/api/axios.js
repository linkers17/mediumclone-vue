import axios from 'axios';
import {getItem} from "@/helpers/persistanceStorage";

axios.defaults.baseURL = 'Https://conduit.productionready.io/api';

axios.interceptors.request.use(config => {
    const token = getItem('accessToken');
    const authorizationToken = token ? `Token ${token}` : '';
    config.headers.Authrization = authorizationToken;
   return config;
});

export default axios;
