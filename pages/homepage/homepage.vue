<template>
  <view>
    <scroll-select :selections="selections" v-model="result" @change="onChange"/>
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
          label: '美年达',
          value: 1,
        },
        {
          label: '芬达',
          value: 2,
        },
        {
          label: '百事可乐',
          value: 3,
        },
        {
          label: '可口可乐',
          value: 4,
        },
        {
          label: '雪碧',
          value: 5,
          disabled: true,
        },
        {
          label: '7喜',
          value: 6,
        },
      ],
      result: [],
    }
  },
  onLoad() {
  },
  onShow() {

  },
  methods: {
    onChange() {
      console.log(this.result)
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
