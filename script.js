const fetchprice = async () => {

    try{
        //Fetch Bitcoin Price
        let response= await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        let bitcoindata=await response.json();
        console.log("Bitcoin Price: $ ",bitcoindata.bitcoin.usd);

        document.getElementById("bitcoin_price").innerText = "$" + bitcoindata.bitcoin.usd;

        //Fetch NodeCoin Price
        let response2= await fetch("https://api.coingecko.com/api/v3/simple/price?ids=nodecoin&vs_currencies=usd");
        let nodecoindata=await response2.json();
        console.log("NodeCoin(NC) Price: $ ",nodecoindata.nodecoin.usd);

        document.getElementById("nodecoin_price").innerText="$" + nodecoindata.nodecoin.usd;

    }catch(error){
        console.log("Something went Wrong !! : ",error);
    }
};

fetchprice();