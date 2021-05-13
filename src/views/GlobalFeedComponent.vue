<template>
    <div class="home-page">
        <mcv-banner></mcv-banner>
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <mcv-feed :api-url="apiUrl"></mcv-feed>
                </div>
                <div class="col-md-3">
                    <mcv-popular-tags></mcv-popular-tags>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import McvFeed from '@/components/FeedComponent';
    import McvPopularTags from '@/components/PopularTagsComponent';
    import McvBanner from '@/components/BannerComponent';

    export default {
        name: 'McvGlobalFeed',
        components: {
            McvFeed,
            McvPopularTags,
            McvBanner
        },
        data() {
            return {
                apiUrl: '/articles'
            }
        }
    }
</script>
