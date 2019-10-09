import render, { cleanup, fireEvent } from '../src/index'
import hello from './test.tag'

afterEach(() => {
  cleanup()
})

describe("riot-testing-library", () => {
  it('should render tag component and return dom query', () => {
    const { queryByTestId } = render(hello);
    expect(queryByTestId('count').textContent).toBe("0");
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
