
const express= require("express")
const https = require("https")

const app= express();

app.get("/",function(req,res){
const url ="https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=0d342ab91af4d920dae83098aaad27a4";
  https.get(url, function(resp){

    resp.on('data', function(data){
      const parsed =(JSON.parse(data))
      const temp =(parsed.main.temp-273)
      const des =(parsed.weather[0].description)
      const url2="https://openweathermap.org/img/wn/"+(parsed.weather[0].icon.toString())+"@2x.png";
      const tempp=parseInt(temp);
        res.set("Content-Type", "text/html");
        res.write("The temperature of Pune is ")
      res.write(tempp.toString());
      res.write("  .The description  of Pune Weather is ")

      res.write(des.toString());
      res.write(" ");


      res.write("<img src=" + url2 +">");

        res.send();
    });

  })

})

app.listen(process.env.PORT||3000,function(){
  console.log("server up ");
})
