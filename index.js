const target = document.querySelector("#recent-notes");

try {
  const response = await fetch("https://barasch.github.io/notes/index.html", { cache: "no-cache" });
  if (!response.ok) throw new Error("Notes index unavailable");

  const source = new DOMParser().parseFromString(await response.text(), "text/html");
  const entries = [...source.querySelectorAll(".notes-list > li")].slice(0, 3);

  for (const entry of entries) {
    const sourceLink = entry.querySelector("a");
    if (!sourceLink) continue;

    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = new URL(sourceLink.getAttribute("href"), "https://barasch.github.io/notes/").href;
    link.textContent = sourceLink.textContent.trim();
    item.append(link);

    const time = entry.querySelector("time");
    if (time) {
      const date = document.createElement("time");
      date.dateTime = time.dateTime;
      date.textContent = ` — ${time.textContent.trim()}`;
      item.append(date);
    }

    target.append(item);
  }
} catch {
  // An unavailable or empty Notes index should leave the preview blank.
}
