<script lang="ts">
	import Banner from '$components/banner/Banner.svelte';
	const handleSubmit = (event: Event) => {
		event.preventDefault();

		const contactForm = event.target as HTMLFormElement;
		const formData = new FormData(contactForm);

		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(
				Array.from(formData.entries()).map(([key, value]) => [
					key,
					typeof value === 'string' ? value : String(value)
				])
			).toString()
		})
			.then(() => alert('Your message has been sent. Please be patient.'))
			.catch((error) => alert(error));
	};
</script>

<svelte:head>
	<title>Contact AmpMod</title>
</svelte:head>

<Banner text="Contact AmpMod" />

<div class="max-w-1xl mx-auto px-6 py-16">
	<p class="mb-4 text-gray-700 dark:text-gray-300">
		This form can be used to contact AmpElectrecuted.
	</p>
	<form name="contact" method="POST" data-netlify="true" onsubmit={handleSubmit}>
		<label for="subject" class="mb-2 block text-gray-700 dark:text-gray-300">Subject:</label>
		<input
			name="subject"
			type="text"
			id="subject"
			class="mb-4 w-full rounded border border-gray-300 p-2 dark:border-gray-600"
			required
		/>
		<label for="email" class="mb-2 block text-gray-700 dark:text-gray-300">Your Email:</label>
		<input
			name="email"
			type="email"
			id="email"
			class="mb-4 w-full rounded border border-gray-300 p-2 dark:border-gray-600"
			required
		/>
		<div class="mb-4 text-sm text-gray-500">
			<p>
				Your email will only be used to respond to your inquiry. We will remove your email from our
				records after responding.
			</p>
			<p>
				If you want to be extra cautious, you might want to create a secondary email for use with
				AmpMod.
			</p>
		</div>
		<label for="message" class="mb-2 block text-gray-700 dark:text-gray-300">Message:</label>
		<textarea
			name="message"
			id="message"
			rows="6"
			class="mb-4 w-full rounded border border-gray-300 p-2 dark:border-gray-600"
			required
		></textarea>
		<button
			type="submit"
			class="hover:bg-accent-hover rounded bg-accent px-4 py-2 font-bold text-white transition-colors"
			>Send Message</button
		>
	</form>
</div>
