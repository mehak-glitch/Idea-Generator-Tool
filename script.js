const ideas = {
  tech: ["A no-code website builder", "Decentralized file sharing", "Voice-based coding platform"],
  fashion: ["AI fashion stylist", "Virtual try-on mirror", "Eco-friendly fabric marketplace"],
  ai: ["AI therapist chatbot", "Generative story builder", "AI tutor for students"],
  edtech: ["Gamified learning platform", "Doubt solving live assistant", "Quiz generator for teachers"]
};

const ideaBox = document.getElementById("ideaBox");
const generateBtn = document.getElementById("generateBtn");
const categorySelect = document.getElementById("categorySelect");
const saveBtn = document.getElementById("saveBtn");
const explainBtn = document.getElementById("explainBtn");
const exportBtn = document.getElementById("exportBtn");
const favoritesBtn = document.getElementById("favoritesBtn");
const favoritesModal = document.getElementById("favoritesModal");
const favoritesList = document.getElementById("favoritesList");
const closeModal = document.getElementById("closeModal");
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const themeToggle = document.getElementById("themeToggle");

let currentIdea = "";

function getRandomIdea(category) {
  if (category === "random") {
    const allIdeas = Object.values(ideas).flat();
    return allIdeas[Math.floor(Math.random() * allIdeas.length)];
  } else {
    const catIdeas = ideas[category];
    return catIdeas[Math.floor(Math.random() * catIdeas.length)];
  }
}

generateBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  currentIdea = getRandomIdea(category);
  ideaBox.classList.remove("animated-box");
  void ideaBox.offsetWidth; // trigger reflow
  ideaBox.classList.add("animated-box");
  ideaBox.innerText = currentIdea;
});

saveBtn.addEventListener("click", () => {
  if (!currentIdea) return alert("Generate an idea first!");
  let saved = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!saved.includes(currentIdea)) {
    saved.push(currentIdea);
    localStorage.setItem("favorites", JSON.stringify(saved));
    alert("Saved to favorites! ❤️");
  } else {
    alert("Already in favorites!");
  }
});

explainBtn.addEventListener("click", () => {
  if (!currentIdea) return alert("Generate an idea first!");
  alert(`🧠 Explanation:\nThis idea explores how to use innovative thinking to improve ${categorySelect.value.toUpperCase()} using modern tech.`);
});

favoritesBtn.addEventListener("click", () => {
  favoritesList.innerHTML = "";
  let saved = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!saved.length) {
    favoritesList.innerHTML = "<li>No favorites yet!</li>";
  } else {
    saved.forEach((idea, idx) => {
      const li = document.createElement("li");
      li.innerText = `${idx + 1}. ${idea}`;
      favoritesList.appendChild(li);
    });
  }
  favoritesModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  favoritesModal.classList.add("hidden");
});

exportBtn.addEventListener("click", () => {
  const saved = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!saved.length) return alert("No favorites to export!");
  const blob = new Blob([saved.join("\n")], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "favorite_ideas.txt";
  a.click();
});

likeBtn.addEventListener("click", () => {
  alert("Thanks for the like! 👍");
});
dislikeBtn.addEventListener("click", () => {
  alert("We'll try to improve! 👎");
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
