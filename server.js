import express from "express";
import cheerio from "cheerio";
import axios from "axios";

const app = express();


const articles = []

const getData=(numberOfPage)=>{
axios(`https://moviesmod.wiki/page/${numberOfPage}/`)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        $(".latestPost", html).each(function () {
            const poster = $(this).find("img").attr("src")
            const title = $(this).find("header h2").text();
            const downloadLink = $(this).find("header h2 a").attr("href");
            articles.push({
                poster,
                title, 
                downloadLink
            })
        })
        console.log(articles)
    })
    .catch((err)=>{
        console.log("Something Went Wrong")
    })
}
let page=1;
setInterval(() => {
    getData(page++)
}, 10000);
    
app.get("/", (req, res) => {
    res.send(articles)
})


app.listen(3000, (err) => {
    if (err) throw err;
    console.timeLog("The server is running on http://localhost:3000")
})