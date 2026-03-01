document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.supabase === 'undefined') {
        console.error("Supabase SDK 尚未載入！");
        return;
    }

    const client = window.supabase.createClient(
        window.APP_CONFIG.SUPABASE_URL,
        window.APP_CONFIG.SUPABASE_KEY
    );

    async function fetchImages() {
        const { data, error } = await client.from('handicrafts').select('*');
        if (error) console.error(error);
        else console.log(data);
    }

    fetchImages();
});