'use strict';

module.exports = ({

    // isProductionMode,
    environmentVariables: {

        IS_EXCHANGE,
        EXCHANGE_FLAMINGO_ENCRYPTION_ID,
        EXCHANGE_FLAMINGO_ENCRYPTION_PASSWORD,
        EXCHANGE_XOOVO_ENCRYPTION_ID,
        EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
        EXCHANGE_BITCOIN_API_TESTNET_TOKEN,
        EXCHANGE_BITCOIN_API_LIVENET_TOKEN,
        WALHALLA_ADDRESS_MODE_SECRET,
        EXCHANGE_TOKEN_USER_ID,
        EXCHANGE_SIGN_UP_GOOGLE_CAPTCHA_SECRET,
        EXCHANGE_URL,
    },

}) => { 
    
    const rawFunctionData = [

        {
            nickname: 'ePOST/exchangeUsers',
            name: 'exchange_api_exchangeUsers_post',
            handler: 'routes/exchange/users/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/users/POST',
                './sacredElementals/crypto/flamingoCrescent',
            ],
            environmentVariables: {
                EXCHANGE_FLAMINGO_ENCRYPTION_ID,
                EXCHANGE_FLAMINGO_ENCRYPTION_PASSWORD,
                EXCHANGE_SIGN_UP_GOOGLE_CAPTCHA_SECRET,
                EXCHANGE_URL,
            }
        },

        {
            nickname: 'eGET/users/exchangeUserId',
            name: 'exchange_api_users_exchangeUserId_get',
            handler: 'routes/exchange/users/exchangeUserId/GET/index.handler',
            pathsToInclude: [
                './routes/exchange/users/exchangeUserId/GET',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
            }
        },

        {
            nickname: 'eDELETE/users/exchangeUserId',
            name: 'exchange_api_users_exchangeUserId_delete',
            handler: 'routes/exchange/users/exchangeUserId/DELETE/index.handler',
            pathsToInclude: [
                './routes/exchange/users/exchangeUserId/DELETE',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
            }
        },

        {
            nickname: 'ePOST/verify_user',
            name: 'exchange_api_verifyUser_post',
            handler: 'routes/exchange/verify_user/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/verify_user/POST',
                './sacredElementals/crypto/flamingoCrescentDecrypt',
                './sacredElementals/crypto/doLogin',
                './sacredElementals/crypto/exchangeBitcoinApi',
                './sacredElementals/crypto/xoOvo'
            ],
            environmentVariables: {
                EXCHANGE_FLAMINGO_ENCRYPTION_ID,
                EXCHANGE_FLAMINGO_ENCRYPTION_PASSWORD,
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
                EXCHANGE_BITCOIN_API_TESTNET_TOKEN,
                EXCHANGE_BITCOIN_API_LIVENET_TOKEN,
                WALHALLA_ADDRESS_MODE_SECRET,
            }
        },

        {
            nickname: 'ePOST/login',
            name: 'exchange_api_login_post',
            handler: 'routes/exchange/login/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/login/POST',
                './sacredElementals/crypto/flamingoCrescentDecrypt',
                './sacredElementals/crypto/xoOvo',
                './sacredElementals/crypto/exchangeBitcoinApi',
                './sacredElementals/crypto/doLogin'
            ],
            environmentVariables: {
                EXCHANGE_FLAMINGO_ENCRYPTION_ID,
                EXCHANGE_FLAMINGO_ENCRYPTION_PASSWORD,
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
                EXCHANGE_BITCOIN_API_TESTNET_TOKEN,
                EXCHANGE_BITCOIN_API_LIVENET_TOKEN,
                WALHALLA_ADDRESS_MODE_SECRET,
            }
        },

        {
            nickname: 'ePOST/withdraws',
            name: 'exchange_api_withdraws_post',
            handler: 'routes/exchange/withdraws/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/withdraws/POST',
                './sacredElementals/crypto/xoOvoDecrypt',
                './routes/withdraws/POST/withdrawMoney/getFeeData.js',
                './routes/withdraws/POST/withdrawMoney/doWithdrawMoney/getMagnaFeeData.js',
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
                EXCHANGE_TOKEN_USER_ID,
            },
            memory: 320,
        },

        {
            nickname: 'ePOST/logout',
            name: 'exchange_api_logout_post',
            handler: 'routes/exchange/logout/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/logout/POST',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD
            },
        },

        {
            nickname: 'ePOST/exchanges',
            name: 'exchange_api_exchanges_post',
            handler: 'routes/exchange/exchanges/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/exchanges/POST',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD
            },
        },

        {
            nickname: 'ePOST/dreams',
            name: 'exchange_api_dreams_post',
            handler: 'routes/exchange/dreams/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/dreams/POST',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD
            },
        },
    ];

    for( const rawFunctionDatum of rawFunctionData ) {

        rawFunctionDatum.environmentVariables.IS_EXCHANGE = IS_EXCHANGE;
        rawFunctionDatum.pathsToInclude.push( './exchangeUtils' );
    }

    return rawFunctionData;
};
