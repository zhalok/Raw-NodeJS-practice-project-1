
const environments = {};

// staging environment
environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'hsjdhsdhsjdhjshdjshd',
    twilio: {
        sid: "ACd5d59be78c41fc8c56ae86641a979640",
        token: "9ce5c1744b1835358e929fc446fc476d",
    }
};

// production environment
environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'djkdjskdjksdjksjdskjd',
    twilio: {
        sid: "ACd5d59be78c41fc8c56ae86641a979640",
        token: "9ce5c1744b1835358e929fc446fc476d",
    }
};

// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

// export module
module.exports = environmentToExport;