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
        let response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,aptos,dogecoin,bitget-token,near,trumpcoin,eliza-coin,avalon-coin,silencio-coin,story-coin,fuel-coin,tapswap,seicoin,tomarket-coin,goats-coin,major-coin,altcoin,degen-coin&vs_currencies=usd&include_24hr_change=true");
        let data = await response.json();

        console.log("Fetched Data:", data); // Debugging log to check API response

        // Store prices in an object for search functionality
        window.cryptoPrices = {
            btc: data.bitcoin?.usd,
            eth: data.ethereum?.usd,
            sol: data.solana?.usd,
            kda: data.kadena?.usd,
            sui: data.sui?.usd,
            ada: data.cardano?.usd,
            apt: data.aptos?.usd,
            near: data.near?.usd,
            doge: data.dogecoin?.usd,
            trump: data.trumpcoin?.usd,
            eliza: data['eliza-coin']?.usd,
            avalon: data['avalon-coin']?.usd,
            silencio: data['silencio-coin']?.usd,
            story: data['story-coin']?.usd,
            fuel: data['fuel-coin']?.usd,
            taps: data['tapswap']?.usd,
            sei: data['seicoin']?.usd,
            toma: data['tomarket-coin']?.usd,
            goats: data['goats-coin']?.usd,
            major: data['major-coin']?.usd,
            alt: data['altcoin']?.usd,
            degen: data['degen-coin']?.usd
        };

        // Update the price display with 24h change
        updatePrice("bitcoin", data.bitcoin);
        updatePrice("ethereum", data.ethereum);
        updatePrice("solana", data.solana);
        updatePrice("kadena", data.kadena);
        updatePrice("sui", data.sui);
        updatePrice("cardano", data.cardano);
        updatePrice("aptos", data.aptos);
        updatePrice("near", data.near);
        updatePrice("dogecoin", data.dogecoin);
        updatePrice("trumpcoin", data.trumpcoin);
        updatePrice("eliza-coin", data['eliza-coin']);
        updatePrice("avalon-coin", data['avalon-coin']);
        updatePrice("silencio-coin", data['silencio-coin']);
        updatePrice("story-coin", data['story-coin']);
        updatePrice("fuel-coin", data['fuel-coin']);
        updatePrice("tapswap", data['tapswap']);
        updatePrice("seicoin", data['seicoin']);
        updatePrice("tomarket-coin", data['tomarket-coin']);
        updatePrice("goats-coin", data['goats-coin']);
        updatePrice("major-coin", data['major-coin']);
        updatePrice("altcoin", data['altcoin']);
        updatePrice("degen-coin", data['degen-coin']);

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

// Full Word Search Functionality
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
        // Full word match check, using regex to match whole word
        if (new RegExp(`^${searchInput}$`, 'i').test(key)) {
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
