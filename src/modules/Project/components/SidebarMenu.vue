<template>
    <div class="sidebar-menu">
        <div v-for="item in menuItems" :key="item.name" class="menu-item"
            :class="{ 'is-active': isActiveRoute(item.route) }" @click="navigateToRoute(item.route)">
            <img :src="item.icon" alt="" class="menu-item-icon">
            <span class="menu-item-text">{{ item.label }}</span>
        </div>
    </div>
</template>

<script lang="ts">
// 图片
import home_icon from '@/assets/svg/home_icon.svg'
import order_icon from '@/assets/svg/order_icon.svg'
import message_icon from '@/assets/svg/message_icon.svg'

export default defineComponent({
    name: 'SidebarMenu',
    setup() {
        // 菜单项配置
        const menuItems = ref([
            {
                name: 'home',
                label: 'Home',
                icon: home_icon,
                route: '/project'
            },
            {
                name: 'order',
                label: 'Order',
                icon: order_icon,
                route: '/project/order'
            },
            {
                name: 'message',
                label: 'Message',
                icon: message_icon,
                route: '/project/message'
            }
        ])

        // 路由导航逻辑
        const router = useRouter()
        const route = useRoute()

        const isActiveRoute = (targetRoute: string) => {
            return route.path === targetRoute || route.path.startsWith(targetRoute + '/')
        }

        const navigateToRoute = (targetRoute: string) => {
            if (targetRoute && targetRoute !== route.path) {
                router.push(targetRoute)
            }
        }

        return {
            menuItems,
            isActiveRoute,
            navigateToRoute
        }
    }
})
</script>

<style lang="scss" scoped>
.sidebar-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 20px;

    .menu-item {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #606266;
        font-size: 14px;
        font-weight: 400;

        &:hover {
            background-color: #1F1F1F;
            color: #FFFFFF;
        }

        &.is-active {
            background-color: #1F1F1F;
            color: #ffffff;
            font-weight: 500;

            .menu-item-icon {
                color: #ffffff;
            }
        }

        .menu-item-icon {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            color: #909399;
            transition: color 0.3s ease;

            &.is-active {
                color: #ffffff;
            }
        }

        .menu-item-text {
            flex: 1;
            white-space: nowrap;
        }
    }
}
</style>
