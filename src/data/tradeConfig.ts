import { postLeverageWithToast } from "@/composables/restfulAPI"
import { computed, ref, watch } from "vue"
import { isVerified } from "@/data/tradeInfo"

export const symbol = ref("BTCUSDT") // TODO: add other symbol support

const leverageOptions = [1, 2, 5, 25, 50, 75, 100, 125]
export const leverageShow = leverageOptions.reduce((map, e) => ((map[e + "x"] = e), map), {} as { [key: string]: number })
export const leverageSelected = ref(Object.keys(leverageShow)[Object.keys(leverageShow).length - 1])
export const leverage = computed(() => leverageShow[leverageSelected.value])

watch(
  () => isVerified.value && leverage.value,
  () => isVerified.value && postLeverageWithToast(symbol.value, leverage.value)
)