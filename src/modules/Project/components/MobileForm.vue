<template>
    <div class="mobile-form">
        <div class="form-section">
            <h3 data-number="1">Choose your URL</h3>
            <el-input v-model="form.url" placeholder="Clcsr.so/" class="form-input" />
        </div>

        <div class="form-section">
            <h3 data-number="2">Username</h3>
            <el-input v-model="form.username" placeholder="Please Enter" class="form-input" />
        </div>

        <div class="form-section">
            <h3 data-number="3">Profile Background</h3>
            <div class="upload-grid">
                <div class="upload-card" @click="uploadAvatar">
                    <img v-if="form.avatar" :src="form.avatar" alt="Avatar" class="uploaded-img">
                    <span v-else class="plus">+</span>
                    <div class="upload-label">Avatar</div>
                </div>
                <div class="upload-card" @click="uploadBackground">
                    <img v-if="form.backgroundImage" :src="form.backgroundImage" alt="Background"
                        class="uploaded-img">
                    <span v-else class="plus">+</span>
                    <div class="upload-label">Background</div>
                </div>
            </div>
        </div>

        <div class="form-section">
            <h3 data-number="4">About me</h3>
            <el-input v-model="form.about" type="textarea" :rows="4" placeholder="Please Enter"
                class="form-textarea" />
            <div class="char-count">{{ form.about.length }}/500</div>
        </div>

        <div class="form-section">
            <h3 data-number="5">Social Media</h3>
            <div class="social-row">
                <img src="@/assets/images/icons/ins.png" alt="" @click="addSocial('instagram')">
                <img src="@/assets/images/icons/douyin.png" alt="" @click="addSocial('tiktok')">
                <img src="@/assets/images/icons/x.png" alt="" @click="addSocial('x')">
                <img src="@/assets/images/icons/youtube.png" alt="" @click="addSocial('youtube')">
                <img src="@/assets/images/icons/link.png" alt="" @click="addSocial('link')">
            </div>
            <div class="links-list">
                <div v-for="(link, index) in socialLinks" :key="index" class="link-item"
                    :class="{ error: link.error }">
                    <img class="link-icon" src="@/assets/images/icons/ins.png" alt=""
                        v-if="link.type == 'instagram'">
                    <img class="link-icon" src="@/assets/images/icons/douyin.png" alt=""
                        v-if="link.type == 'tiktok'">
                    <img class="link-icon" src="@/assets/images/icons/x.png" alt="" v-if="link.type == 'x'">
                    <img class="link-icon" src="@/assets/images/icons/youtube.png" alt=""
                        v-if="link.type == 'youtube'">
                    <img class="link-icon" src="@/assets/images/icons/link.png" alt=""
                        v-if="link.type == 'link'">
                    <el-input v-model="link.url" placeholder="请输入链接" class="link-input" />
                    <template v-if="!link.confirmed">
                        <el-button size="small" type="primary" :disabled="!isLinkMatch(link)"
                            @click="confirmLink(index)">Confirm</el-button>
                    </template>
                    <template v-else>
                        <el-button size="small" text type="danger" @click="removeLink(index)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            Delete
                        </el-button>
                    </template>
                    <div v-if="link.error" class="error-text">This URL isn't available. Please try another.
                    </div>
                </div>
            </div>
        </div>

        <div class="form-section">
            <h3 data-number="6">Tags</h3>
            <div class="tags-row">
                <span v-for="tag in allTags" :key="tag" class="tag-chip"
                    :class="{ active: form.tags.includes(tag) }" @click="toggleTag(tag)">{{ tag }}</span>
            </div>
        </div>

        <div class="mobile-footer-actions">
            <el-button type="primary" size="large" class="continue-btn">Continue</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Delete } from '@element-plus/icons-vue'

export default defineComponent({
    name: 'MobileForm',
    props: {
        form: {
            type: Object,
            required: true
        },
        allTags: {
            type: Array,
            required: true
        },
        socialLinks: {
            type: Array,
            required: true
        }
    },
    emits: [
        'update:form',
        'upload-avatar',
        'upload-background',
        'add-social',
        'confirm-link',
        'remove-link',
        'toggle-tag'
    ],
    setup(props, { emit }) {
        const uploadAvatar = () => {
            emit('upload-avatar')
        }

        const uploadBackground = () => {
            emit('upload-background')
        }

        const addSocial = (type: string) => {
            emit('add-social', type)
        }

        const isLinkMatch = (link: any) => {
            if (!link.url) return false
            const rules: Record<string, RegExp> = {
                instagram: /^https?:\/\/(www\.)?instagram\.com\//i,
                tiktok: /^https?:\/\/(www\.)?tiktok\.com\//i,
                x: /^https?:\/\/(www\.)?(twitter|x)\.com\//i,
                youtube: /^https?:\/\/(www\.)?youtube\.com\//i,
                link: /^https?:\/\//i
            }
            return rules[link.type].test(link.url)
        }

        const confirmLink = (index: number) => {
            emit('confirm-link', index)
        }

        const removeLink = (index: number) => {
            emit('remove-link', index)
        }

        const toggleTag = (tag: string) => {
            emit('toggle-tag', tag)
        }

        return {
            uploadAvatar,
            uploadBackground,
            addSocial,
            isLinkMatch,
            confirmLink,
            removeLink,
            toggleTag
        }
    }
})
</script>

<style lang="scss" scoped>
.mobile-form {
    display: none;
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
}

.form-section {
    margin-bottom: 24px;

    h3 {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        
        &::before {
            content: attr(data-number);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            background: #FFF;
            color: #1F1F1F;
            border-radius: 50%;
            font-size: 12px;
            font-weight: 600;
            flex-shrink: 0;
            border: 1px solid #979797;
        }
    }
}

.form-input,
.form-textarea {
    width: 100%;
}

/* 移动端输入框样式 */
.mobile-form :deep(.el-input__wrapper) {
    background: #FAFAFA !important;
    border-radius: 12px !important;
    height: 44px !important;
    box-shadow: none !important;
    border: 1px solid #e5e7eb !important;
}

.mobile-form :deep(.el-textarea__inner) {
    background: #FAFAFA !important;
    border-radius: 12px !important;
    box-shadow: none !important;
    border: 1px solid #e5e7eb !important;
}

.upload-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.upload-card {
    border: 2px dashed #e5e7eb;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
        border-color: #3278FF;
    }

    .plus {
        font-size: 24px;
        color: #999;
        margin-bottom: 8px;
    }

    .upload-label {
        font-size: 14px;
        color: #666;
    }

    .uploaded-img {
        width: 100%;
        height: 80px;
        object-fit: cover;
        border-radius: 4px;
    }
}

.social-row {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;

    img {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
}

.links-list {
    .link-item {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;

        &.error {
            border-color: #f56565;
        }
    }

    .link-icon {
        width: 24px;
        height: 24px;
    }

    .link-input {
        flex: 1;
    }

    .error-text {
        color: #f56565;
        font-size: 12px;
        margin-top: 4px;
    }
}

.tags-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .tag-chip {
        padding: 6px 12px;
        border: 1px solid #e5e7eb;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;

        &.active {
            background: #3278FF;
            color: #fff;
            border-color: #3278FF;
        }
    }
}

.mobile-footer-actions {
    margin-top: 20px;
    text-align: center;
    .continue-btn {
        width: 100%;
        height: 42px;
        font-size: 14px;
        border-radius: 52px;
    }
}

/* 移动端样式 */
@media (max-width: 768px) {
    .mobile-form {
        display: block;
    }
}
</style>
