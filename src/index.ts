import {getQueriesForElement, prettyDOM} from '@testing-library/dom'
import {component as tagComponent, RiotComponent} from 'riot'

export * from '@testing-library/dom'

interface renderOptions {
  container?: HTMLElement,
  target?: HTMLElement,
  [key: string]: any
}

type Container = {
  target: HTMLElement,
  component: RiotComponent<any, any>,
};

const mountedContainers : Map<HTMLElement,Container> = new Map();

export const render = (Component, {
  container = document.body,
  target = container.appendChild(document.createElement('div')),
  ...options
} : renderOptions = {}) => {
  const ui = tagComponent(Component);
  let component = ui(target, options);
  mountedContainers.set(target, {target, component});
  return {
    get component() {
      return component
    },
    debug: (el = container) => console.log(prettyDOM(el)),
    container,
    unmount: () => cleanupAtContainer({ target, component}),
    rerender: (options) => {
      if(component) {
        component.unmount(true);
      }
      const newComponent = ui(target, options);
      mountedContainers.set(target, { target, component: newComponent, x: 1 })
      component = newComponent
    },
    ...getQueriesForElement(target),
  }
}

const cleanupAtContainer = (container: Container) => {
  const {target, component} = container;
  component.unmount(true);
  if(target.parentNode) {
    target.parentNode.removeChild(target);
  }
  mountedContainers.delete(target)
}

export const cleanup = () => {
  mountedContainers.forEach(cleanupAtContainer)
}

export default render

export * from '@testing-library/dom'

// if we're running in a test runner that supports afterEach
// then we'll automatically run cleanup afterEach test
// this ensures that tests run in isolation from each other
// if you don't like this then either import the `pure` module
// or set the RTL_SKIP_AUTO_CLEANUP env variable to 'true'.
// inspired from react-testing-library
if (typeof afterEach === 'function' && !process.env.RIOT_TL_SKIP_AUTO_CLEANUP) {
  afterEach(() => {
    cleanup()
  })
}
