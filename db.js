const mongoose = require('mongoose');

const uri = "mongodb+srv://vignesh123:17405crl@cluster0.lmh8jwz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => console.log('database is connected..!'))
    .catch((err) => console.error(err));

const newsSchema = new mongoose.Schema({
    source_name: Object,
    author: Object,
    title: Object,
    description: Object,
    image: Object,
    content: Object
})

const news = new mongoose.model('news', newsSchema)

async function clearData() {
    await obj.deleteMany({});
}

async function storeData(item) {
    const obj = new news({
        source_name: item.source.name,
        author: item.author,
        title: item.title,
        description: item.description,
        image: item.urlToImage,
        content: item.content
    })
    await obj.save()
}

async function getData() {
    const latestNews = await news.find({});
    return latestNews;
}

module.exports = {storeData, getData, clearData};