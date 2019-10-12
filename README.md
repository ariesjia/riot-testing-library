# riot-testing-library


[![Actions Status](https://github.com/ariesjia/riot-testing-library/workflows/Node%20CI/badge.svg)](https://github.com/ariesjia/riot-testing-library/actions)
[![NPM](https://img.shields.io/npm/v/riot-testing-library.svg)](https://www.npmjs.com/package/riot-testing-library)
[![license](https://badgen.net/badge/license/MIT/blue)](https://github.com/ariesjia/riot-testing-library/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/ariesjia/riot-testing-library/branch/master/graph/badge.svg)](https://codecov.io/gh/ariesjia/riot-testing-library)
[![Maintainability](https://api.codeclimate.com/v1/badges/d58d5b16adaf9a87c8df/maintainability)](https://codeclimate.com/github/ariesjia/riot-testing-library/maintainability)

## API
### render
* `render({container, target, ...componentOptions}) => { container, unmount, rerender }`: render method to mount a component which include your custom hook

  * `container`:  The HTML element the component is mounted into. 
     
     default : `document.body`
  * `target`: The HTML element the component is mounted. 
     
     default : `container.appendChild(document.createElement('div'))`
  * `componentOptions`: The component props


#### Result
* `container`: container
* `component`: created riot component
* `render(options)`: method of rerender component
* `unmount()`: method of unmount component
* `debug()`: method of log current dom
* `...queries`: Returns all [query functions](https://testing-library.com/docs/dom-testing-library/api-queries) that are binded to the target.

### cleanup
Unmounts the component from the container and destroys the container.
`cleanup()` is called after each test automatically by default if the testing framework you're using supports the afterEach global (like mocha, Jest, and Jasmine).
However, you may choose to skip the auto cleanup by setting the RIOT_TL_SKIP_AUTO_CLEANUP env variable to 'true'.
To make this even easier, you can also simply import `riot-testing-library/dont-cleanup-after-each` which will do the same thing.

### also export all api from [@testing-library/dom](https://testing-library.com/docs/dom-testing-library/intro)

## Demo

### Component
```html
<app>
  <p data-testid="count">{ state.count }</p>
  <button data-testid="button" onclick={add}>button</button>
  <script>
    export default {
      onBeforeMount(props) {
        this.state = {
          count: props.count || 0
        }
      },
      add() {
        this.update({ count: this.state.count + 1 })
      },
    }
  </script>
</app>
```

### Test
```javascript
import render, { fireEvent } from 'riot-testing-library'
import TestTag from './test.tag'

test('should show count text  when rendered', () => {
  const { queryByTestId } = render(TestTag, {count: 10});
  expect(queryByTestId('count').textContent).toBe("10");
})

test('should add count when click add button text', () => {
    const { queryByTestId } = render(TestTag, {count: 1});
    expect(queryByTestId('count').textContent).toBe("1");
    fireEvent.click(queryByTestId('button'))
    expect(queryByTestId('count').textContent).toBe("2");
})
```
