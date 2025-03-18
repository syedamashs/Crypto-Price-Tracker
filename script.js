const fetchprice = async () => {
    try {
        let response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,aptos,dogecoin,bitget-token,near,trumpcoin,chaingpt,pi-network,ethereum,toncoin,solana,nodecoin,grass,cardano,sui,binancecoin,kadena&vs_currencies=usd");
        let data = await response.json();

        // Store prices in an object for search functionality
        window.cryptoPrices = {
            btc: data.bitcoin?.usd,
            nc: data.nodecoin?.usd,
            grass: data.grass?.usd,
            eth: data.ethereum?.usd,
            sol: data.solana?.usd,
            kda: data.kadena?.usd,
            sui: data.sui?.usd,
            ada: data.cardano?.usd,
            apt: data.aptos?.usd,
            ton: data.toncoin?.usd,
            near: data.near?.usd,
            trump: data.trumpcoin?.usd,
            doge: data.dogecoin?.usd,
            cgpt: data.chaingpt?.usd,
            bgb: data['bitget-token']?.usd,
            pi: data['pi-network']?.usd,
            bnb: data.binancecoin?.usd
        };

        // Update the price display
        document.getElementById("bitcoin_price").innerText = data.bitcoin ? "$" + data.bitcoin.usd : "Cannot fetch Bitcoin price!";
        document.getElementById("nodecoin_price").innerText = data.nodecoin ? "$" + data.nodecoin.usd : "Cannot fetch NodeCoin price!";
        document.getElementById("grass_price").innerText = data.grass ? "$" + data.grass.usd : "Cannot fetch Grass price!";
        document.getElementById("eth_price").innerText = data.ethereum ? "$" + data.ethereum.usd : "Cannot fetch Ethereum price!";
        document.getElementById("sol_price").innerText = data.solana ? "$" + data.solana.usd : "Cannot fetch Solana price!";
        document.getElementById("kda_price").innerText = data.kadena ? "$" + data.kadena.usd : "Cannot fetch KDA price!";

        // Start the blinking effect (Disabled for now)
        // blinkPrices();
        
    } catch (error) {
        console.log("Error fetching prices: ", error);
    }
};

// Function to handle search button click
const searchCrypto = () => {
    let searchInput = document.getElementById("searchInput").value.toLowerCase().trim();
    let resultElement = document.getElementById("search_result");

    if (window.cryptoPrices[searchInput] !== undefined && window.cryptoPrices[searchInput] !== null) {
        resultElement.innerText = `${searchInput.toUpperCase()} Price: $${window.cryptoPrices[searchInput]}`;
        resultElement.style.color = "green";
    } else {
        resultElement.innerText = "No results found!";
        resultElement.style.color = "red";
    }
};

// Function to clear search input and reset page
const clearSearch = () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("search_result").innerText = "";
};

/* Function to make the prices blink (Disabled for now)
const blinkPrices = () => {
    const blinkElements = []; // Add IDs of elements you want to blink

    let isVisible = true;
    setInterval(() => {
        blinkElements.forEach(el => {
            if (el) {
                el.style.visibility = isVisible ? "hidden" : "visible";
            }
        });
        isVisible = !isVisible;
    }, 500); // Blink every 0.5 seconds
};
*/

// Add event listener for search button
document.getElementById("searchButton").addEventListener("click", searchCrypto);

// Add event listener for Enter key press in search input
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchCrypto();
    }
});

// Add event listener for Clear button
document.getElementById("clearButton").addEventListener("click", clearSearch);

// Fetch prices initially
setTimeout(fetchprice, 2000);
