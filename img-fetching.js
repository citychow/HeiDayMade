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
        .eq('type', craftType);

    if (error) {
        container.innerHTML = `<p>載入失敗，請稍後再試。</p>`;
        console.error(error);
        return;
    }

    container.innerHTML = '';

    data.forEach(item => {
        const { data: imgData } = supabase.storage
            .from('craft')
            .getPublicUrl(item.img_url);

        const col = document.createElement('div');
        col.className = 'col-lg-4 mb-3';
        
        col.innerHTML = `
            <img src="${item.img_url}" class="rounded-3 img-fluid" alt="${item.title}">
            <p></p>
            <h4>${item.name}</h4>
            <ul class="list-unstyled" style="font-size: 0.8rem;">
                <li>${item.note || ''}</li>

            </ul>
        `;
        container.appendChild(col);
    });
});