<template>
    <div class="creator-left">
        <h2 class="page-title">Become a creator</h2>

        <el-steps class="creator-steps" direction="vertical" :active="0" process-status="wait"
            finish-status="wait">
            <el-step>
                <template #title>Choose your URL</template>
                <template #description>
                    <el-input v-model="form.url" placeholder="Clcsr.so/" class="mt-8" />
                </template>
            </el-step>

            <el-step>
                <template #title>Username</template>
                <template #description>
                    <el-input v-model="form.username" placeholder="Please Enter" class="mt-8" />
                </template>
            </el-step>

            <el-step>
                <template #title>Profile Background</template>
                <template #description>
                    <div class="upload-grid mt-8">
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
                </template>
            </el-step>

            <el-step>
                <template #title>About me</template>
                <template #description>
                    <el-input v-model="form.about" type="textarea" :rows="4" placeholder="Please Enter"
                        class="mt-8" />
                    <div class="char-count">{{ form.about.length }}/500</div>
                </template>
            </el-step>

            <el-step>
                <template #title>Social Media</template>
                <template #description>
                    <div class="social-row mt-8">
                        <img src="@/assets/images/icons/ins.png" alt="" @click="addSocial('instagram')">
                        <img src="@/assets/images/icons/douyin.png" alt="" @click="addSocial('tiktok')">
                        <img src="@/assets/images/icons/x.png" alt="" @click="addSocial('x')">
                        <img src="@/assets/images/icons/youtube.png" alt="" @click="addSocial('youtube')">
                        <img src="@/assets/images/icons/link.png" alt="" @click="addSocial('link')">
                    </div>
                    <div class="links-list mt-12">
                        <div v-for="(link, index) in socialLinks" :key="index" class="link-item"
                            :class="{ error: link.error }">
                            <img class="link-icon" src="@/assets/images/icons/ins.png" alt=""
                                v-if="link.type == 'instagram'">
                            <img class="link-icon" src="@/assets/images/icons/douyin.png" alt=""
                                v-if="link.type == 'tiktok'">
                            <img class="link-icon" src="@/assets/images/icons/x.png" alt=""
                                v-if="link.type == 'x'">
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
                            <div v-if="link.error" class="error-text">This URL isn't available. Please try
                                another.</div>
                        </div>
                    </div>
                </template>
            </el-step>

            <el-step>
                <template #title>Tags</template>
                <template #description>
                    <div class="tags-row mt-8">
                        <span v-for="tag in allTags" :key="tag" class="tag-chip"
                            :class="{ active: form.tags.includes(tag) }" @click="toggleTag(tag)">{{ tag
                            }}</span>
                    </div>
                </template>
            </el-step>
        </el-steps>
        <div class="footer-actions">
            <el-button type="primary" size="large" class="continue-btn">Continue</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Delete } from '@element-plus/icons-vue'

export default defineComponent({
    name: 'DesktopForm',
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
.creator-left {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    max-width: 665px;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        display: none !important;
    }
}

.page-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
}

.creator-steps {
    --el-text-color-regular: #606266;
}

/* 强制覆盖垂直步骤条连接线为虚线效果 */
.creator-steps :deep(.el-steps--vertical .el-step__line),
.creator-steps :deep(.el-step.is-vertical .el-step__line),
.creator-steps :deep(.el-step__line) {
    width: 2px !important;
    background: repeating-linear-gradient(to bottom,
            #dcdfe6 0,
            #dcdfe6 6px,
            transparent 6px,
            transparent 12px) !important;
    border: none !important;
}

.mt-8 {
    margin-top: 8px;
}

.mt-12 {
    margin-top: 12px;
}

.upload-grid {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 16px;
}

.upload-card {
    height: 100px;
    border: 1px dashed #e5e7eb;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    .uploaded-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    .plus {
        font-size: 24px;
        color: #bfbfbf;
        z-index: 1;
    }

    .upload-label {
        font-size: 12px;
        color: #909399;
        margin-top: 4px;
        z-index: 1;
    }
}

.char-count {
    text-align: right;
    color: #bfbfbf;
    font-size: 12px;
    margin-top: 4px;
}

.social-row {
    display: flex;
    gap: 10px;

    img {
        width: 44px;
        height: auto;
        object-fit: cover;
        cursor: pointer;
    }
}

.links-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.link-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;

    .link-icon {
        width: 42px;
        height: auto;
        object-fit: cover;
    }
}

.link-item.error {
    border-color: #ff4d4f;
}

.link-type {
    font-size: 12px;
    color: #909399;
    margin-bottom: 6px;
    display: inline-block;
}

.link-input {
    margin-right: 8px;
}

.error-text {
    color: #FF4D4D;
    font-size: 14px;
    margin-top: 8px;
}

.tags-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    .tag-chip {
        padding: 11.5px 12px;
        border-radius: 8px;
        background: #FAFAFA;
        color: #1F1F1F;
        cursor: pointer;
        font-size: 14px;
    }
}

.tag-chip.active {
    background: #e6f4ff;
    color: #1677ff;
    border: 1px solid #91caff;
}

.footer-actions {
    margin-top: 24px;
    display: flex;
    justify-content: flex-start;
    padding-left: 40px;

    .continue-btn {
        width: 160px;
        height: 42px;
        font-size: 14px;
        border-radius: 52px;
    }
}

/* 输入框背景统一为 #FAFAFA */
.creator-left :deep(.el-input__wrapper) {
    background-color: #FAFAFA;
}

.creator-left :deep(.el-textarea__inner) {
    background-color: #FAFAFA;
}

.links-list :deep(.el-input__wrapper) {
    background-color: #FAFAFA;
}
</style>
