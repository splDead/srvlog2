import constants from '../constants/constants';

export const readMessage = id =>
    ({
        type : constants.READ_MESSAGE,
        id
    })