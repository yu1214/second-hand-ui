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
    icon: 'svg-name'             the icon show in the sidebar
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
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/framework',
    component: Layout,
    redirect: '/framework/category',
    name: 'Framework',
    meta: { title: '基础架构', icon: 'example' },
    children: [
      {
        path: 'category',
        name: 'category',
        component: () => import('@/pages/framework/Category'),
        meta: { title: '栏目管理' }
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/pages/framework/Product'),
        meta: { title: '产品管理' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/customer',
    name: 'system',
    meta: { title: '系统设置', icon: 'table' },
    children: [
      {
        path: 'customer',
        name: 'customer',
        component: () => import('@/pages/system/Customer'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/pages/system/Role'),
        meta: { title: '角色管理' }
      },
      {
        path: 'privilege',
        name: 'privilege',
        component: () => import('@/pages/system/Privilege'),
        meta: { title: '权限管理' }
      }
    ]
  },

  {
    path: '/check',
    component: Layout,
    redirect: '/check/employee',
    name: 'check',
    meta: { title: '审核大厅', icon: 'eye' },
    children: [
      {
        path: 'employee',
        name: 'employee',
        component: () => import('@/pages/check/Employee'),
        meta: { title: '员工审核' }
      },
      {
        path: 'commont',
        name: 'commont',
        component: () => import('@/pages/check/Commont'),
        meta: { title: '评论审核' }
      },
      {
        path: 'withdraw',
        name: 'withdraw',
        component: () => import('@/pages/check/Withdraw'),
        meta: { title: '提现审核' }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'order',
    meta: { title: '订单管理', icon: 'tree' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/pages/order/List'),
        meta: { title: '订单管理' }
      }
    ]
  },

  

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
