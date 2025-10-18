<script lang="ts">
	export let id: number;
	export let title: string;
	export let author: string;
	export let thumbnailUrl: string;
</script>

<div
	class="w-48 flex-shrink-0 overflow-hidden rounded-md border border-border bg-footer shadow-sm dark:border-border-dark dark:bg-footer-dark"
>
	<div class="m-2 mb-0 aspect-[4/3]">
		<a href={'/projects/@' + id}>
			<img src={thumbnailUrl} alt={title} loading="lazy" class="h-full w-full rounded" />
		</a>
	</div>
	<div class="px-3 py-2">
		<div class="mb-1 truncate text-base font-medium">
			<a href={'/projects/' + id} class="text-text hover:underline dark:text-text-dark" {title}
				>{title}</a
			>
		</div>
		<a
			href={'/@' + author}
			class="truncate text-sm text-text/70 hover:underline dark:text-text-dark/70">by {author}</a
		>
	</div>
</div>
