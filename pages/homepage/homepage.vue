<template>
  <view>
    <scroll-select
      size="default"
      valueKey="id"
      labelKey="title"
      :selections="selections"
      v-model="result"
      :max="2"
      @change="onChange"
      @onSelectEnd="onSelectEnd"
      @onOverSelect="onOverSelect"
    />
  </view>
</template>

<script>
import ScrollSelect from '@/components/scroll-select'

export default {
  components: {
    ScrollSelect,
  },
  data() {
    return {
      selections: [
        {
          title: '美年达',
          id: 1,
        },
        {
          title: '芬达',
          id: 2,
        },
        {
          title: '百事可乐',
          id: 3,
        },
        {
          title: '可口可乐',
          id: 4,
        },
        {
          title: '雪碧',
          id: 5,
          disabled: true,
        },
        {
          title: '7喜',
          id: 6,
        },
      ],
      result: [1], // 可以填默认值
    }
  },
  onLoad() {},
  onShow() {},
  methods: {
    onChange(e) {
      this.toast(`点击结束#onChange#：${e}`)
    },
    onSelectEnd(e) {
      this.toast(`选择结束#onSelectEnd#：${e}`)
    },
    onOverSelect(e) {
      this.toast(`点多了！！#onOverSelect#：${e}`)
    },
    toast(message) {
      uni.showToast({
        title: message,
        icon: 'none',
        duration: 1500,
      })
    },
  },
}
</script>

<style scoped lang="scss">
</style>
