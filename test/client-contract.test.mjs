import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'

const client = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')

test('composer client uses native discrete effort selection and safe menu modes', () => {
  assert.match(client, /--bre-level-count/)
  assert.match(client, /--bre-level-step/)
  assert.match(client, /bre-effort-slider::before/)
  assert.match(client, /data-bre-mode="slider"/)
  assert.match(client, /advancedSettingsOpen/)
  assert.match(client, /isNative=N===\"deepseek\"\|\|N===\"deepseek-official\"/)
  assert.match(client, /q\.textContent!==V&&\(q\.textContent=V\)/)
  // Menu visibility is class-driven; repeated MutationObserver scans do not
  // rewrite the React wrapper's inline display state on every callback.
  assert.doesNotMatch(client, /k\.wrapper\.style\.display/)
})

test('unsupported and native routes retire the injected composer mount', () => {
  assert.match(client, /if\(isNative\|\|!R\)\{cleanup\(\);return\}/)
  assert.match(client, /type:"range"[^}]*step:1/)
  assert.match(client, /n\.select\(\{provider:current\.provider,model:current\.model,reasoningEffort:S\}\)/)
  assert.doesNotMatch(client, /bre-effort-canvas/)
  assert.doesNotMatch(client, /requestAnimationFrame\(ae\)/)
  assert.doesNotMatch(client, /addEventListener\("pointermove"/)
  assert.match(client, /data-bre-mode=\"native-list\"/)
})

test('client bundle evaluates through the DSH module-loader contract', () => {
  let exportsValue
  class Component { constructor(props) { this.props = props } }
  const react = {
    Component,
    createElement: (...args) => ({ args }),
    useSyncExternalStore: () => ({}),
    useState: (value) => [value, () => {}],
    useEffect: () => {},
    useRef: (value) => ({ current: value }),
    useCallback: (value) => value,
  }
  const reactDom = { createRoot: () => ({ render() {}, unmount() {} }) }
  const context = {
    console,
    performance: { now: () => 0 },
    window: {
      __ModuleLoader__: {
        load({ factory }) {
          exportsValue = factory((name) => name === 'react' ? react : name === 'react-dom/client' ? reactDom : react)
        },
      },
    },
  }
  vm.runInNewContext(client, context, { filename: 'lib/client.js' })
  assert.equal(exportsValue.name, 'better-basicfun')
  assert.equal(typeof exportsValue.apply, 'function')
})
