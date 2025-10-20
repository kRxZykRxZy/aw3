<script lang="ts">
	export let id: number;
	export let title: string;
	export let author: string;
	export let thumbnailUrl: string;
</script>

<div
	class="border-border bg-footer dark:border-border-dark dark:bg-footer-dark w-48 rounded-md shadow-sm flex-shrink-0 overflow-hidden border"
>
	<div class="m-2 mb-0 aspect-[4/3]">
		<a href={'/projects/@' + id}>
			<img src={thumbnailUrl} alt={title} loading="lazy" class="rounded h-full w-full" />
		</a>
	</div>
	<div class="px-3 py-2">
		<div class="mb-1 text-base font-medium truncate">
			<a href={'/projects/' + id} class="text-text dark:text-text-dark hover:underline" {title}
				>{title}</a
			>
		</div>
		<a
			href={'/@' + author}
			class="text-text/70 dark:text-text-dark/70 text-sm truncate hover:underline">by {author}</a
		>
	</div>
</div>
