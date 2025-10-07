<template>
    <div class="layout-area-container">
        <!-- 移动端菜单按钮 -->
        <!-- <div class="mobile-menu-toggle" @click="toggleMobileMenu">
            <el-icon><Menu /></el-icon>
        </div> -->
        
        <!-- 移动端遮罩层 -->
        <div v-if="showMobileMenu" class="mobile-overlay" @click="closeMobileMenu"></div>
        
        <div class="layout-area-container__left" :class="{ 'mobile-open': showMobileMenu }">
            <aside v-if="$slots.side" class="side-layout-area-menu-bar">
                <div class="layout-area-menu-bar__inner">
                    <slot name="side"></slot>
                </div>
            </aside>
        </div>

        <div class="layout-area-container__right">
            <div class="layout-area-container__right__top">
                <slot name="top"></slot>
            </div>
            <section class="content-section-container">
                <main class="main-content-box">
                    <div class="inner-content">
                        <slot name="content"></slot>
                    </div>
                </main>
            </section>
        </div>
        <!-- <FooterCustom show-border /> -->
    </div>
</template>

<script lang="ts">
import { Menu } from '@element-plus/icons-vue'

/**
 * 上下左右布局，顶部导航 + (底部左侧侧边栏 + 底部右侧内容区域)
 */
export default defineComponent({
    name: 'LayoutArea',
    components: {
        Menu
    },
    setup() {
        const showMobileMenu = ref(false)
        
        const toggleMobileMenu = () => {
            showMobileMenu.value = !showMobileMenu.value
        }
        
        const closeMobileMenu = () => {
            showMobileMenu.value = false
        }
        
        return {
            showMobileMenu,
            toggleMobileMenu,
            closeMobileMenu
        }
    }
})
</script>

<style lang="scss" scoped>
$headerHeight: 48px;

.layout-area-container {
    display: flex;
    flex-direction: row;
    min-width: 100%;
    height: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: #FAFAFA;
    position: relative;

    /* 移动端菜单按钮 */
    .mobile-menu-toggle {
        display: none;
        position: fixed;
        top: 80px;
        left: 20px;
        z-index: 1001;
        background: #fff;
        border: 1px solid #dcdfe6;
        border-radius: 8px;
        padding: 8px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    /* 移动端遮罩层 */
    .mobile-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }

    .layout-area-container__left {
        max-width: 240px;
        height: 100%;
        background: #FFFFFF;
        transition: transform 0.3s ease;

        .side-layout-area-menu-bar {
            position: relative;
            flex-direction: column;
            width: 240px;
            height: 100%;
            transition: width 0.28s;
            border-right: 1px solid #dcdfe6;

            .layout-area-menu-bar__inner {
                position: absolute;
                inset: 0;
                overflow: hidden auto;
                padding: 0px 30px;
                scroll-behavior: smooth;
            }
        }
    }

    .layout-area-container__right {
        display: flex;
        flex: 1;
        flex-direction: column;
        position: relative;
        color: #303133;

        .layout-area-container__right__top {

        }

        .content-section-container {
            display: flex;
            flex: auto;
            flex-direction: column;
            min-width: 0;
            background-color: #f0f2f5;
            
            @media (max-width: 768px) {
                background-color: #FFFFFF;
            }

            .main-content-box {
                flex: auto;
                position: relative;

                .inner-content {
                    padding: 24px;
                    position: absolute;
                    inset: 0;
                    overflow: auto;
                    scroll-behavior: smooth;
                    @media (max-width: 768px) {
                       padding: 0px;
                    }
                }
            }
        }
    }
}

/* 移动端响应式样式 */
@media (max-width: 768px) {
    .layout-area-container {
        .mobile-menu-toggle {
            display: block;
        }
        
        .mobile-overlay {
            display: block;
        }
        
        .layout-area-container__left {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            z-index: 1000;
            transform: translateX(-100%);
            
            &.mobile-open {
                transform: translateX(0);
            }
        }
        
        .layout-area-container__right {
            width: 100%;
            margin-left: 0;
        }
    }
}
</style>
