import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/book',
    component: Layout,
    redirect: '/book/table',
    name: '图书管理',
    meta: { title: '图书管理', icon: 'el-icon-help'},
    children: [
      {
        path: 'page',
        name: '图书列表',
        component: () => import('@/views/book/list'),
        meta: { title: '图书列表', icon: 'table'}
      },
      {
        path: 'save',
        name: '添加图书',
        component: () => import('@/views/book/save'),
        meta: { title: '添加图书' },
        hidden: true
      },
      {
        path: ':id',
        name: '编辑图书',
        component: () => import('@/views/book/save'),
        meta: { title: '编辑图书', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    children: [
      {
        path: '/category',
        name: '图书种类',
        component: () => import('@/views/category/list'),
        meta: { title: '图书种类', icon: 'el-icon-menu' }
      }
    ]
  },
  {
    path: '/publisher',
    component: Layout,
    children: [
      {
        path: 'page',
        name: '出版社',
        component: () => import('@/views/publisher/list'),
        meta: { title: '出版社', icon: 'el-icon-menu' }
      },
      {
        path: 'save',
        name: '添加出版社',
        component: () => import('@/views/publisher/save'),
        meta: { title: '添加出版社' },
        hidden: true
      },
      {
        path: ':id',
        name: '编辑出版社',
        component: () => import('@/views/publisher/save'),
        meta: { title: '编辑出版社', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/author',
    component: Layout,
    children: [
      {
        path: 'page',
        name: '作者',
        component: () => import('@/views/author/index.vue'),
        meta: { title: '作者', icon: 'el-icon-menu' }
      },
      {
        path: 'save',
        name: '添加作者',
        component: () => import('@/views/author/save'),
        meta: { title: '添加作者' },
        hidden: true
      },
      {
        path: ':id',
        name: '编辑作者',
        component: () => import('@/views/author/save'),
        meta: { title: '编辑作者', noCache: true },
        hidden: true
      }
    ]
  },
  // {
  //   path: '/receipt',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'page',
  //       name: '账单',
  //       component: () => import('@/views/receipt/index.vue'),
  //       meta: { title: '账单', icon: 'el-icon-menu' }
  //     },
  //     {
  //       path: 'save',
  //       name: '添加账单',
  //       component: () => import('@/views/receipt/save'),
  //       meta: { title: '添加账单' },
  //       hidden: true
  //     },
  //     {
  //       path: ':id',
  //       name: '编辑账单',
  //       component: () => import('@/views/receipt/save'),
  //       meta: { title: '编辑账单', noCache: true },
  //       hidden: true
  //     }
  //   ]
  // },
  // {
  //   path: '/store',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'page',
  //       name: '店铺',
  //       component: () => import('@/views/store/index.vue'),
  //       meta: { title: '店铺', icon: 'el-icon-menu' }
  //     },
  //     {
  //       path: 'save',
  //       name: '添加店铺',
  //       component: () => import('@/views/store/save'),
  //       meta: { title: '添加店铺' },
  //       hidden: true
  //     },
  //     {
  //       path: ':id',
  //       name: '编辑店铺',
  //       component: () => import('@/views/store/save'),
  //       meta: { title: '编辑店铺', noCache: true },
  //       hidden: true
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ x:0, y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
