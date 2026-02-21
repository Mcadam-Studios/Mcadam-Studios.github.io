(() => {
  const modal = document.getElementById("galleryModal");
  const grid = document.getElementById("galleryGrid");
  const titleEl = document.getElementById("galleryTitle");
  const subEl = document.getElementById("gallerySub");

  const viewer = document.getElementById("viewer");
  const viewerImg = document.getElementById("viewerImg");

  if (!modal || !grid) return;

  // ---- EDIT THIS DATA ----
  // Add items under each category. Each item needs:
  // - src: image path
  // - name: label (e.g. "Business Card")
  // - company: company name shown under thumbnail
  // Tip: keep files in /assets/img/portfolio/business-cards/... etc.
  const GALLERIES = {
  
    "business-cards": {
      title: "Business Cards",
      sub: "Click a thumbnail to view full size.",
      items: [
        { src: "assets/img/business_cards/aat_tyre_mchanics/aat_front.jpg", name: "Business Card", company: "AAT Tyre Mechanics" },
        { src: "assets/img/business_cards/aat_tyre_mchanics/aat_back.jpg", name: "Business Card", company: "AAT Tyre Mechanics" },
        { src: "assets/img/business_cards/dovervaleting&design/dovervalet3DMockup.png", name: "Business Card", company: "Dover Valeting & Design" },
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
        { src: "assets/img/leaflets/flyers/b&hgroundworks/B&H Groundwork Flyers.jpg", name: "Flyer", company: "B&H Groundwork" },
            { src: "assets/img/leaflets/flyers/leisureleague/Leisure League Flyers.jpg", name: "Leaflet", company: "Leisure League" },
            { src: "assets/img/leaflets/flyers/tridenttrafficflyers/tridentflyerfront.png", name: "Flyer", company: "Trident Traffic Management" },
                { src: "assets/img/leaflets/flyers/tridenttrafficflyers/tridentflyerback.png", name: "Flyer", company: "Trident Traffic Management" },
            
      ]
    },
    "business-signs": {
      title: "Business Signs",
      sub: "Signage designs built for clarity and distance readability.",
      items: [
        { src: "assets/img/portfolio/signs/company-a-sign.jpg", name: "Sign", company: "Company A" },
      ]
    },
    "birthday-invitations": {
      title: "Birthday Invitations",
      sub: "Ticket-style and themed invitation designs.",
      items: [
        { src: "assets/img/portfolio/invitations/birthday-1.jpg", name: "Invitation", company: "Private Client" },
      ]
    },
    "holy-communion-invitations": {
      title: "Holy Communion Invitations",
      sub: "Elegant layouts and print-ready exports.",
      items: [
        { src: "assets/img/portfolio/invitations/communion-1.jpg", name: "Invitation", company: "Private Client" },
      ]
    },

    "drinks-menus": {
      title: "Drinks Menus",
      sub: "Cocktail and beverage menus with elegant typography.",
      items: [
        { src: "assets/img/menus/drinks/yesspleasemumma/VIPMenuYessPleaseMumma.png", name: "Drinks Menu", company: "Yess Please Mumma" },
        { src: "assets/img/menus/drinks/yespleasemumma/yespleasemamma1.png", name: "Drinks Menu", company: "Yes Please Mumma" },
        { src: "assets/img/menus/drinks/leisureleague/yespleasemamma2.png", name: "Drinks Menu", company: "Yes Please Mumma" },  ]
    }
       
  };

  function openModal(categoryKey){
    const cat = GALLERIES[categoryKey];
    if (!cat) return;

    titleEl.textContent = cat.title;
    subEl.textContent = cat.sub || "";

    grid.innerHTML = cat.items.map((it, idx) => `
      <div class="gItem" data-full="${it.src}" data-alt="${escapeHtml(it.company)} — ${escapeHtml(it.name)}">
        <img class="gThumb" src="${it.src}" alt="${escapeHtml(it.name)} for ${escapeHtml(it.company)}">
        <div class="gCap">
          <p class="gName">${escapeHtml(it.name)}</p>
          <p class="gCompany">${escapeHtml(it.company)}</p>
        </div>
      </div>
    `).join("");

    modal.classList.add("isOpen");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(){
    modal.classList.remove("isOpen");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openViewer(src, alt){
    viewerImg.src = src;
    viewerImg.alt = alt || "Preview";
    viewer.classList.add("isOpen");
    viewer.setAttribute("aria-hidden", "false");
  }

  function closeViewer(){
    viewer.classList.remove("isOpen");
    viewer.setAttribute("aria-hidden", "true");
    viewerImg.src = "";
    viewerImg.alt = "";
  }

  // Click on any element with data-gallery="category"
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-gallery]");
    if (openBtn){
      e.preventDefault();
      openModal(openBtn.getAttribute("data-gallery"));
      return;
    }

    // Close modal
    if (e.target.closest("[data-close]")){
      closeModal();
      return;
    }

    // Open viewer from a thumbnail
    const item = e.target.closest(".gItem");
    if (item && modal.classList.contains("isOpen")){
      openViewer(item.getAttribute("data-full"), item.getAttribute("data-alt"));
      return;
    }

    // Close viewer
    if (e.target.closest("[data-viewer-close]")){
      closeViewer();
      return;
    }
  });

  // ESC closes viewer first, then modal
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (viewer.classList.contains("isOpen")) closeViewer();
    else if (modal.classList.contains("isOpen")) closeModal();
  });

  function escapeHtml(str){
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
