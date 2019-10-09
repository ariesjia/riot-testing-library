import render, { act, cleanup, fireEvent } from '../src/index'
import hello from './test.tag'

beforeEach(() => {
  cleanup()
})

describe("riot-testing-library", () => {
  it('should render tag component and return dom query', () => {
    const { queryByTestId } = render(hello, {count: 1});
    expect(queryByTestId('count').textContent).toBe("1");
  })

  it('should unmount tag component', () => {
    const { queryByTestId, unmount } = render(hello);
    unmount();
    expect(queryByTestId('count')).toBe(null);
  })

  it('should update component', () => {
    const { queryByTestId } = render(hello, {count: 1});
    expect(queryByTestId('count').textContent).toBe("1");
    act(() => {
      fireEvent.click(queryByTestId('button'))
    })
    expect(queryByTestId('count').textContent).toBe("2");
  })
})
