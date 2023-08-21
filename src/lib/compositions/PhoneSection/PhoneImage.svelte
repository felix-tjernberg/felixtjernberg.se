<script lang="ts">
    import avifSrcSet from "$assets/images/phone.png?width=200;400;600&format=avif&srcset&imageTools"
    import webpSrcSet from "$assets/images/phone.png?width=200;400;600&format=webp&srcset&imageTools"
    import fallback from "$assets/images/phone.png?width=200&url&imageTools"
</script>

<picture>
    <source type="image/avif" srcset={avifSrcSet} />
    <source type="image/webp" srcset={webpSrcSet} />
    <img src={fallback} alt="nokia 3310 launched 2000" />
</picture>
