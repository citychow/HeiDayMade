let allCrafts = [];

document.addEventListener("DOMContentLoaded", async () => {
    if (typeof window.APP_CONFIG === 'undefined') {
        console.error("APP_CONFIG 未定義，請檢查 config.js 載入順序");
        return;
    }

    const supabase = window.supabase.createClient(
        window.APP_CONFIG.SUPABASE_URL, 
        window.APP_CONFIG.SUPABASE_KEY
    );

    const container = document.getElementById('craft-container');
    if (!container) return;

    const craftType = container.getAttribute('data-type');
    
    const { data, error } = await supabase
        .from('craft')
        .select('*')
        .eq('type', craftType)
        .order('created_at', { ascending: false });

    if (error) {
        container.innerHTML = `<p> Failed to load, please try again later.</p>`;
        console.error(error);
        return;
    } else {
        allCrafts = data; 
        renderImages(allCrafts);
    }

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allCrafts.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        renderImages(filtered); 
    });

    function renderImages(items) {
    container.innerHTML = '';
        items.forEach(item => {
            const { data: imgData } = supabase.storage
                .from('craft')
                .getPublicUrl(item.img_url || ''); 

            const col = document.createElement('div');
            col.className = 'col-lg-4 mb-3';
            
            col.innerHTML = `
                <img src="${item.img_url}" class="rounded-3 img-fluid" alt="${item.name}" loading="lazy">
                <p></p>
                <h4>${item.name}</h4>
                <ul class="list-unstyled" style="font-size: 0.8rem;">
                    <li>${item.note || ''}</li>
                </ul>
            `;
            container.appendChild(col);
        });
}
if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allItems.filter(item => 
                (item.name && item.name.toLowerCase().includes(term)) || 
                (item.note && item.note.toLowerCase().includes(term))
            );
            renderImages(filtered);
        });
    }


});