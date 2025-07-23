const ideas = {
  tech: [
    "No-code website builder",
    "AI bug detector for devs",
    "Privacy-first search engine",
    "Remote work productivity dashboard"
  ],
  edtech: [
    "Gamified language learning for kids",
    "Peer-to-peer tutoring marketplace",
    "AI teaching assistant for classrooms"
  ],
  fashion: [
    "AI stylist for Instagram looks",
    "Rental outfit marketplace",
    "Custom virtual fitting room"
  ],
  content: [
    "Blog: Tech for non-techies",
    "Podcast: Founders under 25",
    "YouTube: Daily UI clone challenge"
  ],
  names: [
    "MindMeld", "SwiftCollab", "IdeaSpark", "TrendForge"
  ]
};

const explanations = {
  "No-code website builder": "Allows users to create websites without writing code, using drag-and-drop tools.",
  "AI bug detector for devs": "Uses machine learning to analyze code and spot potential bugs automatically.",
  "MindMeld": "A name suggesting a deep connection between ideas, great for a brainstorming app."
};

let currentIdea = "";
const box = document.getElementById("idea-box");

document.getElementById("generate").addEventListener("click", () => {
  const category = document.getElementById("category").value;
  const list = ideas[category];
  const idea = list[Math.floor(Math.random() * list.length)];
  currentIdea = idea;
  box.classList.remove("animated");
  void box.offsetWidth; // force reflow
  box.classList.add("animated");
  box.textContent = idea;
});

document.getElementById("save").addEventListener("click", () => {
  if (!currentIdea) return;
  let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favs.includes(currentIdea)) {
    favs.push(currentIdea);
    localStorage.setItem("favorites", JSON.stringify(favs));
    alert("Saved to favorites!");
  }
});

document.getElementById("show-favorites").addEventListener("click", () => {
  let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  const favDiv = document.getElementById("favorites");
  favDiv.innerHTML = "<h3>Favorites</h3>";
  favs.forEach((idea, idx) => {
    favDiv.innerHTML += `<div>${idea} <button onclick="removeFavorite(${idx})">❌</button></div>`;
  });
});

function removeFavorite(idx) {
  let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  favs.splice(idx, 1);
  localStorage.setItem("favorites", JSON.stringify(favs));
  document.getElementById("show-favorites").click(); // refresh
}

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("explain").addEventListener("click", () => {
  alert(explanations[currentIdea] || "No explanation available.");
});

document.getElementById("like").addEventListener("click", () => {
  alert("👍 You liked this idea!");
});

document.getElementById("dislike").addEventListener("click", () => {
  alert("👎 You disliked this idea!");
});

document.getElementById("export-favorites").addEventListener("click", () => {
  let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (favs.length === 0) return alert("No favorites to export!");
  const blob = new Blob([favs.join("\n")], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "favorites.txt";
  a.click();
});
