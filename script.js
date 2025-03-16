const fetchprice = async () => {

    try{
        //Fetch Bitcoin Price
        let response= await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        let bitcoindata=await response.json();
        console.log("Bitcoin Price: $ ",bitcoindata.bitcoin.usd);

        //Fetcj NodeCoin Price
        let response2= await fetch("https://api.coingecko.com/api/v3/simple/price?ids=nodecoin&vs_currencies=usd");
        let nodecoindata=await response2.json();
        console.log("NodeCoin(NC) Price: $ ",nodecoindata.nodecoin.usd);

    }catch(error){
        console.log("Something went Wrong !! : ",error);
    }
};

fetchprice();