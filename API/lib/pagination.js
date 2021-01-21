module.exports = pagination = (limit, page, results, endpoint, id, params) => {
  const myPage = parseInt(page) || 1

  const startIndex = (myPage - 1) * limit
  const endIndex = myPage * limit
  
  const response = {}

  if (endIndex < results) {
    response.next = `${endpoint}/${id}?labels=${params}&page=${myPage + 1}`
  }
  
  if (startIndex > 0) {
    response.prev = `${endpoint}/${id}?labels=${params}&page=${myPage - 1}`
  }

  return response;
}