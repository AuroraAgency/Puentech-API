module.exports = pagination = (rute, results, options) => {
  const { startIndex, page, limit } = options

  const endIndex = page * limit
  
  const response = {}

  if (endIndex < results) {
    response.next = `${rute}?page=${page + 1}`
  }
  
  if (startIndex > 0) {
    response.prev = `${rute}?page=${page - 1}`
  }

  //format response
  response.pages = Math.ceil(results / limit)
  response.count = results
  response.prev?  response.prev = response.prev :  response.prev = null
  response.next? response.next = response.next:response.next= null
  return response;
}