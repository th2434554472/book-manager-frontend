<!--  -->
<template>
  <div class="upload-item">
    <el-upload  ref="uploadFiles"
                :accept="type"
                :class="{ borderNone: imageUrl }"
                class="avatar-uploader"
                action="http://localhost:8082/common/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-remove="handleRemove"
                :on-error="handleError"
                :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl"
           :src="imageUrl"
           class="avatar">

      <i v-else
         class="el-icon-plus avatar-uploader-icon" />
      <span v-if="imageUrl"
            class="el-upload-list__item-actions">
        <span class="el-upload-span"
              @click.stop="uploadImgDel">
          删除图片
        </span>
        <span class="el-upload-span"> 重新上传 </span>
      </span>
    </el-upload>
    <p class="upload-tips">
      <slot />
    </p>
  </div>
</template>


<script>

export default {
  name: 'UploadImage',
  props: {
    type: { type: String, default: '.jpg,.jpeg,.png' },
    size: { type: Number, default: 2 },
    propImageUrl: { type: String, default: '' }
  },

  data() {
    return {
      imageUrl: ''
    }
  },

  watch: {
    propImageUrl(){this.onChange()}
  },

  methods: {
    handleRemove() {},

    handleError() {
      this.$message({
        message: '图片上传失败',
        type: 'error'
      })
    },

    handleAvatarSuccess(response) {
      this.imageUrl = `${response.data}`
      this.$emit('imageChange', this.imageUrl)
    },

    uploadImgDel() {
      this.imageUrl = ''
      this.$emit('imageChange', this.imageUrl)
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < this.size
      if (!isLt2M) {
        this.$message({
          message: `上传文件大小不能超过${this.size}M!`,
          type: 'error'
        })
        return false
      }
    },

    onChange(val) {
      this.imageUrl = val
    }
  }
}
</script>
<style lang='scss'>
.borderNone {
  .el-upload {
    border: 1px solid #d9d9d9 !important;
  }
}
</style>
<style scoped lang="scss">

.el-upload-list__item-actions:hover .upload-icon {
  display: inline-block;
}
.el-icon-zoom-in:before {
  content: '\E626';
}
.el-icon-delete:before {
  content: '\E612';
}
.el-upload-list__item-actions:hover {
  opacity: 1;
}
.upload-item {
  display: flex;
  align-items: center;
  .el-form-item__content {
    width: 200px !important;
  }
}
.upload-tips {
  font-size: 12px;
  color: #666666;
  display: inline-block;
  line-height: 17px;
  margin-left: 36px;
}
.el-upload-list__item-actions {
  position: absolute;
  width: 202px;
  height: 202px;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.avatar-uploader .el-upload {
  width: 200px;
  height: 200px;
  border: 1px dashed #000000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  display: inline-block;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  border: 1px dashed #000000;
  line-height: 200px;
  text-align: center;
}
.el-upload-span {
  width: 100px;
  height: 30px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
}

.el-upload-span:first-child {
  margin-bottom: 20px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>
