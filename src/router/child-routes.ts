const importModule = import.meta.glob('../modules/**/*.vue')
const Layout = () => import('@/components/Layout/index.vue')
const LayoutArea = () => import('@/components/Layout/LayoutArea.vue')

const childrenRoutes: Array<RouteRecordRaw> = [
    {
        path: 'test-layout',
        name: '布局测试',
        meta: {
            title: 'TestLayout'
        },
        component: LayoutArea
    },
    {
        path: 'project',
        component: Layout,
        name: 'Project',
        redirect: {
            name: 'ProjectList'
        },
        children: [
            {
                path: '',
                name: 'ProjectList',
                meta: {
                    title: '项目列表'
                },
                component: importModule['../modules/Project/pages/list.vue']
            },
            {
                path: 'list',
                name: 'ProjectList',
                component: importModule['../modules/Project/pages/list.vue'],
                meta: {
                    title: '项目管理'
                }
            }
        ]
    }
]

export default childrenRoutes