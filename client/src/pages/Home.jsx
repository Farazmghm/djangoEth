import useAuth from '../hooks/useAuth'
import UserWalletInfo from "../components/UserWalletInfo/UserWalletInfo";
import useUserEthWallet from "../hooks/useUserEthWallet";

export default function Home() {
    const { user } = useAuth();
    const { userEthWallet } = useUserEthWallet(user);

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? (
                            <UserWalletInfo
                                name={"Ethereum"}
                                address={userEthWallet?.address}
                                balance={userEthWallet?.balance}
                                lastUpdate={userEthWallet?.updated_at}
                            />
                        ) : 'Please login first'}
                    </div>
                </div>
            </h2>
        </div>
    )
}
