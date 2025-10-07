<template>
    <div>
        <header class="navigation-navbar-header-container" :class="{
            'fixed-header': fixed
        }">
            <div class="navbar-header-box">
                <!-- 移动端返回按钮 -->
                <div class="mobile-back-btn" @click="goBack">
                    <el-icon><ArrowLeft /></el-icon>
                </div>
                
                <!-- 移动端标题 -->
                <div class="mobile-title">Become a creator</div>
                
                <!-- 移动端Preview按钮 -->
                <div class="mobile-preview-btn" @click="showPreview = true">
                    <el-button type="primary" class="privew-btn">Preview</el-button>
                </div>
                
                <!-- 桌面端内容 -->
                <div class="desktop-content">
                    <slot></slot>
                </div>
                
                <!-- 桌面端flex spacer -->
                <div class="desktop-spacer"></div>
                
                <!-- 桌面端用户头像 -->
                <div class="desktop-avatar">
                    <NavigationAvatar />
                </div>
                <!-- <Translations dark /> -->
            </div>
        </header>
        
        <!-- 移动端预览弹窗 -->
        <el-dialog
            v-model="showPreview"
            title="Preview"
            width="90%"
            :show-close="true"
            :close-on-click-modal="true"
            class="mobile-preview-dialog"
        >
            <div class="mobile-preview-content">
                <div class="preview-card">
                    <div class="preview-cover" :style="{ backgroundImage: previewData.backgroundImage ? `url(${previewData.backgroundImage})` : 'none' }"></div>
                    <div class="preview-avatar">
                        <img v-if="previewData.avatar" :src="previewData.avatar" alt="Avatar" class="avatar-img">
                        <div v-else class="avatar-placeholder"></div>
                        <img class="verified" src="@/assets/images/icons/check_icon.png" alt="">
                    </div>
                    <div class="preview-name">{{ previewData.username || 'Please Enter' }}</div>
                    <div class="preview-about">
                        <div class="title">About me</div>
                        <div class="desc">{{ previewData.about || 'Please Enter' }}</div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import Translations from '@/locales/Translations.vue'
import NavigationAvatar from '@/components/Navigation/Avatar.vue'
import { usePreviewStore } from '@/store/preview'
import { ArrowLeft } from '@element-plus/icons-vue'

export default defineComponent({
    name: 'NavigationNavBar',
    components: {
        Translations,
        NavigationAvatar,
        ArrowLeft
    },
    props: {
        fixed: {
            type: Boolean,
            default: true
        }
    },
    setup() {
        const router = useRouter()
        const showPreview = ref(false)
        const previewStore = usePreviewStore()
        
        const goBack = () => {
            router.go(-1)
        }
        
        return {
            goBack,
            showPreview,
            previewData: previewStore.previewData
        }
    }
})
</script>
<style lang="scss" scoped>
$headerHeight: 74px;

.navigation-navbar-header-container {
    height: $headerHeight;
    line-height: $headerHeight;
    box-shadow: 0 1px 4px rgba(#001529, 0.08);

    .navbar-header-box {
        display: flex;
        height: 100%;
        padding: 0 16px;
        background-color: #fff;
        align-items: center;
        position: relative;
    }

    /* 移动端返回按钮 */
    .mobile-back-btn {
        display: none;
        margin-right: 12px;
        cursor: pointer;
        color: #333;
        font-size: 20px;
    }

    /* 移动端标题 */
    .mobile-title {
        display: none;
        font-size: 18px;
        font-weight: 600;
        color: #333;
        flex: 1;
    }

    /* 移动端Preview按钮 */
    .mobile-preview-btn {
        display: none;
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        .privew-btn {
            width: 76px;
            height: 32px;
            line-height: 32px;
            border-radius: 50px;
        }
    }

    /* 桌面端内容 */
    .desktop-content {
        display: block;
    }

    /* 桌面端flex spacer */
    .desktop-spacer {
        flex: 1;
    }

    /* 桌面端用户头像 */
    .desktop-avatar {
        display: block;
    }

    &.fixed-header {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        z-index: 3;
    }
}

/* 移动端样式 */
@media (max-width: 768px) {
    .navigation-navbar-header-container {
        height: 60px;
        line-height: 60px;
        
        .navbar-header-box {
            padding: 0 16px;
        }
        
        .mobile-back-btn {
            display: block;
        }
        
        .mobile-title {
            display: block;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .mobile-preview-btn {
            display: block;
        }
        
        .desktop-content {
            display: none;
        }
        
        .desktop-avatar {
            display: none;
        }
    }
}

/* 移动端预览弹窗样式 */
:deep(.mobile-preview-dialog) {
    .el-dialog__body {
        padding: 20px;
    }
}

.mobile-preview-content {
    .preview-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        padding-bottom: 12px;

        .preview-cover {
            width: 100%;
            height: 120px;
            background: #3278FF;
        }
    }

    .preview-avatar {
        position: relative;
        width: 140px;
        height: 140px;
        background: #fff;
        border-radius: 12px;
        margin: -70px 0 0 0;
        border: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;

        .avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
        }

        .avatar-placeholder {
            width: 100%;
            height: 100%;
            background: #f5f5f5;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #bfbfbf;
            font-size: 14px;
        }

        .verified {
            position: absolute;
            bottom: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
        }
    }

    .preview-name {
        font-weight: 700;
        color: #1F1F1F;
        padding: 0 24px;
        font-size: 26px;
        margin-top: 12px;
    }

    .preview-about {
        width: 100%;
        padding: 0 20px;
        margin-top: 36px;
        
        .title {
            font-weight: 700;
            font-size: 24px;
            text-align: left;
        }

        .desc {
            color: #909399;
            font-size: 16px;
            text-align: left;
            margin-top: 12px;
        }
    }
}
</style>
