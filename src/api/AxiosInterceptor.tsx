import { useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance, { refreshAccessToken } from './api';
import { getAccessToken, setAccessToken } from '../utils/auth';
import { useAppDispatch } from '../store/hooks';
import { logOut, setAuth } from '../store/auth/Slices/slice';


interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

function AxiosInterceptor() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const reqInterceptorId = useRef<number | null>(null);
  const resInterceptorId = useRef<number | null>(null);

  useLayoutEffect(() => {

    reqInterceptorId.current = axiosInstance.interceptors.request.use(async (config) => {

      const accessToken = getAccessToken();
      if (config.url === "/auth/signin") {
        return config;
      }

      if (config.url === "/todos" && !accessToken && !isRefreshing) {
        isRefreshing = true;
        try {
          const refreshTokenItem = localStorage.getItem("refreshToken");
          const { accessToken, refreshToken } = await refreshAccessToken(
            refreshTokenItem
          );
          localStorage.setItem("refreshToken", refreshToken);
          setAccessToken(accessToken);
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        } catch (error) {
          localStorage.removeItem("refreshToken");
          setAccessToken("");
          dispatch(logOut());
          navigate("/auth");
          throw error;
        } finally {
          isRefreshing = false;
        }


      }

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      } else {
        return config;
      }
    })

    resInterceptorId.current = axiosInstance.interceptors.response.use((config) => {
      return config;
    },
      async (error) => {

        const originalRequest = error.config;

        if (!originalRequest || originalRequest._retry) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 &&
          (originalRequest.url.includes('/auth/signin') || originalRequest.url.includes('/auth/refresh'))) {
          dispatch(logOut());
          navigate("/auth");
          return Promise.reject(error);
        }

        if (error.response?.status === 401) {
          // Пихаем в failedQueue Promise, который не завершается сразу, а ждет в очереди.
          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = 'Bearer ' + token;
                return axiosInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          // Впервые получаем 401
          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const refreshTokenItem = localStorage.getItem("refreshToken");
            const { accessToken, refreshToken } = await refreshAccessToken(refreshTokenItem);

            localStorage.setItem("refreshToken", refreshToken);
            setAccessToken(accessToken);
            dispatch(setAuth(true));

            // Обработка ждунов
            processQueue(null, accessToken);

            originalRequest.headers.Authorization = 'Bearer ' + accessToken;
            return axiosInstance(originalRequest);

          } catch (refreshError) {
            processQueue(refreshError, null);
            localStorage.removeItem("refreshToken");
            setAccessToken("");
            dispatch(logOut());
            navigate("/auth");
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      })

    return () => {
      if (reqInterceptorId.current !== null) {
        axiosInstance.interceptors.request.eject(reqInterceptorId.current);
      }
      if (resInterceptorId.current !== null) {
        axiosInstance.interceptors.response.eject(resInterceptorId.current);
      }
    };

  }, [navigate, dispatch])

  return null;

}

export default AxiosInterceptor