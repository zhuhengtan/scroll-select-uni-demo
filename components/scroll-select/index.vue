<template>
  <scroll-view scroll-x>
    <view class="container">
      <template v-for="selection in realSelections">
        <view
          class="selection"
          :style="`background-color: ${selection.selected ? color : ''}; border: ${selection.selected? ('1upx solid '+color):'1upx solid #666'}; color:${selection.selected?'white':'#666'};`"
          :key="selection.value"
          @tap="handleTapSelection(selection)"
        >
          {{ selection.label }}
        </view>
      </template>
    </view>
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
          newItem.selected = true
          return newItem
        }
        item.selected = true
        return item
      })
    },
    handleTapSelection(selection) {
      if (selection.disabled) return
      selection.selected = !selection.selected
      console.log(this.realSelections)
      const selected = []
      this.realSelections.forEach((selection) => {
        if (selection.selected) {
          selected.push(selection[this.valueKey])
        }
      })
      this.$emit('change', selected)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  .selection {
    padding: 10upx;
    border-radius: 5upx;
    color: #666;
  }
}
</style>
