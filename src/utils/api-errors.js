// because Fetch doesn't recognize error responses as
// actual errors since it's technically completing the response...
export function handleApiErrors(response) {
    // console.log('response =====',response)
    if (!response.ok) { throw "error"; }
  
    return response
  }