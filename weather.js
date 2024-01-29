const express=require("express");
const app= express();
const https=require("https");
const bodyParser=require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(requ1,respo1){

    respo1.sendFile(__dirname + "/index.html")

});


app.post("/",function(req,res){
  // mistake : resp1.send("post reciver");
  const city =(req.body.cityName);
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=0d342ab91af4d920dae83098aaad27a4";

  console.log(req.body.cityName);

  https.get(url,function(response){
    response.on("data",function(response2){
      const parsed =JSON.parse(response2);
      const temp =parseInt(parsed.main.temp)-273;
      const des=parsed.weather[0].description;
      const city =parsed.name;
      const url2="https://openweathermap.org/img/wn/"+(parsed.weather[0].icon.toString())+"@2x.png";
      res.set("Content-Type","text/html");
      res.write("Todays temprature of " + city.toString()+" is : "+temp.toString()+ "deg Celcius . ");
      res.write("<br>");
      res.write("The Weather description is : "+des.toString());

      res.write("<img src="+url2+">");

      res.send();
    })
  });


})




app.listen(5600,function(){
  console.log("Weather server up at port 5600");
});
