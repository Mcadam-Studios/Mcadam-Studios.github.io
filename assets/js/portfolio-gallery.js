(() => {
  const modal = document.getElementById("galleryModal");
  const grid = document.getElementById("galleryGrid");
  const titleEl = document.getElementById("galleryTitle");
  const subEl = document.getElementById("gallerySub");

  // Viewer is optional. If you don't have it, this code won't break.
  const viewer = document.getElementById("viewer");
  const viewerImg = document.getElementById("viewerImg");

  if (!modal || !grid || !titleEl || !subEl) return;

  // ---- YOUR DATA ----
  const GALLERIES = {
    "business-cards": {
      title: "Business Cards",
      sub: "Click a thumbnail to view full size.",
      items: [
        { src: "assets/img/business_cards/aat_tyre_mchanics/aat_front.jpg", name: "Business Card", company: "AAT Tyre Mechanics" },
        { src: "assets/img/business_cards/aat_tyre_mchanics/aat_back.jpg", name: "Business Card", company: "AAT Tyre Mechanics" },
        { src: "assets/img/business_cards/dovervaleting&design/dovervaletmockup.png", name: "Business Card", company: "Dover Valeting & Design" },
        { src: "assets/img/business_cards/dovervaleting&design/dovervaletfront.png", name: "Business Card", company: "Dover Valeting & Design" },
        { src: "assets/img/business_cards/dovervaleting&design/dovervaletback.png", name: "Business Card", company: "Dover Valeting & Design" },
        { src: "assets/img/business_cards/tridenttrafficmanagement/trident3dmockup.png", name: "Business Card", company: "Trident Traffic Management" },
        { src: "assets/img/business_cards/tridenttrafficmanagement/tridentfront.png", name: "Business Card", company: "Trident Traffic Management" },
        { src: "assets/img/business_cards/tridenttrafficmanagement/tridentback.png", name: "Business Card", company: "Trident Traffic Management" },
        { src: "assets/img/business_cards/wdconstruction/WD.3DMockUp.png", name: "Business Card", company: "WD Construction" },
        { src: "assets/img/business_cards/wdconstruction/W.D Construction busines card.png", name: "Business Card", company: "WD Construction" },
      ]
    },

    "leaflets-flyers": {
      title: "Leaflets / Flyers",
      sub: "A selection of flyer and leaflet designs.",
      items: [
        { src: "assets/img/leaflets/flyers/bhgroundworks/b-and-h-groundwork-flyers.jpg", name: "Flyer", company: "B&H Groundwork" },
        { src: "assets/img/leaflets/flyers/leisureleague/Leisure League Flyers.jpg", name: "Leaflet", company: "Leisure League" },
        { src: "assets/img/leaflets/flyers/tridenttrafficflyers/tridentflyerfront.png", name: "Flyer", company: "Trident Traffic Management" },
        { src: "assets/img/leaflets/flyers/tridenttrafficflyers/tridentflyerback.png", name: "Flyer", company: "Trident Traffic Management" },
      ]
    },

    "drinks-menus": {
      title: "Drinks Menus",
      sub: "Cocktail and beverage menus with elegant typography.",
      items: [
        { src: "assets/img/menus/drinks/yesspleasemumma/VIPMenuYessPleaseMumma.png", name: "Drinks Menu", company: "Yess Please Mumma" },
        { src: "assets/img/menus/drinks/yesspleasemumma/yespleasemamma1.png", name: "Drinks Menu", company: "Yes Please Mumma" },
        { src: "assets/img/menus/drinks/yesspleasemumma/yespleasemamma2.png", name: "Drinks Menu", company: "Yes Please Mumma" }
      ]
    },

    "logos": {
      title: "Logos",
      sub: "Branded identity systems with scalable graphics.",
      items: [
        { src: "assets/img/logos/lacuts/lacutslogo.jpg", name: "Logo", company: "La Cuts" },
        { src: "assets/img/logos/lillieslodge/lillieslodgelogo.jpg", name: "Logo", company: "Lilac" },
        { src: "assets/img/logos/cmcollectibles/cmcollectibleslogo.jpg", name: "Logo", company: "CM Collectibles" },
        { src: "assets/img/logos/wdconstruction/wdconstruction.jpg", name: "Logo", company: "WD Construction" }
      ]
    }
  };

  function escapeHtml(str){
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function openModal(categoryKey){
    const cat = GALLERIES[categoryKey];
    if (!cat) return;

    titleEl.textContent = cat.title;
    subEl.textContent = cat.sub || "";

    grid.innerHTML = cat.items.map((it) => `
      <div class="gItem" data-full="${it.src}" data-alt="${escapeHtml(it.company)} — ${escapeHtml(it.name)}">
        <img class="gThumb" src="${it.src}" alt="${escapeHtml(it.name)} for ${escapeHtml(it.company)}" loading="lazy">
        <div class="gCap">
          <p class="gName">${escapeHtml(it.name)}</p>
          <p class="gCompany">${escapeHtml(it.company)}</p>
        </div>
      </div>
    `).join("");

    modal.classList.add("isOpen");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("galleryOpen");
  }

  function closeModal(){
    modal.classList.remove("isOpen");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("galleryOpen");
    if (viewer) closeViewer();
  }

  function openViewer(src, alt){
    if (!viewer || !viewerImg) return;
    viewerImg.src = src;
    viewerImg.alt = alt || "Preview";
    viewer.classList.add("isOpen");
    viewer.setAttribute("aria-hidden", "false");
  }

  function closeViewer(){
    if (!viewer || !viewerImg) return;
    viewer.classList.remove("isOpen");
    viewer.setAttribute("aria-hidden", "true");
    viewerImg.src = "";
    viewerImg.alt = "";
  }

  // One click handler (no duplicates)
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-gallery]");
    if (openBtn){
      e.preventDefault();
      openModal(openBtn.getAttribute("data-gallery"));
      return;
    }

    if (e.target.closest("[data-close]")){
      closeModal();
      return;
    }

    const item = e.target.closest(".gItem");
    if (item && modal.classList.contains("isOpen")){
      openViewer(item.getAttribute("data-full"), item.getAttribute("data-alt"));
      return;
    }

    if (e.target.closest("[data-viewer-close]")){
      closeViewer();
      return;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (viewer && viewer.classList.contains("isOpen")) closeViewer();
    else if (modal.classList.contains("isOpen")) closeModal();
  });

}
)();