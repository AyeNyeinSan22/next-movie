import Link from "next/link"
import Movies from "@/components/Movies";
const token = process.env.TOKEN;

async function fetchSearch(id){
    
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await res.json();
}

export default async function Search({searchParams}) {
    
    const search=await fetchSearch(searchParams.q);
   
    
    return (
       <>
          <h3 className="text-lg mb-3">Search: {searchParams.q}</h3>
          <Movies movies={search.results}/>
       
       </>
    );  
}