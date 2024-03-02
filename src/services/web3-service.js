const WEB3_STATUS_KEY = "prj-mg-web3"

export const isWeb3Enabled = _ => localStorage.getItem(WEB3_STATUS_KEY);

export const toggleWeb3Status = status => {
    console.log("!status", status);
    localStorage.setItem(WEB3_STATUS_KEY, status);
    return status;
}
