<template>
    <div class="creator-right">
        <div class="preview-card">
            <div class="preview-cover"
                :style="{ backgroundImage: form.backgroundImage ? `url(${form.backgroundImage})` : 'none' }">
            </div>
            <div class="preview-avatar">
                <img v-if="form.avatar" :src="form.avatar" alt="Avatar" class="avatar-img">
                <div v-else class="avatar-placeholder"></div>
                <img class="verified" src="@/assets/images/icons/check_icon.png" alt="">
            </div>
            <div class="preview-name">{{ form.username || 'Please Enter' }}</div>
            <div class="preview-about">
                <div class="title">About me</div>
                <div class="desc">{{ form.about || 'Please Enter' }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'PreviewCard',
    props: {
        form: {
            type: Object,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
.creator-right {
    height: fit-content;
    width: 393px;

    @media (max-width: 768px) {
        display: none !important;
    }
}

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
        right: -14px;
        bottom: -14px;
        width: 28px;
        height: 28px;
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
</style>
