<template>
    <div>
        <mcv-loading v-if="isLoading"></mcv-loading>
        <mcv-error-message v-if="error"></mcv-error-message>
        <div v-if="tags" class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
                <router-link
                    v-for="(tag, idx) in tags"
                    :key="idx"
                    :to="{name: 'tag', params: {slug: tag}}"
                    class="tag-default tag-pill"
                >
                    {{tag}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import { actionTypes } from '@/store/modules/tags';

    import McvLoading from '@/components/LoadingComponent';
    import McvErrorMessage from '@/components/ErrorMessageComponent';

    export default {
        name: 'McvPopularTags',
        components: {
            McvLoading,
            McvErrorMessage
        },
        computed: {
            ...mapState({
                isLoading: state => state.tags.isLoading,
                tags: state => state.tags.data,
                error: state => state.tags.error
            }),
        },
        mounted() {
            this.$store.dispatch(actionTypes.getTags);
        }
    }
</script>
