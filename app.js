const videos = [
  {
    id: 1,
    title: "City Timelapse in 4K",
    channel: "Urban Lens",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1000&q=80",
    comments: ["Amazing color grading!", "Feels cinematic."],
  },
  {
    id: 2,
    title: "Cozy Coding Setup Tour",
    channel: "Dev Corner",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    thumbnail:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1000&q=80",
    comments: ["Need that keyboard!"],
  },
  {
    id: 3,
    title: "Mountain Drone Adventure",
    channel: "Trail Shots",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
    comments: ["The scenery is unreal."],
  },
  {
    id: 4,
    title: "Lo-fi Beats for Study",
    channel: "Night Room",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80",
    comments: ["Perfect for deep work sessions."],
  },
  {
    id: 5,
    title: "Street Food Tour",
    channel: "Taste Map",
    src: "https://www.w3schools.com/html/movie.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80",
    comments: ["Now I'm hungry."],
  },
  {
    id: 6,
    title: "Morning Yoga Flow",
    channel: "Breathe Daily",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    thumbnail:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
    comments: ["Great routine!"],
  },
];

const elements = {
  homeView: document.getElementById("homeView"),
  playerView: document.getElementById("playerView"),
  videoGrid: document.getElementById("videoGrid"),
  searchInput: document.getElementById("searchInput"),
  videoElement: document.getElementById("videoElement"),
  playerTitle: document.getElementById("playerTitle"),
  playerChannel: document.getElementById("playerChannel"),
  backButton: document.getElementById("backButton"),
  playPauseBtn: document.getElementById("playPauseBtn"),
  volumeSlider: document.getElementById("volumeSlider"),
  fullscreenBtn: document.getElementById("fullscreenBtn"),
  likeBtn: document.getElementById("likeBtn"),
  dislikeBtn: document.getElementById("dislikeBtn"),
  commentForm: document.getElementById("commentForm"),
  commentInput: document.getElementById("commentInput"),
  commentList: document.getElementById("commentList"),
  recommendedList: document.getElementById("recommendedList"),
};

let selectedVideo = null;

const reactions = videos.reduce((acc, video) => {
  acc[video.id] = { likes: 0, dislikes: 0 };
  return acc;
}, {});

function renderGrid(items) {
  elements.videoGrid.innerHTML = items
    .map(
      (video) => `
      <article class="video-card" data-id="${video.id}">
        <img src="${video.thumbnail}" alt="${video.title}" />
        <div class="video-meta">
          <h3 class="video-title">${video.title}</h3>
          <p class="channel">${video.channel}</p>
        </div>
      </article>
    `
    )
    .join("");

  elements.videoGrid.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = Number(card.dataset.id);
      openPlayer(id);
    });
  });
}

function renderRecommended() {
  const items = videos.filter((video) => video.id !== selectedVideo.id);
  elements.recommendedList.innerHTML = items
    .map(
      (video) => `
      <article class="recommended-card" data-id="${video.id}">
        <img src="${video.thumbnail}" alt="${video.title}" />
        <div class="video-meta">
          <p class="video-title">${video.title}</p>
          <p class="channel">${video.channel}</p>
        </div>
      </article>
    `
    )
    .join("");

  elements.recommendedList.querySelectorAll(".recommended-card").forEach((card) => {
    card.addEventListener("click", () => openPlayer(Number(card.dataset.id)));
  });
}

function renderComments() {
  elements.commentList.innerHTML = selectedVideo.comments
    .map((comment) => `<li>${comment}</li>`)
    .join("");
}

function updateReactionText() {
  const reaction = reactions[selectedVideo.id];
  elements.likeBtn.querySelector("span").textContent = reaction.likes;
  elements.dislikeBtn.querySelector("span").textContent = reaction.dislikes;
}

function openPlayer(id) {
  selectedVideo = videos.find((video) => video.id === id);
  if (!selectedVideo) {
    return;
  }

  elements.videoElement.src = selectedVideo.src;
  elements.videoElement.poster = selectedVideo.thumbnail;
  elements.playerTitle.textContent = selectedVideo.title;
  elements.playerChannel.textContent = selectedVideo.channel;
  elements.playPauseBtn.textContent = "Play";

  renderComments();
  renderRecommended();
  updateReactionText();

  elements.homeView.classList.remove("active");
  elements.playerView.classList.add("active");
}

function openHome() {
  elements.videoElement.pause();
  elements.playerView.classList.remove("active");
  elements.homeView.classList.add("active");
}

elements.searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  const filtered = videos.filter((video) => {
    return (
      video.title.toLowerCase().includes(query) ||
      video.channel.toLowerCase().includes(query)
    );
  });
  renderGrid(filtered);
});

elements.backButton.addEventListener("click", openHome);

elements.playPauseBtn.addEventListener("click", () => {
  if (elements.videoElement.paused) {
    elements.videoElement.play();
    elements.playPauseBtn.textContent = "Pause";
  } else {
    elements.videoElement.pause();
    elements.playPauseBtn.textContent = "Play";
  }
});

elements.volumeSlider.addEventListener("input", (event) => {
  elements.videoElement.volume = Number(event.target.value);
});

elements.fullscreenBtn.addEventListener("click", async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await elements.videoElement.requestFullscreen();
  }
});

elements.likeBtn.addEventListener("click", () => {
  reactions[selectedVideo.id].likes += 1;
  updateReactionText();
});

elements.dislikeBtn.addEventListener("click", () => {
  reactions[selectedVideo.id].dislikes += 1;
  updateReactionText();
});

elements.commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = elements.commentInput.value.trim();
  if (!value) {
    return;
  }
  selectedVideo.comments.unshift(value);
  elements.commentInput.value = "";
  renderComments();
});

renderGrid(videos);
