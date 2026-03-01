// read html div type to fetch data from supabase and inject into html
document.addEventListener("DOMContentLoaded", async () => {
    const supabase = supabase.createClient(process.env.PROJECT_URL, process.env.API_KEY);
    const container = document.getElementById('craft-container');
    
    if (!container) return;

    const craftType = container.getAttribute('data-type');
    
    const { data, error } = await supabase
        .from('craft')
        .select('*')
        .eq('type', craftType);

    if (error) {
        container.innerHTML = `<p>載入失敗，請稍後再試。</p>`;
        return;
    }

    // 清空靜態圖片，準備注入動態圖片
    container.innerHTML = '';

    data.forEach(item => {
        const { data: imgData } = supabase.storage
            .from('handicrafts')
            .getPublicUrl(item.img_url);

        const col = document.createElement('div');
        col.className = 'col-lg-4 mb-3';
        col.innerHTML = `
            <img src="${imgData.publicUrl}" class="rounded-3 img-fluid" alt="${item.title}">
            <h4>${item.name}</h4>
            <ul class="list-unstyled" style="font-size: 0.8rem;">
                <li>Brand: ${item.note || 'N/A'}</li>
            </ul>
        `;
        container.appendChild(col);
    });
});