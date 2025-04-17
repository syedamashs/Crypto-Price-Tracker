const container = document.getElementById("cryptoContainer");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const spinner = document.getElementById("loadingSpinner");

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Typewriter effect
const typewriter = document.getElementById("typewriter");
const headingText = "Live Crypto Price Tracker 🚀";
let i = 0;
function typeWriterEffect() {
  if (i < headingText.length) {
    typewriter.innerHTML += headingText.charAt(i);
    i++;
    setTimeout(typeWriterEffect, 80);
  }
}
typeWriterEffect();

// Fetch data and populate
let coins = [];
async function fetchCryptoData() {
  spinner.style.display = "block";
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    coins = await res.json();
    showCoins(coins);
  } catch (error) {
    container.innerHTML = `<p style="color:red;text-align:center;">Failed to fetch data. Please try again.</p>`;
  } finally {
    spinner.style.display = "none";
  }
}

// Create card HTML
function createCard(coin) {
  return `
    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <img src="${coin.image}" alt="${coin.name}" width="50" />
          <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
          <p>💲 ${coin.current_price.toLocaleString()}</p>
        </div>
        <div class="card-back">
          <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
          <p>Total Supply: ${coin.total_supply ? coin.total_supply.toLocaleString() : "N/A"}</p>
          <p>ATH: $${coin.ath.toLocaleString()}</p>
        </div>
      </div>
    </div>
  `;
}

// Display coins
function showCoins(data) {
  container.innerHTML = "";
  data.forEach(coin => {
    container.innerHTML += createCard(coin);
  });
}

// Search function
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = coins.filter(c => c.name.toLowerCase().includes(query));
  showCoins(filtered);
});

// Clear search
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  showCoins(coins);
});

// Fetch data on load
fetchCryptoData();
