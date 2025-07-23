const ideas = [
  {
    category: "tech",
    idea: "AI-powered code reviewer",
    explanation: "A tool that scans your code, suggests improvements, and detects bugs using AI."
  },
  {
    category: "ai",
    idea: "Voice cloning for digital assistants",
    explanation: "Users can clone their voice for smart assistants like Alexa, Siri, etc."
  },
  {
    category: "fashion",
    idea: "Virtual try-on mirror",
    explanation: "Augmented reality mirror that lets you try clothes virtually."
  },
  {
    category: "edtech",
    idea: "Peer-to-peer tutoring platform",
    explanation: "Students can sign up to tutor each other and earn rewards or points."
  },
  {
    category: "content",
    idea: "Blog: Tech for non-techies",
    explanation: "A blog that simplifies tech trends, tools, and news for everyday users."
  },
  {
    category: "names",
    idea: "Brand name: SwiftCollab",
    explanation: "Name for a team productivity app that helps teams collaborate quickly."
  }
];

let currentIdea = null;
const ideaText = document.getElementById("idea-text");
const explanationText = document.getElementById("idea-explanation");

document.getElementById("generate").addEventListener("click", () => {
  const category = document.getElementById("category").value;
  const filtered = category === "all" ? ideas : ideas.filter(i => i.category === category);
  const idea = filtered[Math.floor(Math.random() * filtered.length)];
  currentIdea = idea;
  ideaText.innerText = idea.idea;
  explanationText.innerText = "";
});

document.getElementById("explain").addEventListener("click", () => {
  if (currentIdea) {
    explanationText.innerText = currentIdea.explanation;
  }
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

document.getElementById("save").addEventListener("click", () => {
  if (currentIdea) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.some(f => f.idea === currentIdea.idea)) {
      favorites.push(currentIdea);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Saved to favorites!");
    } else {
      alert("Already in favorites!");
    }
  }
});

document.getElementById("view-favorites").addEventListener("click", () => {
  const list = document.getElementById("favorites");
  const wrapper = document.getElementById("favorites-list");
  list.innerHTML = "";
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.length === 0) {
    list.innerHTML = "<li>No favorites yet!</li>";
  } else {
    favorites.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.idea} - ${item.explanation}`;
      list.appendChild(li);
    });
  }
  wrapper.classList.toggle("hidden");
});

document.getElementById("export-json").addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("favorites")) || [];
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "my_favorite_ideas.json";
  a.click();
  URL.revokeObjectURL(url);
});

// Voting just for interaction (can enhance)
document.getElementById("like").addEventListener("click", () => {
  alert("👍 Thanks for liking the idea!");
});

document.getElementById("dislike").addEventListener("click", () => {
  alert("👎 We'll try to improve!");
});
