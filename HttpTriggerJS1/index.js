const appInsights = require('applicationinsights');
const { AzureApplicationInsightsLogger } = require('winston-azure-application-insights');
const { winston } = require('winston');

// Create an app insights client with the given key
appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
    .setAutoCollectConsole(false);

const logger = winston.createLogger({
    transports: [
        new AzureApplicationInsightsLogger({
            insights: appInsights
        }),
    ]
});

module.exports = (context, req) => {
    logger.debug('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};
