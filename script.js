const fetchprice = async () => {
    try {
        let response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,aptos,dogecoin,bitget-token,near,trumpcoin,chaingpt,pi-network,ethereum,toncoin,solana,nodecoin,grass,cardano,sui,binancecoin,kadena&vs_currencies=usd");
        let data = await response.json();

        // Store prices in an object for search functionality
        window.cryptoPrices = {
            btc: data.bitcoin ? data.bitcoin.usd : null,
            nc: data.nodecoin ? data.nodecoin.usd : null,
            grass: data.grass ? data.grass.usd : null,
            eth: data.ethereum ? data.ethereum.usd : null,
            col: data.solana ? data.solana.usd : null,
            kda: data.kadena ? data.kadena.usd : null,
            sui: data.sui ? data.sui.usd : null,
            ada: data.cardano ? data.cardano.usd : null,
            apt: data.aptos ? data.aptos.usd : null,
            ton: data.toncoin ? data.toncoin.usd : null,
            near: data.near ? data.near.usd : null,
            trump: data.trumpcoin ? data.trumpcoin.usd : null,
            doge: data.dogecoin ? data.dogecoin.usd : null,
            cgpt: data.chaingpt ? data.chaingpt.usd : null,
            bgb: data['bitget-token'] ? data['bitget-token'].usd : null,
            pi: data['pi-network'] ? data['pi-network'].usd : null,
            bnb: data.binancecoin ? data.binancecoin.usd : null
        };

        // Update the price display
        document.getElementById("bitcoin_price").innerText = data.bitcoin ? "$" + data.bitcoin.usd : "Cannot fetch Bitcoin price!";
        document.getElementById("nodecoin_price").innerText = data.nodecoin ? "$" + data.nodecoin.usd : "Cannot fetch NodeCoin price!";
        document.getElementById("grass_price").innerText = data.grass ? "$" + data.grass.usd : "Cannot fetch Grass price!";
        document.getElementById("eth_price").innerText = data.ethereum ? "$" + data.ethereum.usd : "Cannot fetch Ethereum price!";
        document.getElementById("sol_price").innerText = data.solana ? "$" + data.solana.usd : "Cannot fetch Solana price!";
        document.getElementById("kda_price").innerText = data.kadena ? "$" + data.kadena.usd : "Cannot fetch KDA price!";
        document.getElementById("bgb_price").innerText = data['bitget-token'] ? "$" + data['bitget-token'].usd : "Cannot fetch BGB price!";
        document.getElementById("bnb_price").innerText = data.binancecoin ? "$" + data.binancecoin.usd : "Cannot fetch BNB price!";
        document.getElementById("ada_price").innerText = data.cardano ? "$" + data.cardano.usd : "Cannot fetch ADA price!";

        // Start the blinking effect
        blinkPrices();
        
    } catch (error) {
        console.log("Error fetching prices: ", error);
    }
};

// Function to handle search button click
const searchCrypto = () => {
    let searchInput = document.getElementById("searchInput").value.toLowerCase(); // Convert to lowercase
    let resultElement = document.getElementById("search_result"); // Result display element

    if (window.cryptoPrices[searchInput] !== undefined && window.cryptoPrices[searchInput] !== null) {
        resultElement.innerText = `${searchInput.toUpperCase()} Price: $${window.cryptoPrices[searchInput]}`;
        resultElement.style.color = "green"; // Make it visually appealing
    } else {
        resultElement.innerText = "No results found!";
        resultElement.style.color = "red";
    }
};

// Function to clear search input and reset page
const clearSearch = () => {
    document.getElementById("searchInput").value = ""; // Clear input field
    document.getElementById("search_result").innerText = ""; // Clear result
};

// Function to make the prices blink
const blinkPrices = () => {
    const blinkElements = [
    ];

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
