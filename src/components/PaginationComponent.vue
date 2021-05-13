<template>
    <ul class="pagination">
        <li
            v-for="(page, idx) in pages"
            :key="idx"
            class="page-item"
            :class="{active: currentPage === idx + 1}"
        >
            <router-link
                :to="{path: url, query: {page: idx + 1}}"
                class="page-link"
            >
                {{ idx + 1 }}
            </router-link>
        </li>
    </ul>
</template>

<script>

    export default {
        name: 'McvPagination',
        props: {
            total: {
                type: Number,
                required: true
            },
            limit: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
        computed: {
            pages() {
                return Math.ceil(this.total / this.limit);
            }
        }
    }

</script>
