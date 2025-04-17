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

let coins = [];

async function fetchCryptoData() {
  spinner.style.display = "block";
  try {
    // Top 100 coins
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1");
    const topCoins = await res.json();

    // Extra meme / telegram coins (hard to rank but needed)
    const extraCoinIds = [
      'the-doge-nft', 'memecoin', 'nodecoin', 'tomarket', 'hamster-kombat', 'grass','alt','degen','major','goats','catizen','kadena','notcoin'
    ];

    const extraRes = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${extraCoinIds.join(',')}`);
    const extraCoins = await extraRes.json();

    // Merge unique coins
    const mergedCoinsMap = new Map();
    [...topCoins, ...extraCoins].forEach(coin => {
      mergedCoinsMap.set(coin.id, coin);
    });

    coins = Array.from(mergedCoinsMap.values());
    showCoins(coins);
  } catch (error) {
    container.innerHTML = `<p style="color:red;text-align:center;">Failed to fetch data. Please try again.</p>`;
  } finally {
    spinner.style.display = "none";
  }
}

// Format price smartly
function formatPrice(price) {
  if (price >= 1) {
    return price.toFixed(2);
  } else if (price >= 0.01) {
    return price.toFixed(4);
  } else if (price >= 0.0001) {
    return price.toFixed(6);
  } else {
    return price.toFixed(10); // For micro-coins like HAMSTER, DOGS, etc.
  }
}

function createCard(coin) {
  return `
    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <img src="${coin.image}" alt="${coin.name}" width="50" />
          <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
          <p>💲 ${formatPrice(coin.current_price)}</p>
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

function showCoins(data) {
  container.innerHTML = "";
  data.forEach(coin => {
    container.innerHTML += createCard(coin);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = coins.filter(c => c.name.toLowerCase().includes(query));
  showCoins(filtered);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  showCoins(coins);
});

fetchCryptoData();
