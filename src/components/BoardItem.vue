<template>
    <div class="item" :class="{'is-active' : field.value === 1}"></div>
</template>

<script>
export default {
    props: {
        field: {
            type: Object,
            required: true,
        }
    }
}

</script>

<style scoped>
    .item {
        width: 50px;
        height: 50px;

        position: relative;

        background: #ccc;

        cursor: pointer;

        transition: transform 0.25s;
        transform-style: preserve-3d;
    }

    .item.is-active {
        background-color: #42b983cc;
        transform: rotateX(180deg);
    }
</style>