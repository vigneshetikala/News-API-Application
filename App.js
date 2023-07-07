import { useState, useEffect } from "react";

function App() {
  const [latestNews, updateLatestNews] = useState(null)

  const saveNewsInDb = async () => {
    await fetch('http://localhost:5000/save-news')
    console.log('News saved in DB')
  };

  const getNewsFromDb = async ()=>{
    const news = await fetch('http://localhost:5000/get-news')
    updateLatestNews(news)
    console.log('News retreived from DB')
  }

  useEffect(() => {
    saveNewsInDb()
  }, []);

  const renderNewsUI = ()=>{
    if(latestNews == null) return null;
    console.log(latestNews.length)
    const res = latestNews.map((item)=>(
      <h2>item.title</h2>
    ))
    return res;
  }

  return (
    <div className="App">
      <h1>News API Application</h1>
      <button onClick={getNewsFromDb}>GET LATEST NEWS</button>
      {renderNewsUI}
    </div>
  );
}

export default App;