import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';

const projectId = 'de0ec43f8093916091b1d753c90375a4';

const chains = [
    {
        chainId: 1,
        name: 'Ethereum',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'https://cloudflare-eth.com'
    },
    {
        chainId: 1337,
        name: 'Ganache',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'HTTP://127.0.0.1:8545',
    },
];

const metadata = {
    name: 'Connectverse',
    description: 'The finest creation of Navin3d.',
    url: 'https://github.com/Navin3d', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains,
    projectId,
    enableAnalytics: true,
});

export const projectToBlockchain = project => {

}
