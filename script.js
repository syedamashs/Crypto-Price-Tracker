const fetchprice = async () => {

    try{
        //Fetch Bitcoin and Nodecoin Price

        let [bitcoinres,nodecoinres,grassres]= await Promise.all([
            fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"),
            fetch("https://api.coingecko.com/api/v3/simple/price?ids=nodecoin&vs_currencies=usd"),
            fetch("https://api.coingecko.com/api/v3/simple/price?ids=grass&vs_currencies=usd"),
        ]);

        let bitcoindata=await bitcoinres.json();
        let nodecoindata=await nodecoinres.json();
        let grassdata=await grassres.json();

        if(bitcoindata.bitcoin){
            console.log("Bitcoin Price: $ ",bitcoindata.bitcoin.usd);
            document.getElementById("bitcoin_price").innerText = "$" + bitcoindata.bitcoin.usd;
        }else{
            document.getElementById("bitcoin_price").innerText="Cannot Fetch the Bitcoin Price at the moment !!";
        }

        if(nodecoindata.nodecoin){
            console.log("NodeCoin(NC) Price: $ ",nodecoindata.nodecoin.usd);
            document.getElementById("nodecoin_price").innerText="$" + nodecoindata.nodecoin.usd;
        }else{
            document.getElementById("nodecoin_price").innerText="Cannot Fetch the NodeCoin Price at the moment !!";
        }

        if(grassdata.grass){
            console.log("Grass Price: $ ",grassdata.grass.usd);
            document.getElementById("grass_price").innerText = "$" + grassdata.grass.usd;
        }else{
            document.getElementById("grass_price").innerText="Cannot Fetch the Grass Price at the moment !!";
        }

    }catch(error){
        console.log("Something went Wrong !! : ",error);
    }
};

fetchprice();