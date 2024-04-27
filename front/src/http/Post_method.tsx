
export default async function Postmethod(url : string, body : {}){
    console.log(body)
     const response = await fetch(url, {method :"POSt" , headers:{"Content-Type" : "application/json"}, body: JSON.stringify(body)})
     if(!response.ok){
         throw new Error("Failed to fetch data")
     }
     const data = await response.json() ;
     return data 
}