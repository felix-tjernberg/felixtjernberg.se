<script lang="ts">
    export let label: string

    export let value: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" = "0"
</script>

<div>
    <label>
        {label}
        <input bind:value />
    </label>
</div>
