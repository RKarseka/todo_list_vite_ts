import axios from 'axios';
import { PATH } from '../consts';

export const Helpers: React.FC = () => {
  return <div>helpers</div>;
};

export const axiosGet = () =>
  axios.get(`${PATH}?_limit=8`).then(({ data }) => data);
