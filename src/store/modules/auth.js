import authApi from '@/api/auth';
import { setItem } from "@/helpers/persistanceStorage";

const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
};

export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',

    updateCurrentUserStart: '[auth] updateCurrentUserStart',
    updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
    updateCurrentUserFailure: '[auth] updateCurrentUserFailure',

    logout: '[auth] logout'
};

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    updateCurrentUser: '[auth] updateCurrentUser',
    logout: '[auth] logout'
};

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
}

const getters = {
    [getterTypes.currentUser]: state => {
        return state.currentUser
    },
    [getterTypes.isLoggedIn]: state => {
        return !!state.isLoggedIn
    },
    [getterTypes.isAnonymous]: state => {
        return state.isLoggedIn === false
    }
};

const mutations = {
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.registerSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationTypes.registerFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },

    [mutationTypes.loginStart](state) {
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.loginSuccess](state, payload) {
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    [mutationTypes.loginFailure](state, payload) {
        state.isSubmitting = false;
        state.validationErrors = payload;
    },

    [mutationTypes.getCurrentUserStart](state) {
        state.isLoading = true;
    },
    [mutationTypes.getCurrentUserSuccess](state, payload) {
        state.isLoading = false;
        state.currentUser = payload;
        state.isLoggedIn = true
    },
    [mutationTypes.getCurrentUserFailure](state) {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.currentUser = null;
    },

    [mutationTypes.updateCurrentUserStart]() {},
    [mutationTypes.updateCurrentUserSuccess](state, payload) {
        state.currentUser = payload
    },
    [mutationTypes.updateCurrentUserFailure]() {},

    [mutationTypes.logout](state) {
        state.currentUser = null;
        state.isLoggedIn = false;
    }
};

const actions = {
    [actionTypes.register]({commit}, credentials) {
        return new Promise(resolve => {
            commit(mutationTypes.registerStart);
            authApi.register(credentials)
                .then(response => {
                    commit(mutationTypes.registerSuccess, response.data.user);
                    setItem('accessToken', response.data.user.token);
                    resolve(response.data.user);
                })
                .catch(err => {
                    commit(mutationTypes.registerFailure, err.response.data.errors);
                    console.log('Error request', err);
                });
        });
    },

    [actionTypes.login]({commit}, credentials) {
        return new Promise(resolve => {
            commit(mutationTypes.loginStart);
            authApi.login(credentials)
                .then(response => {
                    commit(mutationTypes.loginSuccess, response.data.user);
                    setItem('accessToken', response.data.user.token);
                    resolve(response.data.user);
                })
                .catch(err => {
                    commit(mutationTypes.loginFailure, err.response.data.errors);
                    console.log('Error request', err);
                });
        });
    },

    [actionTypes.getCurrentUser]({commit}) {
        return new Promise(resolve => {
            commit(mutationTypes.getCurrentUserStart);
            authApi.getCurrentUser()
                .then(response => {
                    commit(mutationTypes.getCurrentUserSuccess, response.data.user);
                    resolve(response.data.user);
                })
                .catch(() => {
                    commit(mutationTypes.getCurrentUserFailure);
                });
        });
    },

    [actionTypes.updateCurrentUser]({commit}, {currentUserInput}) {
        return new Promise(resolve => {
            commit(mutationTypes.updateCurrentUserStart);
            authApi.updateCurrentUser(currentUserInput)
                .then(user => {
                    commit(mutationTypes.updateCurrentUserSuccess, user);
                    resolve(user);
                })
                .catch(result => {
                    commit(mutationTypes.updateCurrentUserFailure, result.response.data.errors);
                });
        });
    },

    [actionTypes.logout]({commit}) {
        return new Promise(resolve => {
            setItem('accessToken', '');
            commit(mutationTypes.logout);
            resolve();
        });
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
