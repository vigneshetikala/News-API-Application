const cors = require('cors')
const express = require('express')
const needle = require('needle')
const {storeData, getData, clearData} = require('./db.js')

const app = express();
app.use(cors())
app.use(express.json());

const getNews = async (url) => {
    const res = await needle('get', url)

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
};

app.get('/save-news', async (req, res)=>{
    const API_KEY = 'b5ea592d1b214361bd99aa5445d62310';
    const url = `https://newsapi.org/v2/everything?q=tesla&from=2023-06-07&sortBy=publishedAt&apiKey=${API_KEY}`;
    const response = await getNews(url);

    clearData();

    if (response.status=='ok') {
        response.articles.map((newsArticle)=>{
            storeData(newsArticle)
        })
        res.send(response.status)
    } else {
        throw new Error('Unsuccessful request');
    }
})

app.get('/get-news', async(req, res)=>{
    const ar = await getData()
    res.send(ar)
})

app.listen(5000, (req, res) => {
    console.log('server is running on port 5000')
})