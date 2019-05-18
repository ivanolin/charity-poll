const mongoService = require('./mongoService');

//GQL Resolvers
module.exports = {
    Query:
    {
        getPollResults: async (_, args) => {

            // Aggregate poll results
            var results = await mongoService.getPollResults(args.categories);

            // Pull out relevant data
            var justTotals = [];
            for(var i = 0; i < results.length; i++)
            {
                justTotals.push({category: results[i]._id, total: results[i].total});
            }

            // Return totals
            return justTotals;
        },
    },
    Mutation:
    {
        submitPoll: async (_, args) => {

            //Add poll data to DB
            let result = await mongoService.addPollData(args.category, args.amount);

            //Return log statement
            return `Success!`;
        },
    }
}
