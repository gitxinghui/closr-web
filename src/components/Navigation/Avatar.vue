<template>
    <el-dropdown class="navigation-avatar">
        <div class="user-info">
            <img src="@/assets/images/default_user.png" alt="" class="user-avatar">
            <div class="user-details">
                <span class="user-name">Chris Wu</span>
                <span class="user-role">ID:9732002</span>
            </div>
            <div class="dropdown-arrow">
                <el-icon><ArrowDown /></el-icon>
            </div>
        </div>
        <template #dropdown>
            <el-dropdown-menu class="avatar-menu">
                <div class="avatar-menu__header">
                    <img src="@/assets/images/default_user.png" class="header-avatar" alt="" />
                    <div class="header-info">
                        <div class="header-name">Chris Wu</div>
                        <div class="header-id">ID:9732002</div>
                    </div>
                </div>

                <el-dropdown-item class="avatar-menu__item" @click="goProfile">
                    <el-icon class="item-icon"><User /></el-icon>
                    <span class="item-text">Profile</span>
                </el-dropdown-item>
                <el-dropdown-item class="avatar-menu__item" @click="goSettings">
                    <el-icon class="item-icon"><Setting /></el-icon>
                    <span class="item-text">Settings</span>
                </el-dropdown-item>
                <el-dropdown-item divided class="avatar-menu__item danger" @click="signout">
                    <el-icon class="item-icon"><SwitchButton /></el-icon>
                    <span class="item-text">Sign out</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts">
import Cookie from 'js-cookie'
import { useI18n } from 'vue-i18n'

import { SwitchButton, ArrowDown, User, Setting } from '@element-plus/icons-vue'

export default defineComponent({
    name: 'NavigationAvatar',
    components: {
        SwitchButton,
        ArrowDown,
        User,
        Setting
    },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const localeInject = useI18n()
        const signout = () => {
            Cookie.remove('token')
            Cookie.remove('name')
            window.location.reload()
        }

        const goProfile = () => {}
        const goSettings = () => {}
        return {
            signout,
            goProfile,
            goSettings
        }
    }
})
</script>
<style lang="scss">
.navigation-avatar {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    outline: none;

    .user-info {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        cursor: pointer;

        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 12px;
        }

        .user-details {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;

            .user-name {
                font-size: 16px;
                font-weight: 500;
                color: #1F1F1F;
                line-height: 19px;
                margin-bottom: 1px;
            }

            .user-role {
                font-size: 12px;
                color: #BFBFBF;
                line-height: 14px;
            }
        }

        .dropdown-arrow {
            width: 16px;
            height: 16px;
            color: #C0C4CC;
            margin-left: 8px;
            transition: transform 0.3s ease;
        }

        &:hover .dropdown-arrow {
            transform: rotate(180deg);
        }
    }
}

.navigation-avatar__dropdown-command {
    display: flex;
    align-items: center;
    user-select: none;
    white-space: nowrap;
}

.avatar-menu {
    width: 240px;
    padding: 8px;
    background: #141414;
    border: none;
    .el-dropdown-menu__item {
        color: #E8E8E8;
    }

    .avatar-menu__header {
        display: flex;
        align-items: center;
        padding: 12px;
        background: #1F1F1F;
        border-radius: 10px;
        margin: 4px 4px 8px;
        .header-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
        }
        .header-info {
            display: flex;
            flex-direction: column;
            .header-name {
                font-size: 16px;
                font-weight: 600;
                color: #fff;
            }
            .header-id {
                margin-top: 2px;
                font-size: 12px;
                color: #8C8C8C;
            }
        }
    }

    .avatar-menu__item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        margin: 0 4px;
        border-radius: 8px;
        &:hover {
            background: #262626;
        }
        .item-icon { color: #BFBFBF; }
        .item-text { color: #E8E8E8; font-size: 14px; }
        &.danger {
            .item-icon, .item-text { color: #FF7875; }
        }
    }
}
</style>
