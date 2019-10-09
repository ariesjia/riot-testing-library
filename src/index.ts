import {getQueriesForElement, prettyDOM} from '@testing-library/dom'
import { component as tagComponent, RiotComponent } from 'riot'
export * from '@testing-library/dom'

interface renderOptions {
  target?: HTMLElement,
  [key: string]: any
}

type Container = { target: HTMLElement, component: RiotComponent<any, any> };

const mountedContainers : Set<Container> = new Set();

export const render = (Component, {
  target = document.body.appendChild(document.createElement('div')),
  ...options
} : renderOptions = {}) => {
  const component = tagComponent(Component)(target, options);

  const container = {target, component};

  mountedContainers.add(container);

  return {
    component,
    debug: (el = document.body) => console.log(prettyDOM(el)),
    container: document.body,
    unmount: () => cleanupAtContainer(container),
    ...getQueriesForElement(target),
  }
}

const cleanupAtContainer = (container: Container) => {
  const {target, component} = container;
  component.unmount(true);
  if(target.parentNode) {
    target.parentNode.removeChild(target);
  }
  mountedContainers.delete(container)
}

export const cleanup = () => {
  mountedContainers.forEach(cleanupAtContainer)
}

export function act(fn) {
  const returnValue = fn()
  if (returnValue !== undefined && typeof returnValue.then === 'function') {
    return returnValue
  }
  return Promise.resolve()
}

export default render

export * from '@testing-library/dom'
