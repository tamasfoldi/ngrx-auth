import * as auth from '../actions/auth.actions';
import * as authReducer from '../reducers/auth.reducer';
import * as authTestData from '../test-helpers/auth.test-data';
import * as jwt from 'angular2-jwt';

describe('Auth Reducer', () => {
  let expectedResult;
  let result;
  const afterInitActionState: authReducer.State = Object.assign({}, authReducer.initialState, { isInProgress: true });

  afterEach(() => {
    expectedResult = null;
    result = null;
  });

  it('should return with the state on undefined action', () => {
    result = authReducer.reducer(afterInitActionState, { type: undefined });

    expect(result).toEqual(afterInitActionState);
  });

  describe('LOGIN', () => {
    it('should set isInProgress to true', () => {
      expectedResult = Object.assign({}, authReducer.initialState, { isInProgress: true });

      result = authReducer.reducer(authReducer.initialState, new auth.LoginAction(authTestData.loginData));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOGIN_FAIL', () => {
    it('should set isInProgress to false', () => {
      expectedResult = Object.assign({}, authReducer.initialState, { isInProgress: false });

      result = authReducer.reducer(afterInitActionState, new auth.LoginFailAction(authTestData.apiError));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should set isInProgress to false and set the authData', () => {
      expectedResult = Object.assign({}, authReducer.initialState, { isInProgress: false, authData: authTestData.authData });

      result = authReducer.reducer(afterInitActionState, new auth.LoginSuccessAction(authTestData.authData));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('REGISTER', () => {
    it('should set isInProgress to true', () => {
      expectedResult = Object.assign({}, authReducer.initialState, { isInProgress: true });

      result = authReducer.reducer(authReducer.initialState, new auth.RegisterAction(authTestData.registerData));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('REGISTER_FAIL', () => {
    it('should set isInProgress to false', () => {
      expectedResult = Object.assign({}, authReducer.initialState, { isInProgress: false });

      result = authReducer.reducer(afterInitActionState, new auth.RegisterFailAction(authTestData.apiError));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('REGISTER_SUCCESS', () => {
    it('should set isInProgress to false', () => {
      expectedResult = Object.assign({}, authReducer.initialState, { isInProgress: false });

      result = authReducer.reducer(afterInitActionState, new auth.RegisterSuccessAction(authTestData.registerResponse));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOGOUT', () => {
    it('should set isInProgress to true', () => {
      expectedResult = Object.assign({}, authReducer.initialState, { isInProgress: true });

      result = authReducer.reducer(authReducer.initialState, new auth.LogoutAction());

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOGOUT_FAIL', () => {
    it('should set isInProgress to false', () => {
      expectedResult = Object.assign({}, authReducer.initialState, { isInProgress: false });

      result = authReducer.reducer(afterInitActionState, new auth.LogoutFailAction(authTestData.apiError));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOGOUT_SUCCESS', () => {
    it('should set the initial state', () => {
      result = authReducer.reducer(afterInitActionState, new auth.LogoutSuccessAction());

      expect(result).toEqual(authReducer.initialState);
    });
  });

  describe('GET_USER_INFO', () => {
    it('should set isInProgress to true', () => {
      expectedResult = Object.assign({}, authReducer.initialState, { isInProgress: true });

      result = authReducer.reducer(authReducer.initialState, new auth.GetUserInfoAction(authTestData.authData));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('GET_USER_INFO_FAIL', () => {
    it('should set isInProgress to false', () => {
      expectedResult = Object.assign({}, authReducer.initialState, { isInProgress: false });

      result = authReducer.reducer(afterInitActionState, new auth.GetUserInfoFailAction(authTestData.apiError));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('GET_USER_INFO_SUCCESS', () => {
    it('should set isInProgress to false and set the userInfo', () => {
      expectedResult = Object.assign({}, authReducer.initialState, { isInProgress: false, userInfo: authTestData.userInfo });

      result = authReducer.reducer(afterInitActionState, new auth.GetUserInfoSuccessAction(authTestData.userInfo));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('isInProgress', () => {
    it('should return with isInProgress', () => {
      result = authReducer.isInProgress(authReducer.initialState);

      expect(result).toBeFalsy();

      result = authReducer.isInProgress(afterInitActionState);

      expect(result).toBeTruthy();
    });
  });

  describe('getUserInfo', () => {
    it('should return with userInfo', () => {
      const state = Object.assign({}, authReducer.initialState, { userInfo: authTestData.userInfo });

      result = authReducer.getUserInfo(state);

      expect(result).toEqual(authTestData.userInfo);
    });
  });

  describe('hasNotExpiredAuth', () => {
    it('should return with true if tokenNotExpired and has authData', () => {
      spyOn(jwt, 'tokenNotExpired').and.returnValue(true);
      const state = Object.assign({}, authReducer.initialState, { authData: authTestData.authData });

      result = authReducer.hasNotExpiredAuth(state);

      expect(result).toBeTruthy();
    });
  });

  describe('isLoggedIn', () => {
    it('should return with true if tokenNotExpired and has authData and userInfo', () => {
      spyOn(jwt, 'tokenNotExpired').and.returnValue(true);
      const state = Object.assign({}, authReducer.initialState, { authData: authTestData.authData, userInfo: authTestData.userInfo });

      result = authReducer.isLoggedIn(state);

      expect(result).toBeTruthy();
    });
  });
});
