/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xpUl0yxlYME
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "../../../component/v0/label"
import { Input } from "../../../component/v0/input"
import { Textarea } from "../../../component/v0/textarea"
import { Button } from "../../../component/v0/button"
import { Link } from "react-router-dom"
import React, { FormEvent, useEffect, useRef, useState } from "react"
import Getmethod from "../../../http/Get_method"
import Postmethod from "../../../http/Post_method"


interface comment{
    comment : string
    createAt : string
}

export default function Comment() {
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [comment, setcomment] = useState<comment[]>([])
    useEffect(() => {
        const fetchData = async() =>{
            const response = await Getmethod("http://localhost:4000/comment");
            console.log(response)
            setcomment(response)


        }
        fetchData();


    },[])
    const commentSubmit = async(event : FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if (contentRef.current) {
            try {
              await Postmethod("http://localhost:4000/comment", { comment: contentRef.current.value });
              contentRef.current.value = "";
   
            } catch (error) {
              console.error("Error submitting comment:", error);
            }
          } else {
            console.error("textarea element is not available");
          }
        }
    
  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <div className="mb-3">
        <h1 className="text-3xl font-bold mb-2">의견 게시판(정식으로 출시시 사라질 게시판)</h1>
        <p className="text-muted-foreground">Create and view posts.</p>
      </div>
      <div className="bg-background rounded-md shadow-sm p-6 mb-8">
        <form className="space-y-4" onSubmit={commentSubmit}>
        
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" placeholder="Write your post" className="min-h-[150px]" ref={contentRef}/>
          </div>
          <div className="flex justify-end" >
            <Button type="submit" style={{ color: "white", backgroundColor: "black" }}>Submit</Button>
          </div>
        </form>
      </div>
     
      <div className="bg-background rounded-md shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Posts</h2>
        </div>
        {comment && comment.map((comment) => (
                <div className="divide-y">
                <div className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{comment.comment}</div>
                    <div className="text-sm text-muted-foreground">{comment.createAt}</div>
                  </div>
                 
                </div>
               
              </div>

        ))}
    
      </div>
    </div>
  )
}