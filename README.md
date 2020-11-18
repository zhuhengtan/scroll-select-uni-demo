# scroll-select-uni-demo
为uni-app开发的横向行内选择组件，此项目示意如何使用，请clone项目，在components目录下复制组件。

## 引入使用：
#### 1. 下载组件，将`scroll-select`文件夹拖入`components`

#### 2. 引入组件
```js
import ScrollSelect from '@/components/scroll-select'
components: {
  ScrollSelect,
},
```

#### 3. 使用
支持用`v-model`绑定值，必须是数组。
```js
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
```

## 属性
| 属性名     | 类型   | 默认值  | 说明                                                                  |
| ---------- | ------ | ------- | --------------------------------------------------------------------- |
| size       | String | default | 组件大小，提供两个大小，`default`和`mini`                             |
| selections | Array  | []      | 传入选项的数组，如果想禁用某个选项，在该选项下加入`disabled:true`即可 |
| valueKey   | String | value   | 传入数组选项值绑定的key                                               |
| labelKey   | String | label   | 传入数组选项显示的文字key                                             |
| max        | Number | 1       | 最多能选几个选项                                                      |


## 方法
| 方法名       | 回调参数           | 说明                                                                            |
| ------------ | ------------------ | ------------------------------------------------------------------------------- |
| onSelectEnd  | 当前选中值（数组） | 每次点击值有变动均会调用                                                        |
| onSelectEnd  | 当前选中值（数组） | 当选中数量到达max值时会调用，可用来直接触发选完之后跳到下一页或下一题之类的操作 |
| onOverSelect | 当前选中值（数组） | 当选中已经达到数组最大值时，再点击其他选项会调用，用作提示已经达到最大值        |


## 更新记录

> 2020-11-18
> 1. 第一次上传组件
