/* Replace image:"" and checkout:"#" with your own art paths and payment URLs. */
const adopts = [
  { no:"021", collection:"celestial", name:"Lunara", price:"$30", theme:"Moonlit Pearl", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#8194c6","#d9c5eb"] },
  { no:"022", collection:"celestial", name:"Eclipse", price:"$35", theme:"Celestial Knight", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG","Palette card"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#343e69","#86648c"] },
  { no:"023", collection:"celestial", name:"Starryon", price:"$35", theme:"Starlit Guardian", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG","Star tag"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#5979b3","#abc4db"] },
  { no:"024", collection:"celestial", name:"Cometveil", price:"$35", theme:"Midnight Comet", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG","Palette card"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#303b72","#7f73bc"] },
  { no:"025", collection:"celestial", name:"Astralace", price:"$38", theme:"Celestial Lace", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG","Detail sheet"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#4c477f","#c494bc"] },
  { no:"026", collection:"celestial", name:"Moonpetal", price:"$35", theme:"Lunar Flower", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG","Palette card"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#474276","#ad78a7"] },

  { no:"027", collection:"garden", name:"Nightbloom", price:"$30", theme:"Twilight Garden", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#382d63","#80517e"] },
  { no:"028", collection:"garden", name:"Rosethread", price:"$30", theme:"Rose Ribbon", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#8f526f","#e6a1b7"] },
  { no:"029", collection:"garden", name:"Cloudberry", price:"$28", theme:"Cloud Orchard", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#758a77","#cda9bd"] },
  { no:"030", collection:"garden", name:"Mosswhisper", price:"$32", theme:"Ancient Moss Grove", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#405d4a","#9ca976"] },
  { no:"031", collection:"garden", name:"Fernlace", price:"$35", theme:"Woodland Lace", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG","Palette card"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#526c59","#c0a58a"] },
  { no:"032", collection:"garden", name:"Dewbell", price:"$28", theme:"Morning Bellflower", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#668a83","#b8d7c5"] },

  { no:"033", collection:"sugar", name:"Berrydaze", price:"$28", theme:"Strawberry Comet", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#d578a5","#f3b5ca"] },
  { no:"034", collection:"sugar", name:"Goldwisp", price:"$32", theme:"Honey Star Cake", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG","Palette card"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#a78991","#e4c595"] },
  { no:"035", collection:"sugar", name:"Daydream", price:"$32", theme:"Peach Cream Reverie", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#b7788f","#f0c499"] },
  { no:"036", collection:"sugar", name:"Sugarmint", price:"$30", theme:"Mint Carousel Candy", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#65a394","#d4ead0"] },
  { no:"037", collection:"sugar", name:"Plumparfait", price:"$35", theme:"Plum Parfait", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG","Palette card"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#77507e","#d79ab7"] },
  { no:"038", collection:"sugar", name:"Honeyglaze", price:"$35", theme:"Golden Pastry", created:"2026", usage:"Personal use", includes:["Full-resolution art","Transparent PNG","Detail card"], status:"available", image:"", checkout:"#replace-with-checkout", colors:["#a66f58","#e8bf85"] },
];

const collections = {
  celestial: { title:"Celestial Reverie", symbol:"✦", copy:"Moonlit designs gathered from dreams, constellations, and distant skies." },
  garden: { title:"Enchanted Garden", symbol:"✿", copy:"Soft woodland keepsakes inspired by flowers, moss, ribbons, and morning dew." },
  sugar: { title:"Sugar Carousel", symbol:"◇", copy:"Playful confectionery designs spun from fruit, pastries, cream, and candy colors." },
};

const shelf = document.querySelector("#shelf");
const details = document.querySelector("#detailSpace");
const hint = document.querySelector("#shelfHint");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalContent");
let view = "celestial";
let selected = null;
let rowSize = window.matchMedia("(max-width: 760px)").matches ? 2 : 3;

function currentList() {
  return adopts.filter((adopt) => adopt.collection === view);
}

function cardMarkup(adopt, index) {
  const imageStyle = adopt.image ? `--image:url('${adopt.image}')` : "";
  return `
    <span class="hanger" aria-hidden="true"><i></i><b></b></span>
    <span class="tag-card">
      <span class="adopt-image" style="${imageStyle}">${adopt.image ? "" : `<span class="placeholder-person">${String.fromCharCode(65 + index)}</span>`}</span>
      <span class="card-info">
        <small>NO. ${adopt.no}</small><strong>${adopt.name}</strong><b>${adopt.price}</b>
        ${adopt.status === "available" ? "<span class='available-dot'>Available</span>" : ""}
      </span>
    </span>`;
}

function makeCard(adopt, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `adopt-card${selected?.no === adopt.no ? " selected" : ""}`;
  button.style.cssText = `--a:${adopt.colors[0]};--b:${adopt.colors[1]}`;
  button.setAttribute("aria-label", `${adopt.name}, ${adopt.price}`);
  button.setAttribute("aria-pressed", selected?.no === adopt.no ? "true" : "false");
  button.innerHTML = cardMarkup(adopt, index);
  button.addEventListener("click", () => selectAdopt(adopt));
  return button;
}

function renderShelf() {
  const list = currentList();
  const collection = collections[view];
  document.querySelector(".shop").dataset.collection = view;
  document.querySelector("#collectionSymbol").textContent = collection.symbol;
  document.querySelector("#collectionTitle").textContent = collection.title;
  document.querySelector("#collectionCopy").textContent = collection.copy;
  shelf.innerHTML = "";
  for (let start = 0; start < list.length; start += rowSize) {
    const row = document.createElement("div");
    row.className = "adopt-row";
    row.style.setProperty("--columns", Math.min(rowSize, list.length - start));
    row.innerHTML = `<div class="string-light" aria-hidden="true"><span></span></div>`;
    list.slice(start, start + rowSize).forEach((adopt, offset) => row.appendChild(makeCard(adopt, start + offset)));
    shelf.appendChild(row);
  }
  shelf.querySelectorAll(".adopt-card").forEach((card) => {
    if (selected && !card.classList.contains("selected")) card.classList.add("dimmed");
  });
  hint.textContent = `Select one of the six ${collection.title} charms to see its full details.`;
}

function selectAdopt(adopt) {
  selected = adopt;
  renderShelf();
  const portraitStyle = adopt.image ? `--image:url('${adopt.image}')` : "";
  details.innerHTML = `
    <div class="reveal-chain" aria-hidden="true"><i></i></div>
    <article class="detail-plaque" style="--a:${adopt.colors[0]};--b:${adopt.colors[1]}">
      <div class="plaque-stars" aria-hidden="true">✦　·　✧</div>
      <div class="portrait-charm">
        <span class="charm-bow" aria-hidden="true"></span>
        <div class="star-portrait" style="${portraitStyle}">${adopt.image ? "" : "<span class='placeholder-person'>✦</span>"}</div>
        <span class="mini-charm" aria-hidden="true"><i></i>✦</span>
      </div>
      <div class="detail-copy">
        <small>NO. ${adopt.no}</small>
        <h2>${adopt.name}</h2>
        <dl class="detail-meta">
          <dt>Created</dt><dd>${adopt.created}</dd>
          <dt>Theme</dt><dd>${adopt.theme}</dd>
          <dt>Includes</dt><dd>${adopt.includes.join(" · ")}</dd>
          <dt>Rights</dt><dd>${adopt.usage}</dd>
        </dl>
        <div class="purchase-line">
          <strong>${adopt.price}</strong>
          <button class='claim'>✦ Claim this star ✦</button>
        </div>
      </div>
      <button class="close-charm" type="button" aria-label="Close details">↑</button>
    </article>`;
  details.querySelector(".close-charm").addEventListener("click", closeDetails);
  const claim = details.querySelector(".claim");
  if (claim) claim.addEventListener("click", () => openCheckout(adopt));
  details.scrollIntoView({ behavior:"smooth", block:"center" });
}

function emptyDetails() {
  return '<div class="empty-detail"><span>✦</span><p>A character’s star charm will appear here.</p></div>';
}

function closeDetails() {
  selected = null;
  renderShelf();
  details.innerHTML = emptyDetails();
  shelf.scrollIntoView({ behavior:"smooth", block:"center" });
}

function openCheckout(adopt) {
  modalContent.innerHTML = `<h2>Claim ${adopt.name}</h2><p>You are about to continue to the payment page for <strong>${adopt.price}</strong>.</p><p>Included: ${adopt.includes.join(", ")}. ${adopt.usage}.</p><p>This prototype does not process payment directly. Replace the checkout URL in <code>script.js</code>.</p><a class="pay-link" href="${adopt.checkout}" target="_blank" rel="noopener">Continue to payment</a>`;
  modal.showModal();
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => {
    view = button.dataset.view;
    selected = null;
    document.querySelectorAll(".nav-button").forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("selected", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
    details.innerHTML = emptyDetails();
    renderShelf();
  });
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const nextSize = window.matchMedia("(max-width: 760px)").matches ? 2 : 3;
    if (nextSize !== rowSize) { rowSize = nextSize; renderShelf(); }
  }, 120);
});

document.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });
renderShelf();

/* Keeps a cross-origin Carrd iframe fitted to this transparent shop. */
function reportAdoptHeight() {
  const height = Math.ceil(document.querySelector(".shop").getBoundingClientRect().height);
  window.parent.postMessage({ type: "velune-adopts-height", height }, "*");
}

new ResizeObserver(reportAdoptHeight).observe(document.querySelector(".shop"));
window.addEventListener("load", reportAdoptHeight);
window.addEventListener("resize", reportAdoptHeight);
setTimeout(reportAdoptHeight, 150);
