import axios from "axios";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL

const api=axios.create({
    baseURL:API_BASE_URL,
    withCredentials:true
})

api.interceptors.response.use(
    (response)=>response,

    async(error)=>{

        // console.log("Interceptor");
        // console.log("Request:", error.config.url);
        // console.log("Status:", error.response?.status); 
        const originalreq=error.config

        if(error.response?.status===401 && !originalreq._retry && !originalreq.url.includes("/user/refresh-token")){
            // console.log("Refreshing token...");
            originalreq._retry=true 

            try {
                
                await axios.post(
                    `${API_BASE_URL}/user/refresh-token`,
                    {},
                    {
                        withCredentials:true
                    }
                )
                    // console.log("Refresh successful");
                 return api(originalreq)
            } catch (error) {
                //    console.log("Refresh failed");
                 return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)
export default api