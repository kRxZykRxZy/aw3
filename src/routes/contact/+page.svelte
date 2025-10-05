<script lang="ts">
    import Banner from '$components/banner/Banner.svelte';
    const handleSubmit = (event: Event) => {
        event.preventDefault();

        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(
                Array.from(formData.entries()).map(([key, value]) => [key, typeof value === 'string' ? value : String(value)])
            ).toString()
        })
            .then(() => alert("Your message has been sent. Please be patient."))
            .catch(error => alert(error));
    };
</script>

<svelte:head>
    <title>Contact AmpMod</title>
</svelte:head>

<Banner
    text="Contact AmpMod"
/>

<div class="mx-auto max-w-1xl px-6 py-16">
    <p class="text-gray-700 dark:text-gray-300 mb-4">This form can be used to contact AmpElectrecuted.</p>
    <form name="contact" method="POST" data-netlify="true" onsubmit={handleSubmit}>
        <label for="subject" class="block text-gray-700 dark:text-gray-300 mb-2">Subject:</label>
        <input name="subject" type="text" id="subject" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4" required>
        <label for="email" class="block text-gray-700 dark:text-gray-300 mb-2">Your Email:</label>
        <input name="email" type="email" id="email" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4" required>
        <div class="text-sm text-gray-500 mb-4">
            <p>Your email will only be used to respond to your inquiry. We will remove your email from our records after responding.</p>
            <p>If you want to be extra cautious, you might want to create a secondary email for use with AmpMod.</p>
        </div>
        <label for="message" class="block text-gray-700 dark:text-gray-300 mb-2">Message:</label>
        <textarea name="message" id="message" rows="6" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4" required></textarea>
        <button type="submit" class="bg-accent text-white font-bold py-2 px-4 rounded hover:bg-accent-hover transition-colors">Send Message</button>
    </form>
</div>