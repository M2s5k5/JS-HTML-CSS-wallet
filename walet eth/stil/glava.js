// app.js

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('Please install MetaMask to use this wallet.');
}

let web3;
let account;

document.getElementById('connectButton').addEventListener('click', async () => {
    // Povezivanje sa MetaMask
    web3 = new Web3(window.ethereum);
    await ethereum.request({ method: 'eth_requestAccounts' });
    account = (await web3.eth.getAccounts())[0];
    document.getElementById('account').innerText = `Account: ${account}`;
    
    // Prikazivanje balansa u ETH
    const balance = await web3.eth.getBalance(account);
    document.getElementById('balance').innerText = `Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`;
});

document.getElementById('sendButton').addEventListener('click', async () => {
    const receiverAddress = document.getElementById('receiverAddress').value;
    const amount = document.getElementById('amount').value;
    
    if (receiverAddress && amount) {
        const amountInWei = web3.utils.toWei(amount, 'ether');
        
        try {
            await web3.eth.sendTransaction({
                from: account,
                to: receiverAddress,
                value: amountInWei
            });
            alert('Transaction successful!');
        } catch (error) {
            alert('Transaction failed: ' + error.message);
        }
    } else {
        alert('Please enter a valid address and amount.');
    }
});

