import { Cast } from "lucide-react";
import Link from "next/link"
import { Badge } from "@/components/ui/badge";

const token = process.env.TOKEN;
async function fetchMovie(id){
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await res.json();
}

async function fetchCredits(id){
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await res.json();
}
export default async function Movie({params}){

  const movie=await fetchMovie(params.id);
  const credit=await fetchCredits(params.id);
  const casts=credit.cast;
  const  cover="http://image.tmdb.org/t/p/w1280";
  const profile="http://image.tmdb.org/t/p/w185";
  return <div> 
    
    <h2>
				{movie.title}
				<span className="ml-1">
					({movie.release_date.split("-")[0]})
				</span>
			</h2>

			<div className="mb-4 mt-2">
				{movie.genres.map(genre => {
					return (
						<Badge
							variant="outeline"
							className="mr-2">
							{genre.name}
						</Badge>
					);
				})}
			</div>

			<img
				src={`${cover}${movie.backdrop_path}`}
				className="w-fit"
			/>
			<p className="mt-3">{movie.overview}</p>

        <div className="mt-4 border-t pt-3">
           <h5>Starring</h5>
           <div className="flex gap-3 flex-row flex-wrap">
              {
                casts.map(cast => {
                  return <div className="w-[180px] bg-gray-600">
                    <img src={`${profile}${cast.profile_path}`} alt="" />
                    <div className="text-sm" >
                      <Link href={`/person/${cast.id}`}>
                         {cast.name}
                      </Link>
                      </div>
                    <span className="text-sm text-gray-600">{cast.character}</span>
                  </div>
                })
              }
           </div>
        </div>
  </div>
}