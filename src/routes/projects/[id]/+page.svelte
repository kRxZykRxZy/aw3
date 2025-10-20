<script lang="ts">
	const { data } = $props();

	async function parse(something) {
		return something;
	}
</script>

<section>
	{#if !data}
		<div class="project">
			<h3>This project doesn't excist</h3>
		</div>
	{:else}
		<iframe
			title={data.title}
			src="https://ampmod.codeberg.page/embed#{data.id}"
			width="482"
			height="412"
			allowtransparency={true}
			frameborder="0"
			scrolling="no"
			allowfullscreen
			style="color-scheme: light;"
		></iframe>
		<aside>
			<div>
				<div class="author">
					<a class="author" href="/users/{data.author.username}">
						<img
							src="https://ampmod.vercel.app/internalapi/users/{data.author.username}/get_image"
							alt={data.author.username}
							class="pfp"
						/>
						<div>
							<span class="user">{data.author.username}</span>
						</div>
					</a>
					<button class="pill-btn">Follow</button>
				</div>
			</div>
			<div>
				<h2>{data.title}</h2>
				{#await data.description}
					<p>Please wait</p>
				{:then description}
					{@html description}
				{/await}
			</div>
		</aside>
	{/if}
</section>
<h3>Comments: ({data.commentCount})</h3>
<comments>
	{#each data.comments as comment}
		<div id="comment-{comment.id}">
			<a class="author" href="/users/{comment.author.username}">
				<img
					src="https://ampmod.vercel.app/internalapi/users/{comment.author.username}/get_image"
					alt={comment.author.username}
					class="pfp"
				/>
				<div>
					<span class="user">{comment.author.displayName}</span><br />
					<sub>@{comment.author.username}</sub>
				</div>
			</a>
			<div>
				{#await parse(comment.content)}
					<p>Please wait</p>
				{:then content}
					{@html content}
				{/await}
			</div>
		</div>
	{/each}
</comments>

<style>
	section {
		display: flex;
		gap: 2rem;
	}

	section:has(iframe) {
		height: 412px;
	}

	iframe {
		flex-shrink: 0;
	}

	.project {
		border-radius: 0.7rem;
		width: 482px;
		height: 412px;
		background-color: var(--block1);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	div:has(> .author) {
		flex-shrink: 0;
	}

	.author {
		display: flex;
		gap: 1rem;
		align-items: center;
		text-decoration: none;
		color: unset;
		flex-grow: 1;
	}

	aside {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	aside > div {
		overflow-y: auto;
		padding: 0 0.1rem;
	}

	comments {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	comments > div {
		background-color: var(--block1);
		border-radius: 0.8rem;
		padding: 0.6rem;
	}
</style>
