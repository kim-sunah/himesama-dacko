
export default async function Getmethod(url : string){
    
    try {
        const response = await fetch(url, { credentials: "include" });
        
        if (!response.ok) {
          // 여기서 상태 코드를 추출합니다
          const statusCode = response.status;
          
          // 상태 코드에 따른 처리
          if (statusCode === 401) {
            throw new Error("Unauthorized: 인증에 실패했습니다.");
          } else {
            throw new Error(`HTTP error! status: ${statusCode}`);
          }
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        // 에러 처리
        if (error instanceof Error) {
          console.error("Fetch error:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
        throw error;  // 에러를 다시 던져서 호출한 곳에서 처리할 수 있게 합니다.
      }
}