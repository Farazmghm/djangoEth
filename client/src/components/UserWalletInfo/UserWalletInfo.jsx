export default function UserWalletInfo({name, address, balance, lastUpdate}) {
    const lastUpdateDate = lastUpdate ? new Date(lastUpdate).toISOString().slice(0, 10) : '';
    const lastUpdateTime = lastUpdate ? new Date(lastUpdate).toISOString().slice(11, 16) : '';
    return (
        <div className='container'>
            <h2>{name} Wallet:</h2>
            <span className={"d-block"}>address: {address}</span>
            <span className={"d-block"}>balance: {balance}</span>
            <span className={"d-block"}>last update: {`${lastUpdateDate} ${lastUpdateTime}`}</span>
        </div>
    );
}
