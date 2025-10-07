<template>
    <LayoutArea>
        <template #side>
            <LayoutSection title="Closr">
                <SidebarMenu />
            </LayoutSection>
        </template>

        <template #top>
            <NavigationNavBar :fixed="false"></NavigationNavBar>
        </template>

        <template #content>
            <div class="creator-container">
                <!-- 移动端表单内容 -->
                <MobileForm 
                    :form="form"
                    :all-tags="allTags"
                    :social-links="socialLinks"
                    @upload-avatar="uploadAvatar"
                    @upload-background="uploadBackground"
                    @add-social="addSocial"
                    @confirm-link="confirmLink"
                    @remove-link="removeLink"
                    @toggle-tag="toggleTag"
                />

                <!-- 桌面端表单内容 -->
                <DesktopForm 
                    :form="form"
                    :all-tags="allTags"
                    :social-links="socialLinks"
                    @upload-avatar="uploadAvatar"
                    @upload-background="uploadBackground"
                    @add-social="addSocial"
                    @confirm-link="confirmLink"
                    @remove-link="removeLink"
                    @toggle-tag="toggleTag"
                />

                <!-- 桌面端预览卡片 -->
                <PreviewCard :form="form" />
            </div>
        </template>
    </LayoutArea>
</template>

<script lang="ts">
import NavigationNavBar from '@/components/Navigation/NavBar.vue'
import SidebarMenu from '@/modules/Project/components/SidebarMenu.vue'
import MobileForm from '@/modules/Project/components/MobileForm.vue'
import DesktopForm from '@/modules/Project/components/DesktopForm.vue'
import PreviewCard from '@/modules/Project/components/PreviewCard.vue'

export default defineComponent({
    name: 'ProjectList',
    components: {
        NavigationNavBar,
        SidebarMenu,
        MobileForm,
        DesktopForm,
        PreviewCard
    },
    setup() {
        const form = reactive({
            url: '',
            username: '',
            about: '',
            tags: [] as string[],
            avatar: '',
            backgroundImage: ''
        })

        const allTags = ['🤖 Health maintenance', '🍚 Food travel', '🎯 Art design', '🏀 Sport', '🎹 Travel']

        type SocialType = 'instagram' | 'tiktok' | 'x' | 'youtube' | 'link'
        const socialLinks = reactive<Array<{ type: SocialType; typeLabel: string; url: string; error?: boolean; confirmed?: boolean }>>([])

        function addSocial(type: SocialType) {
            const mapping: Record<SocialType, string> = {
                instagram: 'Instagram',
                tiktok: 'TikTok',
                x: 'X',
                youtube: 'YouTube',
                link: 'Link'
            }
            socialLinks.push({ type, typeLabel: mapping[type], url: '', error: false })
        }

        function isLinkMatch(item: { type: SocialType; url: string }) {
            if (!item.url) return false
            const rules: Record<SocialType, RegExp> = {
                instagram: /^https?:\/\/(www\.)?instagram\.com\//i,
                tiktok: /^https?:\/\/(www\.)?tiktok\.com\//i,
                x: /^https?:\/\/(www\.)?(twitter|x)\.com\//i,
                youtube: /^https?:\/\/(www\.)?youtube\.com\//i,
                link: /^https?:\/\//i
            }
            return rules[item.type].test(item.url)
        }

        function confirmLink(index: number) {
            const item = socialLinks[index]
            const isValid = isLinkMatch(item)
            item.error = !isValid
            if (isValid) item.confirmed = true
        }

        function removeLink(index: number) {
            socialLinks.splice(index, 1)
        }

        function toggleTag(tag: string) {
            const i = form.tags.indexOf(tag)
            if (i === -1) form.tags.push(tag)
            else form.tags.splice(i, 1)
        }

        function uploadAvatar() {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'image/*'
            input.onchange = (e: any) => {
                const file = e.target.files[0]
                if (file) {
                    const reader = new FileReader()
                    reader.onload = (e: any) => {
                        form.avatar = e.target.result
                    }
                    reader.readAsDataURL(file)
                }
            }
            input.click()
        }

        function uploadBackground() {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'image/*'
            input.onchange = (e: any) => {
                const file = e.target.files[0]
                if (file) {
                    const reader = new FileReader()
                    reader.onload = (e: any) => {
                        form.backgroundImage = e.target.result
                    }
                    reader.readAsDataURL(file)
                }
            }
            input.click()
        }

        return {
            form,
            allTags,
            socialLinks,
            addSocial,
            confirmLink,
            removeLink,
            toggleTag,
            uploadAvatar,
            uploadBackground
        }
    }
})
</script>

<style lang="scss" scoped>
.creator-container {
    display: flex;
    gap: 16px;
    padding: 16px;
}

/* 移动端样式 */
@media (max-width: 768px) {
    .creator-container {
        flex-direction: column;
        padding: 8px;
        gap: 12px;
        background: #FFFFFF;
    }
}
</style>