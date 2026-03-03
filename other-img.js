document.addEventListener("DOMContentLoaded", async () => {
    const supabase = window.supabase.createClient(
        window.APP_CONFIG.SUPABASE_URL,
        window.APP_CONFIG.SUPABASE_KEY
    );

    const allContainers = document.querySelectorAll('.showcase, .gif');

    allContainers.forEach(async (container) => {
        const isGif = container.classList.contains('gif');
        const table = isGif ? 'gif' : 'index';
        const placeRef = container.getAttribute('data-type');
        const isCarousel = container.getAttribute('data-mode') === 'carousel';

        const { data, error } = await supabase.from(table).select('*').eq('place', placeRef);
        if (error) return console.error(error);

        // 根據來源與模式渲染
        if (isGif) {
            container.innerHTML = data.map(item => `
                <img src="${item.gif_url}" alt="${item.note}" class="img-fluid" style="width:36px; height:36px;">
            `).join('');
        } else if (isCarousel) {
            renderCarousel(container, data);
        } else {
            renderStandard(container, data);
        }
    });

    function renderCarousel(container, items) {
        container.innerHTML = `
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner">
                ${items.map((item, index) => {
                    const { data: imgData } = supabase.storage
                        .from('index')
                        .getPublicUrl(item.img_url || '');

                    return `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img src="${item.img_url}" class="rounded-2 d-block" alt="${item.name}" loading="lazy">
                        </div>
                    `;
                }).join('')}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;
}

    function renderStandard(container, items) {
        container.innerHTML = items.map(item => `
            <div>
                <img src="${item.img_url}" alt="${item.note}" class="rounded-3 img-fluid" loading="lazy">
    </div>
        `).join('');
    }
});