const $ = (sel) => document.querySelector(sel);

const loadForm = $("#load-form"), loadBtn = $("#load-btn"), urlInput = $("#url");
const askForm = $("#ask-form"), askBtn = $("#ask-btn"), qInput = $("#q");
const statusEl = $("#status"), intro = $("#intro"), stage = $("#stage");
const player = $("#player"), titleEl = $("#video-title"), log = $("#log");

let videoId = null;

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

async function post(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong. Try again.");
  return data;
}

function embedUrl(start = 0, autoplay = false) {
  const params = new URLSearchParams({ start: String(start) });
  if (autoplay) params.set("autoplay", "1");
  return `https://www.youtube.com/embed/${videoId}?${params}`;
}

function addMessage(kind, text) {
  const li = document.createElement("li");
  li.className = `msg ${kind}`;
  const p = document.createElement("p");
  p.textContent = text;
  li.appendChild(p);
  log.appendChild(li);
  li.scrollIntoView({ block: "nearest" });
  return li;
}

function addSources(li, sources) {
  if (!sources.length) return;
  const details = document.createElement("details");
  details.className = "sources";
  details.open = true;
  const summary = document.createElement("summary");
  summary.textContent = `Moments in the video (${sources.length})`;
  details.appendChild(summary);

  const ul = document.createElement("ul");
  for (const s of sources) {
    const row = document.createElement("li");
    const stamp = document.createElement("button");
    stamp.type = "button";
    stamp.className = "stamp";
    stamp.textContent = s.stamp;
    stamp.setAttribute("aria-label", `Play from ${s.stamp}`);
    stamp.addEventListener("click", () => { player.src = embedUrl(s.start, true); });

    const excerpt = document.createElement("p");
    excerpt.className = "excerpt";
    const mark = document.createElement("mark");
    mark.textContent = s.text;
    excerpt.appendChild(mark);

    row.append(stamp, excerpt);
    ul.appendChild(row);
  }
  details.appendChild(ul);
  li.appendChild(details);
}

loadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loadBtn.disabled = true;
  setStatus("Reading the transcript. A new video can take a minute the first time.");
  try {
    const data = await post("/api/load", { url: urlInput.value });
    videoId = data.video_id;
    player.src = embedUrl();
    titleEl.textContent = data.title || "";
    log.replaceChildren();
    addMessage("note", "Video loaded. Ask anything about what's said in it.");
    intro.hidden = true;
    stage.hidden = false;
    setStatus("");
    qInput.focus();
  } catch (err) {
    setStatus(err.message, true);
  } finally {
    loadBtn.disabled = false;
  }
});

askForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = qInput.value.trim();
  if (!question || !videoId) return;
  qInput.value = "";
  askBtn.disabled = true;
  addMessage("user", question);
  const pending = addMessage("pending", "Searching the transcript…");
  try {
    const data = await post("/api/ask", { video_id: videoId, question });
    pending.remove();
    const li = addMessage("bot", data.answer);
    addSources(li, data.sources);
    li.scrollIntoView({ block: "nearest" });
  } catch (err) {
    pending.remove();
    addMessage("error", err.message);
  } finally {
    askBtn.disabled = false;
    qInput.focus();
  }
});

qInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    askForm.requestSubmit();
  }
});
