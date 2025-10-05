<script lang="ts">
	export interface UserProps {
		image: string;
		text: string;
		href?: string;
	}
	export let users: UserProps[] = [];

	function handleKey(event: KeyboardEvent, href?: string) {
		if (href && (event.key === 'Enter' || event.key === ' ')) {
			window.open(href, '_blank', 'noopener,noreferrer');
		}
	}
</script>

<div class="users">
	{#each users as user (user.image + user.text)}
		<a
			href={user.href}
			target="_blank"
			rel="noreferrer"
			class="user"
			tabindex="0"
			aria-label={user.text}
			on:keydown={(e) => handleKey(e, user.href)}
		>
			<img src={user.image} alt={user.text} width="60" height="60" loading="lazy" />
			<div>{user.text}</div>
		</a>
	{/each}
</div>

<style>
	.users {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.user {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 74px;
		padding: 16px 64px;
		border-radius: 8px;
		color: inherit !important;
		text-decoration: none;
		transition: background 0.2s;
		text-overflow: ellipsis;
		font-size: 0.75rem;
		text-align: center;
		white-space: nowrap;  /* Prevents text from wrapping */
		overflow: hidden;     /* Hides any content that overflows the box */
		text-overflow: ellipsis; /* Displays an ellipsis (...) for truncated text */
	}
	.user:hover {
		background: var(--footer-background);
	}
	.user img {
		border-radius: 4px;
		margin-bottom: 8px;
	}
</style>
