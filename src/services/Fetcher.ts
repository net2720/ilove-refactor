import axios from 'axios';

// 토큰이 로컬스토리지에서 getItem 으로 변경될 예정

const token = () => {
  return localStorage.getItem('token');
};

// baseURL 은 변수에 공통으로 사용할 경로 설정후 :id 이런식으로 추가하고
// 사용할 때는 ${변수} 이런 방법 예상
export const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 은탁님 지금 사용하시려면 token 함수 주석처리하시고 `Bearer ${token()}` 이 부분에 토큰 하드코딩하시면 될꺼에요
// 그리고 혹시 오류나오면 엔드포인트나 프록시 한 번 확인해봐야할 것 같습니다ㅜ
