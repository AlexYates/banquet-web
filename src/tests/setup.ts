// banquet-web/src/tests/setup.ts

import { afterEach, beforeEach } from 'vitest'
import { vi } from 'vitest'

beforeEach(() => {
    localStorage.clear()
})

afterEach(() => {
    vi.clearAllMocks()
})
