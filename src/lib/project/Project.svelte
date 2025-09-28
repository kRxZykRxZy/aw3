<script lang="ts">
    export let id: number;
    export let title: string;
    export let author: string;
    export let thumbnailUrl: string;
</script>

<div class="bg-footer dark:bg-footer-dark rounded-md overflow-hidden border border-border dark:border-border-dark w-48 flex-shrink-0 shadow-sm">
    <div class="aspect-[4/3] m-2 mb-0">
        <a href={'/projects/@' + id}>
            <img src={thumbnailUrl} alt={title} loading="lazy" class="w-full h-full rounded" />
        </a>
    </div>
    <div class="px-3 py-2">
        <div class="font-medium mb-1 text-base truncate">
            <a href={'/projects/' + id} class="text-text dark:text-text-dark hover:underline" title={title}>{title}</a>
        </div>
        <a href={'/@' + author} class="text-sm text-text/70 dark:text-text-dark/70 truncate hover:underline">by {author}</a>
    </div>
</div>