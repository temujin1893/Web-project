const feeds = {
  english: {
    general: "https://feeds.bbci.co.uk/news/rss.xml",
    business: "https://feeds.bbci.co.uk/news/business/rss.xml",
    sports: "https://feeds.bbci.co.uk/sport/rss.xml",
    health: "https://feeds.bbci.co.uk/news/health/rss.xml",
    entertainment: "https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml"
  },
  tamil: { general: "https://feeds.bbci.co.uk/tamil/rss.xml" },
  bengali: { general: "https://feeds.bbci.co.uk/bengali/rss.xml" },
  hindi: { general: "https://feeds.bbci.co.uk/hindi/rss.xml" }
};

function loadLiveRSS(category, id, lang="english") {
  let url = feeds[lang][category] || feeds[lang].general;

  fetch("https://api.rss2json.com/v1/api.json?rss_url=" + url)
    .then(r => r.json())
    .then(data => {
      document.getElementById(id).innerHTML="";
      renderRSS(data.items,id);
    });
}

function renderRSS(items,id) {
  let c=document.getElementById(id);

  items.slice(0,10).forEach(n=>{
    let card=document.createElement("div");
    card.className="news-card";

    let img=n.thumbnail || "https://via.placeholder.com/600x400";

    card.innerHTML=`
      <img src="${img}">
      <div class="news-content">
        <h2 class="title">${n.title}</h2>
        <p class="desc">${n.description}</p>

        <button onclick="event.stopPropagation(); translateText(this)">🌐</button>
        <button onclick="event.stopPropagation(); summarizeText(this)">🧠</button>
        <button onclick="event.stopPropagation(); speakNews(this)">🎙️</button>
      </div>
    `;

    // open original news
    card.onclick = () => window.open(n.link, "_blank");

    c.appendChild(card);
  });
}