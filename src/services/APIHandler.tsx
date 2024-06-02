type CacheType = {
    [url: string]: any;
  };
  
  type ParamsType = {
    skip?: number;
    limit?: number;
  };
  
  class FetchData {
    baseURL: string;
    // cache: CacheType;
    total_number_of_fetched_data: number;
    skip: number;
    offset: number;
    current_page_number: number;
  
    constructor() {
      this.baseURL = "https://dummyjson.com/products";
      // this.cache = {};
      this.total_number_of_fetched_data = -1;
      this.skip = 0;
      this.offset = 10;
      this.current_page_number = 1;
    }
  
    async getData(pageNumber: number = 1): Promise<any> {
      const params: ParamsType = {};
  
      params.skip = pageNumber
      params.limit = 5;
  
      const queryString = new URLSearchParams(params as Record<string, string>).toString();
  
      const url = `${this.baseURL}?${queryString}`;
      // console.log(url);
      // if (this.cache[url]) {
      //   console.log("Returning cached data");
      //   return Promise.resolve(this.cache[url]);
      // }
  
      console.log("Fetching new data from API");
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
  
        // this.cache[url] = data;
  
        this.total_number_of_fetched_data = data.total;
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }
  
    async getQueryData(query: string = ""): Promise<any> {
      try {
        const url = `${this.baseURL}/search?q=${query}`;
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
  
        this.total_number_of_fetched_data = data.total;
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }
  
    async getDataFromId(id: number = 0): Promise<any> {
      try {
        const url = `${this.baseURL}/${id}`;
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }
  
    // clearCache(): void {
    //   this.cache = {};
    // }
  
    clearCacheForEndpoint(endpoint: string, params: ParamsType = {}): void {
      const queryString = new URLSearchParams(params as Record<string, string>).toString();
      const url = `${this.baseURL}${endpoint}?${queryString}`;
      // delete this.cache[url];
    }
  }
  
  const apiInstance = new FetchData();
  
  export default apiInstance;
  