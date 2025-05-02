import { createRouter, createWebHistory } from 'vue-router'
import TranslatorsView from '@/views/TranslatorsView.vue'
import DocumentsView from '@/views/DocumentsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/translators'
  },
  {
    path: '/translators',
    name: 'Translators',
    component: TranslatorsView
  },
  {
    path: '/documents',
    name: 'Documents',
    component: DocumentsView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router