
export default async function Getmethod(url : string){
    console.log(url)
    console.log("Asdasdsada")
    const response = await fetch(url)
    if(!response.ok){
        throw new Error("Failed to fetch data")
    }
    const data = await response.json() ;
    return data 
}