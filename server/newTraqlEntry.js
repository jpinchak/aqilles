function newTraqlEntry(traql, args, pubsub) {
  // create a new entry in the traql that has a mutationId as its argument and an object as its key.
  // the object will have the resolver data, a timestamp, and the expected number of aqls.
  traql[args.aql.mutationId] = {
    resolver: args.aql.resolver,
    openedTime: Date.now(),
    // the expected number of aqls is calculated by taking the total number of aqls in the system
    // and dividing it by the number of subscription resolvers, aka subscriptions to a certain channel.
    // the result is the expected number of aqls, aka the current number of subscribers to that channel.
    // if the current number of subscribers is 7, we expected 7 aqls back. We expect this to be evenly divisible;
    // otherwise, we are in an error state.
    expectedNumberOfAqls: Object.keys(pubsub.subscriptions).length / traql.subResolvers,
    // the aqls received back array will be updated by the update traql function.
    aqlsReceivedBack: [],
    // the usertoken key holds the user id, which tells us whose app this data is for.
    userToken: args.aql.userToken,
  };
}

module.exports = newTraqlEntry;