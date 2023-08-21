<script lang="ts">
    import avifSrcSet from "./rick-roll.png?format=avif&srcset&imageTools"
    import webpSrcSet from "./rick-roll.png?format=webp&srcset&imageTools"
    import fallback from "./rick-roll.png?url&imageTools"
</script>

<picture>
    <source type="image/avif" srcset={avifSrcSet} />
    <source type="image/webp" srcset={webpSrcSet} />
    <img src={fallback} alt="an unknown qr code" />
</picture>
