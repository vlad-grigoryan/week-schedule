import Q from "q";
import config from '../../../config/authConfig';

const getAuth2 = () => {
    let deffered = Q.defer();
    gapi.load('auth2',
        () => {
            deffered.resolve(gapi.auth2)
        },
        (err) => {
            deffered.reject(err)
        });

    return deffered.promise;

};

export const getAccessToken = () => {
    let deffered = Q.defer();

    const request = getAuth2();

        request
            .then((auth2) => {
                return auth2.init({ client_id: config.gapiClientId, scope: 'profile'})
                    .then((GoogleAuth) => {
                        deffered.resolve(GoogleAuth.currentUser.get().getAuthResponse().access_token);
                    })
            })
            .catch((err) => {
                deffered.reject(err);
            });

    return deffered.promise;
};