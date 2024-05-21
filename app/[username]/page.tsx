// 'use client'
// import { useEffect, useState } from "react";
// import { User } from "../api/db/schema/users";
// import UserDetailCard from "@/components/DashBoardPage/UserDetailCard";
import axios from "axios";
// import Container from "@/components/LinkContainer";
// import { LinkSchema } from '../api/db/schema/links';
// import LiveNormalLinkCard from "@/components/LiveNormalLinkCard";
// // import { Skeleton } from "@/components/ui/skeleton";
// import { Player } from "@lottiefiles/react-lottie-player";

// export default function Home({ params }: { params: { username: string } }) {
//     const [userExists, setUserExists] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [userDetails, setUserDetails] = useState<User>({
//         username: "",
//         heading: "",
//         background: "",
//         userProfileURL: "",
//     });

//     const [links, setLinks] = useState<LinkSchema[]>([]);

//     useEffect(() => {
//         async function fetchUser() {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(`/api/db/checkUserExist?username=${params.username}`);
//                 if (response.data.true) {
//                     setUserExists(true);
//                     setUserDetails(response.data.true);
//                     document.title = `${response.data.true.username}'s live links`;
//                     document.body.style.backgroundImage = `url(${response.data.true.background})`;
//                 } else if (response.data.false || response.data.error) {
//                     setUserExists(false);
//                     setMessage(response.data.false || response.data.error);
//                 }
//             } catch (error) {
//                 setUserExists(false);
//                 setMessage("An error occurred while fetching user");
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchUser();
//     }, []);

//     useEffect(() => {
//         const createOgImageMeta = () => {
//             const title = encodeURIComponent(`@${userDetails.username}`);
//             const description = encodeURIComponent(`https://my-links.live/${userDetails.username}`);
//             const imageUrl = encodeURIComponent(userDetails.userProfileURL);
            
//             //template settings
//             const templateId = 'e23b4a4f-83c2-4d9b-addb-051de54d819c';
//             const versionNumber = 1;
            
//             const templateURL = `https://ogcdn.net/${templateId}/v${versionNumber}/${title}/${description}/${imageUrl}/og.png`;

//             const ogImageMeta = document.createElement("meta");
//             ogImageMeta.setAttribute("property", "og:image");
//             ogImageMeta.setAttribute("content", templateURL);
//             document.head.appendChild(ogImageMeta);
//         };
//         createOgImageMeta();
//     }, [userDetails]);    

//     useEffect(() => {
//         async function fetchLinks() {
//             setLoading(true);
//             if (userExists) {
//                 try {
//                     const response = await axios.get(`/api/db/getLinks?username=${params.username}`);
//                     if (response.data.success) {
//                         setLinks(response.data.success);
//                     } else if (response.data.failure || response.data.error) {
//                         setMessage(response.data.failure || response.data.error);
//                     }
//                 } catch (error) {
//                     setMessage("An error occurred while fetching links");
//                     console.error(error);
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         }
//         fetchLinks();
//     }, [userExists]);

//     if (userExists) {
//         return (
//             <div className="flex justify-center align-middle min-h-screen p-4 w-[98vw]">
//                 <Container>
//                     <UserDetailCard userDetails={userDetails}/>
//                     {links.length > 0 && links.map((link) => (
//                         <LiveNormalLinkCard key={link.url} link={link} />
//                     ))}
//                 </Container>
//             </div>
//         );
//     } else if (loading || message !== "" || !userExists) {
//         return (
//             <div className="flex justify-center align-middle min-h-screen">
//                 {message !== "" ? (
//                     <h1>{message}</h1>
//                 ) : (
//                     <div className="flex flex-col items-center justify-center">
//                         <div className="flex flex-col space-y-3">
//                         <Player
//                             autoplay
//                             loop
//                             src="https://lottie.host/d0b55f9b-ef82-435e-bae7-e1f66ce2b05e/jjuvcSm502.json"
//                             style={{ height: '70vw', width: '70vw' }}
//                         />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         );
//     }
//     else return null;
// }

// app/[username]/page.tsx
import { User } from '../api/db/schema/users';
import UserDetailCard from '@/components/DashBoardPage/UserDetailCard';
import Container from '@/components/LinkContainer';
import { LinkSchema } from '../api/db/schema/links';
import LiveNormalLinkCard from '@/components/LiveNormalLinkCard';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

interface PageProps {
  params: { username: string };
}

interface ImageColorResponse {
    color: string;
    saturatedColor: string;
}
  

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const userDetails = await fetchUserDetails(params.username);
  return {
    title: `${userDetails?.username || 'User'}'s live links`,
  };
}

async function fetchUserDetails(username: string): Promise<User | null> {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/api/db/checkUserExist?username=${username}`);
        if(response?.data?.true){
            return response.data.true as  User ;
        }
        return null;
    } catch (error : any) {
        console.trace(error);
        return null;
    }

}

async function fetchUserLinks(username: string): Promise<LinkSchema[]> {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/db/getLinks?username=${username}`);
    if(response?.data?.success){
        return response.data.success as LinkSchema[] ;
    }
    return [];
  } catch (error : any) {
    console.trace(error);
    return [];
  }
}

async function getColors(links: LinkSchema[]): Promise<ImageColorResponse[]> {
    const colors: ImageColorResponse[] = [];
  
    if (links.length <= 0) return colors;
  
    for (let link of links) {
      try {
        let response;
        if (link.thumbnailUrl !== "") {
          const thumbnailUrl = encodeURIComponent(link.thumbnailUrl);
          response = await axios.get(`${process.env.BASE_URL}/api/get-image-color?url=${thumbnailUrl}`);
        }
        if (response?.data?.color && response?.data?.saturatedColor) {
          const imageColor: ImageColorResponse = response.data;
          colors.push(imageColor);
        }
        else {
            const defaultColor : ImageColorResponse = {color : "primary" , saturatedColor : "primary"} ;
            colors.push(defaultColor);
        }
      } catch (error) {
        console.trace('Error fetching image color:', error);
      }
    }
    return colors;
  }

export default async function Page({ params }: PageProps) {
  const userDetails = await fetchUserDetails(params.username);
//   console.log(userDetails);
  if (!userDetails) {
    notFound();
  }
  const links = await fetchUserLinks(params.username);
  const color = await getColors(links);
  return (
    <main className="flex justify-center align-middle items-center min-h-screen p-4 max-w-7xl mx-auto">
      <Container className="bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70">
        <UserDetailCard userDetails={userDetails} />
        <div>
            {links.length > 0 &&
            links.map((link,index) => (
                <LiveNormalLinkCard key={link.url} link={link} bgColor1={color[index]?.color} bgColor2={color[index]?.saturatedColor}/>
            ))}
        </div>
      </Container>
    </main>
  );
}
