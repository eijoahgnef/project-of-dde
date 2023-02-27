<template>
    <div class="upload">
        <div class="upload_head">
            <div class="upload_head_left" @click="backhome">取消</div>
            <div class="upload_head_right" @click="publish">记录</div>
        </div>

        <div class="upload_content">
            <div class="content_text">
                <textarea class="input_box" placeholder="明天会更好" v-model="sayWords"></textarea>
            </div>
            <div class="content_upload">
                <van-uploader v-model="fileList" multiple/>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { ref } from 'vue';
import { client } from "../../utile/ossUpload/index";
import { uploadImg } from "../../api/upload/uploadpic"
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { showFailToast, showSuccessToast } from 'vant';

export default {
    setup() {
        const router = useRouter()
        // 回显图片的列表
        const fileList = ref([]);
        // 图片上传后的url
        const uploadList: any = []
        // 文字描述
        const sayWords = ref('')
        // 取消按钮
        const backhome = () => {
            router.go(-1)
        }
        //  发布
        const publish = async () => {
            if (!fileList.value.length) {
                return
            }
            let account = window.sessionStorage.getItem("account")
            for (let i = 0; i < fileList.value.length; i++) {
                await client.put(`fragments/${account}-${Date.now()}`, fileList.value[i].file).then((res: any) => {

                    uploadList.push(res.url)
                })
            }
            
            let imgId = Date.now()
            let date = dayjs(new Date()).format("YYYY-MM-DD hh:mm:ss")
            let text = sayWords.value

            await uploadImg({
                account,
                imgId,
                date,
                text,
                uploadList
            }).then(res => {
                if (res.code == 401) {
                    showFailToast(res.msg)
                    router.push('/login')
                    return
                }
                if(res.code === 200) {
                    showSuccessToast('上传成功')
                    router.push('/notepad')
                }

            })


        }
        return {
            fileList,
            publish,
            sayWords,
            backhome
        };
    },
};

</script>


<style lang="scss" scoped>
.upload {
    height: 100%;
    background-color: $color-bg-light;

    .upload_head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        padding: 10px;
        letter-spacing: 1px;

        .upload_head_right {
            color: $color-bg-light;
            background-color: $color-title-bg;
            padding: 8px 12px;
            border-radius: 5px;
        }
    }

    .upload_content {
        padding: 0 20px;
        font-family: $text-style;

        .content_text {
            display: flex;
            margin-bottom: 10px;

            .input_box {
                font-size: 20px;
                height: 100px;
                width: 100%;
                border: none;
                background-color: $color-card;
                padding: 10px;
                border-radius: 10px;
            }
        }

    }
}
</style>
<style lang="scss">
.van-uploader__wrapper .van-uploader__upload {
    box-shadow: inset 0 2px 4px gray;
    border-radius: 8px;
    background-color: $color-bg-light;
}
</style>