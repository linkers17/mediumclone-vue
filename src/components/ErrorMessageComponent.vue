<template>
    <div>{{ message }}</div>
</template>

<script>

    export default {
        name: 'McvErrorMessage',
        props: {
            message: {
                type: String,
                default: 'Something went wrong'
            }
        }
    }

</script>
