<template>
    <nav v-if="totalPages > 1" class="d-flex justify-content-center mt-2">
        <ul class="pagination mb-0">
            <li 
                class="page-item" 
                :class="{ disabled: currentPage === 1 }"
                @click="changePage(currentPage - 1)"
            >
                <a class="page-link" href="#">Previous</a>
            </li>

            <li 
                v-for="page in totalPages" 
                :key="page" 
                class="page-item"
                :class="{ active: page === currentPage }"
                @click="changePage(page)"
            >
                <a class="page-link" href="#">{{ page }}</a>
            </li>

            <li 
                class="page-item" 
                :class="{ disabled: currentPage === totalPages }"
                @click="changePage(currentPage + 1)"
            >
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
    const props = defineProps({
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        pageSize: {
            type: Number,
            default: 9
        },
    })

    const emit = defineEmits(['update:page'])

    const changePage = (page) => {
        if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
            emit('update:page', page)
        }
    }
</script>

<style scoped>
    .page-link {
        background-color: transparent;
        color: #f96418;
        border: 1px solid #f96418;
    }

    .active > .page-link, .page-link.active{
        background-color: #f96418;
        color: white;
        border: 1px solid #f96418;
    }

    .page-link:hover{
        background-color: #f96418;
        color: white;
        border: 1px solid #f96418;
    }
</style>