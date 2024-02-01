export type MockedModule<T = any> = {
  [K in keyof T]?: jest.Mock
}
