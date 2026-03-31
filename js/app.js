document.addEventListener("DOMContentLoaded", () => {
  let lang = localStorage.getItem("lang") || "english";
  let page = document.body.getAttribute("data-page") || "general";
  loadLiveRSS(page, page + "-news", lang);
});

function searchNews() {
  let input=document.getElementById("search").value.toLowerCase();

  document.querySelectorAll(".news-card").forEach(card=>{
    card.style.display =
      card.innerText.toLowerCase().includes(input) ? "block":"none";
  });
}

function summarizeText(btn){
  let desc = btn.closest(".news-content").querySelector(".desc");

  let temp=document.createElement("div");
  temp.innerHTML=desc.innerHTML;

  let clean=temp.innerText;
  desc.innerText = clean.split(".").slice(0,2).join(".")+"...";
}

function summarizeAll(){
  document.querySelectorAll("button").forEach(b=>{
    if(b.innerText.includes("🧠")) b.click();
  });
}

async function translateText(btn){
  let title = btn.closest(".news-content").querySelector(".title").innerText;

  let res=await fetch(
    "https://api.mymemory.translated.net/get?q=" +
    encodeURIComponent(title) +
    "&langpair=en|hi"
  );

  let data=await res.json();

  btn.closest(".news-content").querySelector(".title").innerText =
    data.responseData.translatedText;
}

function translateAll(){
  document.querySelectorAll("button").forEach(b=>{
    if(b.innerText.includes("🌐")) b.click();
  });
}

function speakNews(btn){
  let text=btn.closest(".news-content").innerText;

  let speech=new SpeechSynthesisUtterance(text);
  speechSynthesis.cancel();
  speechSynthesis.speak(speech);
}

function highlightKeywords(){
  document.querySelectorAll(".title").forEach(t=>{
    if(t.innerText.toLowerCase().includes("war")){
      t.style.color="red";
    }
  });
}