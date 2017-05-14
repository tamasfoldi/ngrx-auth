import * as auth from '../actions/auth.actions';
import * as authReducer from '../reducers/auth.reducer';
import * as authTestData from '../test-helpers/auth.test-data';

describe('Auth Reducer', () => {
  let expectedState: authReducer.State;
  let resultState: authReducer.State;
  const afterInitActionState: authReducer.State = Object.assign({}, authReducer.initialState, { isInProgress: true });

  afterEach(() => {
    expectedState = null;
    resultState = null;
  });

  describe('LOGIN', () => {
    it('should set isInProgress to true', () => {
      expectedState = Object.assign({}, authReducer.initialState, { isInProgress: true });

      resultState = authReducer.reducer(authReducer.initialState, new auth.LoginAction(authTestData.loginData));

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('LOGIN_FAIL', () => {
    it('should set isInProgress to false', () => {
      expectedState = Object.assign({}, authReducer.initialState, { isInProgress: false });

      resultState = authReducer.reducer(afterInitActionState, new auth.LoginFailAction(authTestData.apiError));

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should set isInProgress to false and set the authData', () => {
      expectedState = Object.assign({}, authReducer.initialState, { isInProgress: false, authData: authTestData.authData });

      resultState = authReducer.reducer(afterInitActionState, new auth.LoginSuccessAction(authTestData.authData));

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('REGISTER', () => {
    it('should set isInProgress to true', () => {
      expectedState = Object.assign({}, authReducer.initialState, { isInProgress: true });

      resultState = authReducer.reducer(authReducer.initialState, new auth.RegisterAction(authTestData.registerData));

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('REGISTER_FAIL', () => {
    it('should set isInProgress to false', () => {
      expectedState = Object.assign({}, authReducer.initialState, { isInProgress: false });

      resultState = authReducer.reducer(afterInitActionState, new auth.RegisterFailAction(authTestData.apiError));

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('REGISTER_SUCCESS', () => {
    it('should set isInProgress to false', () => {
      expectedState = Object.assign({}, authReducer.initialState, { isInProgress: false });

      resultState = authReducer.reducer(afterInitActionState, new auth.RegisterSuccessAction(authTestData.registerResponse));

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('LOGOUT', () => {
    it('should set isInProgress to true', () => {
      expectedState = Object.assign({}, authReducer.initialState, { isInProgress: true });

      resultState = authReducer.reducer(authReducer.initialState, new auth.LogoutAction());

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('LOGOUT_FAIL', () => {
    it('should set isInProgress to false', () => {
      expectedState = Object.assign({}, authReducer.initialState, { isInProgress: false });

      resultState = authReducer.reducer(afterInitActionState, new auth.LogoutFailAction(authTestData.apiError));

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('LOGOUT_SUCCESS', () => {
    it('should set the initial state', () => {
      resultState = authReducer.reducer(afterInitActionState, new auth.LogoutSuccessAction());

      expect(resultState).toEqual(authReducer.initialState);
    });
  });

  describe('GET_USER_INFO', () => {
    it('should set isInProgress to true', () => {
      expectedState = Object.assign({}, authReducer.initialState, { isInProgress: true });

      resultState = authReducer.reducer(authReducer.initialState, new auth.GetUserInfoAction(authTestData.authData));

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('GET_USER_INFO_FAIL', () => {
    it('should set isInProgress to false', () => {
      expectedState = Object.assign({}, authReducer.initialState, { isInProgress: false });

      resultState = authReducer.reducer(afterInitActionState, new auth.GetUserInfoFailAction(authTestData.apiError));

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('GET_USER_INFO_SUCCESS', () => {
    it('should set isInProgress to false and set the userInfo', () => {
      expectedState = Object.assign({}, authReducer.initialState, { isInProgress: false, userInfo: authTestData.userInfo });

      resultState = authReducer.reducer(afterInitActionState, new auth.GetUserInfoSuccessAction(authTestData.userInfo));

      expect(resultState).toEqual(expectedState);
    });
  });
});
