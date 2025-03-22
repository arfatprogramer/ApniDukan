import { singleCategoryApi } from "../common/apiData"

const fetchSingleCategory = async (category) => {
    const response = await fetch(singleCategoryApi.url, {
      method: singleCategoryApi.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ category })
    })
    return  response.json()
    
  }

  export default fetchSingleCategory