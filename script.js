// Dark/Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.innerText = "☀️ Light Mode";
    } else {
        themeToggle.innerText = "🌙 Dark Mode";
    }
});

// Fetch Crypto Prices
const fetchPrice = async () => {
    try {
        // Show loading spinner
        document.getElementById("loadingSpinner").style.display = "block";
        document.getElementById("refreshButton").classList.add("refreshing");

        // Fetch prices for all cryptocurrencies
        let response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,aptos,dogecoin,bitget-token,near,trumpcoin,chaingpt,pi-network,ethereum,solana,nodecoin,grass,cardano,sui,binancecoin,kadena,toncoin,shiba-inu,notcoin,tron,ripple,stellar,avalanche-2,polkadot,uniswap,pepe,floki,matic-network,arbitrum,internet-computer,dogwifcoin,chiliz,the-doge-nft,hamster-kombat,memecoin&vs_currencies=usd&include_24hr_change=true");
        let data = await response.json();

        console.log("Fetched Data:", data); // Debugging log to check API response

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
            bnb: data.binancecoin?.usd,
            shib: data['shiba-inu']?.usd,
            not: data.notcoin?.usd,
            trx: data.tron?.usd,
            xrp: data.ripple?.usd,
            xlm: data.stellar?.usd,
            avax: data['avalanche-2']?.usd,
            dot: data.polkadot?.usd,
            uni: data.uniswap?.usd,
            pepe: data.pepe?.usd,
            floki: data.floki?.usd,
            matic: data['matic-network']?.usd,
            arb: data.arbitrum?.usd,
            icp: data['internet-computer']?.usd,
            wif: data.dogwifcoin?.usd,
            chz: data.chiliz?.usd,
            dogs: data['the-doge-nft']?.usd,
            hmstr: data['hamster-kombat']?.usd,
            memefi: data.memecoin?.usd
        };

        // Update the price display with 24h change
        updatePrice("bitcoin", data.bitcoin);
        updatePrice("nodecoin", data.nodecoin);
        updatePrice("grass", data.grass);
        updatePrice("ethereum", data.ethereum);
        updatePrice("solana", data.solana);
        updatePrice("kadena", data.kadena);
        updatePrice("toncoin", data.toncoin);
        updatePrice("shiba-inu", data['shiba-inu']);
        updatePrice("notcoin", data.notcoin);
        updatePrice("tron", data.tron);
        updatePrice("ripple", data.ripple);
        updatePrice("stellar", data.stellar);
        updatePrice("avalanche-2", data['avalanche-2']);
        updatePrice("polkadot", data.polkadot);
        updatePrice("uniswap", data.uniswap);
        updatePrice("pepe", data.pepe);
        updatePrice("floki", data.floki);
        updatePrice("matic-network", data['matic-network']);
        updatePrice("arbitrum", data.arbitrum);
        updatePrice("internet-computer", data['internet-computer']);
        updatePrice("dogwifcoin", data.dogwifcoin);
        updatePrice("chiliz", data.chiliz);
        updatePrice("the-doge-nft", data['the-doge-nft']);
        updatePrice("hamster-kombat", data['hamster-kombat']);
        updatePrice("memecoin", data.memecoin);

        // Hide loading spinner and stop refresh button animation
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("refreshButton").classList.remove("refreshing");
    } catch (error) {
        console.log("Error fetching prices: ", error);
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("refreshButton").classList.remove("refreshing");
    }
};

// Update Price and 24h Change
const updatePrice = (crypto, data) => {
    let priceElement = document.getElementById(`${crypto}_price`);
    let changeElement = document.getElementById(`${crypto}_change`);

    if (data && priceElement && changeElement) {
        priceElement.innerText = `$${data.usd}`;
        if (data.usd_24h_change !== undefined) {
            changeElement.innerText = `24h Change: ${data.usd_24h_change.toFixed(2)}%`;
            changeElement.className = data.usd_24h_change >= 0 ? "price-up" : "price-down";
        } else {
            changeElement.innerText = "";
        }
    } else if (priceElement && changeElement) {
        priceElement.innerText = "Failed to fetch price!";
        changeElement.innerText = "";
    }
};

// Search Functionality (Now works for full names & symbols)
const searchCrypto = () => {
    let searchInput = document.getElementById("searchInput").value.toLowerCase().trim();
    let resultElement = document.getElementById("search_result");

    if (!searchInput) {
        resultElement.innerText = "Please enter a cryptocurrency!";
        resultElement.style.color = "red";
        return;
    }

    let found = false;
    for (const [key, value] of Object.entries(window.cryptoPrices)) {
        if (key.includes(searchInput)) {
            resultElement.innerText = `${key.toUpperCase()} Price: $${value}`;
            resultElement.style.color = "green";
            found = true;
            break;
        }
    }

    if (!found) {
        resultElement.innerText = "No results found!";
        resultElement.style.color = "red";
    }
};

// Clear Search
const clearSearch = () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("search_result").innerText = "";
};

// Event Listeners
document.getElementById("searchButton").addEventListener("click", searchCrypto);
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchCrypto();
    }
});
document.getElementById("clearButton").addEventListener("click", clearSearch);
document.getElementById("refreshButton").addEventListener("click", fetchPrice);

// Fetch prices initially
setTimeout(fetchPrice, 2000);
