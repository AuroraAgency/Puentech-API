module.exports = pagination = (rute, results, options) => {
  const { page, limit } = options
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  
  const response = {}

  if (endIndex < results) {
    response.next = `${rute}?page=${page + 1}&limit=${limit}`
  }
  
  if (startIndex > 0) {
    response.prev = `${rute}?page=${page - 1}&limit=${limit}`
  }

  //format response
  response.pages = Math.ceil(results / limit)
  response.count = results
  response.prev?  response.prev = response.prev :  response.prev = null
  response.next? response.next = response.next:response.next= null
  return response;
}