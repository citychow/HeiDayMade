document.addEventListener('DOMContentLoaded', () => {
    
    // init supabase client
    const supabase = window.supabase.createClient(
        window.APP_CONFIG.SUPABASE_URL, 
        window.APP_CONFIG.SUPABASE_KEY
    );

    const form = document.querySelector('#feedback-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // prevent double submission
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";

        const { error } = await supabase
            .from('feedback')
            .insert([{
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            }]);

        if (error) {
            console.error("Submission Error:", error);
            alert("Submission Failed: " + error.message);
            submitBtn.disabled = false;
            submitBtn.innerText = "Submit";
        } else {
            window.location.href = './Form-Recieved.html';
        }
    });
});