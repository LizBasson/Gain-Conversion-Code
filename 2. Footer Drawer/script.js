(async function () {
    // Inject Swiper CSS & JS
    const swiperCSS = document.createElement('link');
    swiperCSS.rel = 'stylesheet';
    swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css';
    document.head.appendChild(swiperCSS);

    const swiperScript = document.createElement('script');
    swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js';
    swiperScript.onload = initSwiperDrawer;
    document.head.appendChild(swiperScript);

    function initSwiperDrawer() {
        const drawer = document.createElement('div');
        drawer.id = 'custom-footer-drawer';
        drawer.innerHTML = `
      <div class="drawer-overlay" id="drawer-overlay"></div>
      <div class="drawer-tab" id="drawer-toggle">
        <span>Sticky Pokemon Drawer</span>
        <span class="chevron">&#8250;</span>
      </div>
      <div class="drawer-content">
        <div class="swiper mySwiper">
          <div class="swiper-wrapper" id="swiper-wrapper"></div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    `;
        document.body.appendChild(drawer);

        // Toggle logic
        document.getElementById('drawer-toggle').onclick = () => {
            drawer.classList.toggle('open');
            drawer.querySelector('.chevron').classList.toggle('rotated');
        };
        document.getElementById('drawer-overlay').onclick = () => {
            drawer.classList.remove('open');
            drawer.querySelector('.chevron').classList.remove('rotated');
        };

        // Auto-close on scroll bottom
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                drawer.classList.remove('open');
                drawer.querySelector('.chevron').classList.remove('rotated');
            }
        });

        // Fetch Pokémon data
        fetch('https://pokeapi.co/api/v2/pokemon?limit=7')
            .then(res => res.json())
            .then(data => Promise.all(data.results.map(p => fetch(p.url).then(r => r.json()))))
            .then(pokemons => {
                const wrapper = document.getElementById('swiper-wrapper');
                pokemons.forEach(p => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    slide.innerHTML = `
            <div class="card">
              <div class="card-inner">
                <div class="card-front">
                <button class="flip-btn">&#8634;</button>
                  <h3>${p.name}</h3>                  
                  <img src="${p.sprites.front_default}" alt="${p.name}" />                  
                 <div class="tooltip" data-tooltip="${p.types[0].type.name}"><small>&#x27A4; Type</small></div>                  
                </div>
                <div class="card-back">
                 <button class="flip-btn">&#8635;</button>
                 <p><small>${p.name} is a ${p.types.map(t => t.type.name).join('/')} type Pokémon known for its ${p.abilities[0].ability.name} ability</small></p >
                <p><strong>Height</strong> ${p.height}<br />
                    <strong>Weight</strong> ${p.weight}</p>                 
                </div >
              </div >
            </div >
                    `;
                    wrapper.appendChild(slide);
                });

                // Flip logic
                wrapper.querySelectorAll('.flip-btn').forEach(btn => {
                    btn.addEventListener('click', e => {
                        const cardInner = e.target.closest('.card-inner');
                        cardInner.classList.toggle('flipped');
                    });
                });

                // Initialize Swiper
                new Swiper('.mySwiper', {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    pagination: { el: '.swiper-pagination', type: "fraction", clickable: true },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        375: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 }
                    }
                });
            });
    }
})();