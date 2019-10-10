import render, { cleanup, fireEvent } from '../src/index'
import hello from './test.tag'

afterEach(() => {
  cleanup()
})

describe("riot-testing-library", () => {
  it('should render tag component and return dom query', () => {
    const { container, queryByTestId } = render(hello);
    expect(queryByTestId('count').textContent).toBe("0");
    expect(container).toBe(document.body);
  })

  it('should get riot component', () => {
    const props = {count: 1};
    const { component } = render(hello, props);
    expect(component.name).toBe('app');
    expect(component.props).toEqual(props);
  })

  it('should use container parameter', () => {
    const  customContainer = document.createElement('div', )
    customContainer.classList.add('test-container')
    document.body.append(customContainer)
    const { container } = render(hello, {
      container: customContainer
    });
    expect(container).toBe(customContainer);
    expect(container).not.toBe(document.body);
    document.body.removeChild(container);
  })

  it('should use target parameter', () => {
    const  target = document.createElement('div', )
    target.classList.add('test-target')
    document.body.append(target)
    const { container, unmount } = render(hello, {
      target: target
    });
    expect(container).toBe(document.body);
    expect(container.innerHTML).toBe(`<div class="test-target" is="app"><p data-testid="count">0</p><button data-testid="button">button</button></div>`);
    expect(unmount())
    expect(container.innerHTML).toBe('');
  })

  it('should rerender tag component', () => {
    const { queryByTestId, rerender } = render(hello);
    rerender({count: 1})
    expect(queryByTestId('count').textContent).toBe("1");
  })

  it('should rerender after component was unmounted', () => {
    const { queryByTestId, rerender, unmount } = render(hello);
    unmount()
    rerender({count: 1})
    expect(queryByTestId('count').textContent).toBe("1");
  })

  it('should unmount tag component', () => {
    const { queryByTestId, unmount } = render(hello);
    unmount();
    expect(queryByTestId('count')).toBe(null);
  })

  it('should get container log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    const { debug } = render(hello);
    debug()
    expect(console.log).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should unmount tag component after rerender', () => {
    const { queryByTestId, rerender, unmount } = render(hello);
    rerender({count: 1})
    unmount()
    expect(queryByTestId('count')).toBe(null);
  })

  it('should update component', () => {
    const { queryByTestId } = render(hello, {count: 1});
    expect(queryByTestId('count').textContent).toBe("1");
    fireEvent.click(queryByTestId('button'))
    expect(queryByTestId('count').textContent).toBe("2");
  })
})
