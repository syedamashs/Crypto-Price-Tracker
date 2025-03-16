const fetchprice = async () => {
    try {
        let bitcoinres = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        let nodecoinres = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=nodecoin&vs_currencies=usd");
        let grassres = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=grass&vs_currencies=usd");

        if (!bitcoinres.ok) throw new Error("Bitcoin API Failed");
        if (!nodecoinres.ok) throw new Error("NodeCoin API Failed");
        if (!grassres.ok) throw new Error("Grass API Failed");

        let bitcoindata = await bitcoinres.json();
        let nodecoindata = await nodecoinres.json();
        let grassdata = await grassres.json();

        // Store prices in an object for easy access
        window.cryptoPrices = {
            bitcoin: bitcoindata.bitcoin ? bitcoindata.bitcoin.usd : null,
            nodecoin: nodecoindata.nodecoin ? nodecoindata.nodecoin.usd : null,
            grass: grassdata.grass ? grassdata.grass.usd : null
        };

        // Update the price display
        document.getElementById("bitcoin_price").innerText = bitcoindata.bitcoin ? "$" + bitcoindata.bitcoin.usd : "Cannot fetch Bitcoin price!";
        document.getElementById("nodecoin_price").innerText = nodecoindata.nodecoin ? "$" + nodecoindata.nodecoin.usd : "Cannot fetch NodeCoin price!";
        document.getElementById("grass_price").innerText = grassdata.grass ? "$" + grassdata.grass.usd : "Cannot fetch Grass price!";

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

// Add event listener for search button
document.getElementById("searchButton").addEventListener("click", searchCrypto);

// Fetch prices initially
fetchprice();
setInterval(fetchprice, 30000);
