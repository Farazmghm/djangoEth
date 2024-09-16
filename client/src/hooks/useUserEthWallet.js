import {useEffect, useState} from "react";
import useAxiosPrivate from "./usePrivate";

export default function useUserEthWallet(user) {
    const [userEthWallet, setUserEthWallet] = useState(null);
    const axiosPrivateInstance = useAxiosPrivate()

    const getUserWalletInfo = async () => {
        const { data } = await axiosPrivateInstance({
            method: "get",
            url: 'auth/user/ethereum-wallet',
        });
        if (data) {
            setUserEthWallet(data)
        }
    }
    useEffect(() => {
        if (user?.email) {
            getUserWalletInfo()
        }
    }, [user]);

    return {
        userEthWallet,
        setUserEthWallet,
    }
}
