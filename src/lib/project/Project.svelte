<script lang="ts">
	export let id: number;
	export let title: string;
	export let author: string;
	export let thumbnailUrl: string;
</script>

<div
	class="border-border bg-footer dark:border-border-dark dark:bg-footer-dark w-48 flex-shrink-0 overflow-hidden rounded-md border shadow-sm"
>
	<div class="m-2 mb-0 aspect-[4/3]">
		<a href={'/projects/@' + id}>
			<img src={thumbnailUrl} alt={title} loading="lazy" class="h-full w-full rounded" />
		</a>
	</div>
	<div class="px-3 py-2">
		<div class="mb-1 truncate text-base font-medium">
			<a href={'/projects/' + id} class="text-text dark:text-text-dark hover:underline" {title}
				>{title}</a
			>
		</div>
		<a
			href={'/@' + author}
			class="text-text/70 dark:text-text-dark/70 truncate text-sm hover:underline">by {author}</a
		>
	</div>
</div>
