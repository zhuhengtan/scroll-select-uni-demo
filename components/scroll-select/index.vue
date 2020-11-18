<template>
  <scroll-view
    scroll-x
    class="container"
    :show-scrollbar="false"
    :style="{ height: size === 'default' ? '68rpx' : '54rpx' }"
  >
    <template v-for="selection in realSelections">
      <view
        class="selection"
        :class="[size, selection.disabled ? 'selection-disabled' : '']"
        :style="`background-color: ${
          selection.selected ? color : ''
        }; border: ${
          selection.selected ? '1upx solid ' + color : '1upx solid #666'
        }; color:${selection.selected ? 'white' : '#666'};`"
        :key="selection[valueKey]"
        @tap="handleTapSelection(selection)"
      >
        {{ selection[labelKey] }}
      </view>
    </template>
  </scroll-view>
</template>

<script>
export default {
  name: 'ScrollSelect',
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
    selections: {
      type: Array,
      default() {
        return []
      },
    },
    canCreate: {
      type: Boolean,
      default: false,
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    selected: {
      type: Array,
      default() {
        return []
      },
    },
    color: {
      type: String,
      default: 'rgb(235, 84, 5)',
    },
    size: {
      type: String,
      default: 'default',
    },
    max: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      realSelections: [],
      mutableSelected: JSON.parse(JSON.stringify(this.selected)),
      createInput: '',
    }
  },
  watch: {
    selections: {
      deep: true,
      immediate: true,
      handler() {
        this.initSelections()
      },
    },
  },
  methods: {
    initSelections() {
      this.realSelections = this.selections.map((item) => {
        if (typeof item !== 'object') {
          const newItem = {}
          newItem[this.valueKey] = item
          newItem[this.labelKey] = item
          if (this.selected.indexOf(item)) {
            newItem.selected = true
          } else {
            newItem.selected = false
          }
          return newItem
        }
        if (this.selected.indexOf(item[this.valueKey]) !== -1) {
          item.selected = true
        } else {
          item.selected = false
        }
        return item
      })
    },
    handleTapSelection(selection) {
      if (selection.disabled) return
      if (this.max === 1 && this.selected.length === 1) { // 处理单选
        this.realSelections.forEach((selection) => {
          if (selection[this.valueKey] === this.selected[0]) {
            selection.selected = false
          }
        })
      } else if (this.max > 1 && this.selected.length === this.max) { // 处理多选
        if (this.selected.indexOf(selection[this.valueKey]) === -1) {
          this.$emit('onOverSelect', this.selected)
          return
        }
      }
      selection.selected = !selection.selected
      this.$forceUpdate()
      const selected = []
      this.realSelections.forEach((selection) => {
        if (selection.selected) {
          selected.push(selection[this.valueKey])
        }
      })
      this.$emit('change', selected)
      if (selected.length === this.max) {
        this.$emit('onSelectEnd', selected)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  white-space: nowrap;
  .selection {
    padding: 10upx 20upx;
    border-radius: 5upx;
    color: #666;
    margin-left: 20upx;
    display: inline-block;
    text-align: center;
  }
  .default {
    height: 44upx;
    line-height: 44upx;
    font-size: 28upx;
  }
  .mini {
    height: 30upx;
    line-height: 30upx;
    font-size: 22upx;
  }
  .selection:first-child {
    margin-left: 0;
  }
  .selection-disabled {
    background-color: #f4f4f4;
    color: #bbb !important;
    border: 1upx solid #bbb !important;
  }
}
</style>
