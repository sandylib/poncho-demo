import React from 'react';
import {
  render,
  cleanup
} from '@testing-library/react';
import Create from './Create';


describe('UNIT/VIEWS - <Create />', () => {
  const originalError = console.error
  beforeAll(() => {
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return
      }
      originalError.call(console, ...args)
    }
  })

  afterAll(() => {
    console.error = originalError
  })


  const spy = jest.fn();

  afterEach(cleanup)

  it('should render render correctly', () => {
    render(<Create />);
  });
});
