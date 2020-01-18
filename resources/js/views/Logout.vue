<template>
    <h1>Logout</h1>
</template>

<script>
export default {
    created() {
        localStorage.clear()
        this.$router.push({ name: 'login' });
    }
}
</script>