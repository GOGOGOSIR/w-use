import { ref } from 'vue'
import type { Ref } from 'vue'

export function testR(): Ref<boolean> {
  const loading = ref(false)
  return loading
}
