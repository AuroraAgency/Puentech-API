module.exports = pagination = async (Model, queryDetails, endpoint) => {
  //define a initial page and a the limit of documents we will return
  const page = parseInt(queryDetails.page) || 1
  const limit = 5
  
  // define a range of ducuments to return, from startIndex to endIndex
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  //define main object that we will return to client
  const response = {info: {}}

  //delete page property to avoid errors on querying
  delete queryDetails.page

  // //get total documents we have as a result of querying by parameters define in frontend
  const results = await Model.find(queryDetails.dbQuery).countDocuments().exec()

  //while endIndex is less than flightsFound we will return a next page, if not, no
  if (endIndex < results) {
    response.info.next = `${endpoint}/${queryDetails.id}?labels=${queryDetails.params.join()}&page=${page + 1}`
  } 
  
  //while starIndex is bigger than 0 we will return a previus page, if not, no
  if (startIndex > 0) {
    response.info.prev = `${endpoint}/${queryDetails.id}?labels=${queryDetails.params.join()}&page=${page - 1}`
  }
  
  //format response
  response.info.results = results
  response.info.pages = Math.ceil(results / limit)
  response.info.limit = limit
  response.info.startIndex = startIndex

  return response;
}