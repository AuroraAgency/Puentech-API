module.exports = pagination = (rute, results, options) => {
  const { page, limit, params } = options
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  
  const response = {}

  if (endIndex < results) {
    response.next = params? `${rute}?page=${page + 1}&limit=${limit}&tags=${params}`
    :`${rute}?page=${page + 1}&limit=${limit}`
  }
  
  if (startIndex > 0) {
    response.prev = params? `${rute}?page=${page - 1}&limit=${limit}&tags=${params}`
    :`${rute}?page=${page - 1}&limit=${limit}`
  }

  //format response
  response.pages = Math.ceil(results / limit)
  response.count = results
  response.prev?  response.prev = response.prev :  response.prev = null
  response.next? response.next = response.next:response.next= null
  return response;
}