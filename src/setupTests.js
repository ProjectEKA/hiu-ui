import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};


global.BASE_NAME = '/';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(window, 'location', {
  value: {
    reload: jest.fn(),
  },
});

configure({ adapter: new Adapter() });
