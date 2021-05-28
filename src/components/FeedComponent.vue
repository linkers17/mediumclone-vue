<template>
    <div>
        <mcv-loading v-if="isLoading"></mcv-loading>
        <mcv-error-message v-if="error"></mcv-error-message>
        <div v-if="feed">
            <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
                <div class="article-meta">
                    <router-link
                        :to="{name: 'userProfile', params: {slug: article.author.username}}"
                    >
                        <img :src="article.author.image" alt="avatar">
                    </router-link>
                    <div class="info">
                        <router-link
                            class="author"
                            :to="{name: 'userProfile', params: {slug: article.author.username}}"
                        >
                            {{ article.author.username }}
                        </router-link>
                        <span class="date">{{ article.createdAt }}</span>
                    </div>
                    <div class="pull-xs-right">
                        <mcv-add-to-favorites
                            :is-favorited="article.favorited"
                            :article-slug="article.slug"
                            :favorites-count="article.favoritesCount"
                        ></mcv-add-to-favorites>
                    </div>
                </div>
                <router-link
                    :to="{name: 'article', params: {slug: article.slug}}"
                    class="preview-link"
                >
                    <h2>{{ article.title }}</h2>
                    <p>{{ article.description }}</p>
                    <span>Read more...</span>
                    <mcv-tag-list :tags="article.tagList"></mcv-tag-list>
                </router-link>
            </div>
            <mcv-pagination
                :total="feed.articlesCount"
                :limit="limit"
                :currentPage="currentPage"
                :url="baseUrl"
            ></mcv-pagination>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    import { actionTypes } from "@/store/modules/feed";
    import { limit } from '@/helpers/vars';

    import McvPagination from '@/components/PaginationComponent';
    import McvLoading from '@/components/LoadingComponent';
    import McvTagList from "@/components/TagListComponent";
    import McvErrorMessage from '@/components/ErrorMessageComponent';
    import McvAddToFavorites from "@/components/AddToFavoritesComponent";

    import { stringify, parseUrl } from 'query-string';

    export default {
        name: 'McvFeed',
        data() {
            return {
                limit
            }
        },
        components: {
            McvAddToFavorites,
            McvTagList,
            McvPagination,
            McvLoading,
            McvErrorMessage
        },
        props: {
            apiUrl: {
                type: String,
                required: true
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.feed.isLoading,
                feed: state => state.feed.data,
                error: state => state.feed.error
            }),
            currentPage() {
                return Number(this.$route.query.page || 1);
            },
            baseUrl() {
                return this.$route.path;
            },
            offset() {
                return this.currentPage * limit - limit
            }
        },
        watch: {
            currentPage() {
                this.fetchFeed();
            }
        },
        mounted() {
            this.fetchFeed();
        },
        methods: {
            fetchFeed() {
                const parsedUrl = parseUrl(this.apiUrl);
                const stringifinedParams = stringify({
                    limit,
                    offset: this.offset,
                    ...parsedUrl.query
                });
                const apiUrlWithParams = `${parsedUrl.url}?${stringifinedParams}`;
                this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams});
            }
        }
    }
</script>
