import {gql} from "apollo-boost"

// Raw form of query for GQL Playgroud (localhost:4000)
// query
// {
//   getPollResults(categories: ["Dogs","Cats"])
//   {
//     category
//     total
//   }
// }
const getPollResults = gql`
query getPollResults($categories: [String!]){
  getPollResults(categories: $categories){
    category
    total
  }
}
`

// Raw form of mutation for GQL Playgroud (localhost:4000)
// mutation
// {
//   submitPoll(category: "dogs", amount: 10)
// }
const submitPoll = gql`
mutation submitPoll($category: String!, $amount: Float!){
  submitPoll(category: $category, amount: $amount)
}
`

export {getPollResults, submitPoll};
