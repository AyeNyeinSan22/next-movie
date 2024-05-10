import { NextResponse } from "next/server";
export async function GET(request, {params}){
   const res= await fetch(`https://api.themoviedb.org/3/person/${params.id}`,{
     headers: {
        Authorization: `Bearer ${token}`,
     },
   });

   const data= await res.json();

   return NextResponse.json(data);
}