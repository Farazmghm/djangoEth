import { axiosPrivateInstance } from "../api/apiConfig";
import { useEffect } from 'react'
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

/*!
! Issue: Do not use Axios interceptors directly inside a useEffect with dependencies. Doing so can cause issues like:

! API being called twice.
! App re-rendering twice.
! Solution: Instead, create an Axios instance and set up interceptors within that instance. This approach ensures that the interceptor is only created once and prevents unnecessary re-renders or duplicate API calls.
!*/
export default function useAxiosPrivate() {

    const { accessToken, setAccessToken, csrftoken, user } = useAuth()
    const refresh = useRefreshToken()

    useEffect(() => {
        const requestIntercept = axiosPrivateInstance.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    config.headers['X-CSRFToken'] = csrftoken
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivateInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const { csrfToken: newCSRFToken, accessToken: newAccessToken } = await refresh();
                    setAccessToken(newAccessToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['X-CSRFToken'] = newCSRFToken
                    return axiosPrivateInstance(prevRequest)
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivateInstance.interceptors.request.eject(requestIntercept)
            axiosPrivateInstance.interceptors.response.eject(responseIntercept)
        }
    }, [accessToken, user])

    return axiosPrivateInstance
}
