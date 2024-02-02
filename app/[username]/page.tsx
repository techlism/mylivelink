'use client'
import { useEffect, useState } from "react";
import { User } from "../api/db/schema/users";
import UserDetailCard from "@/components/DashBoardPage/UserDetailCard";
import axios from "axios";
import Container from "@/components/LinkContainer";
import { LinkSchema } from '../api/db/schema/links';
import LiveNormalLinkCard from "@/components/LiveNormalLinkCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home({ params }: { params: { username: string } }) {
    const [userExists, setUserExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [userDetails, setUserDetails] = useState<User>({
        username: "",
        heading: "",
        background: "",
        userProfileURL: "",
    });

    const [links, setLinks] = useState<LinkSchema[]>([]);

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const response = await axios.get(`/api/db/checkUserExist?username=${params.username}`);
                if (response.data.true) {
                    setUserExists(true);
                    setUserDetails(response.data.true);
                    document.title = `${response.data.true.username}'s live links`;
                    document.body.style.backgroundImage = `url(${response.data.true.background})`;
                } else if (response.data.false || response.data.error) {
                    setUserExists(false);
                    setMessage(response.data.false || response.data.error);
                }
            } catch (error) {
                setUserExists(false);
                setMessage("An error occurred while fetching user");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        async function fetchLinks() {
            setLoading(true);
            if (userExists) {
                try {
                    const response = await axios.get(`/api/db/getLinks?username=${params.username}`);
                    if (response.data.success) {
                        setLinks(response.data.success);
                    } else if (response.data.failure || response.data.error) {
                        setMessage(response.data.failure || response.data.error);
                    }
                } catch (error) {
                    setMessage("An error occurred while fetching links");
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchLinks();
    }, [userExists]);

    if (userExists) {
        return (
            <div className="flex justify-center align-middle min-h-screen p-10">
                <Container>
                    <UserDetailCard userDetails={userDetails} />
                    {links.length > 0 && links.map((link) => (
                        <LiveNormalLinkCard key={link.url} link={link} />
                    ))}
                </Container>
            </div>
        );
    } else if (loading || message !== "" || !userExists) {
        return (
            <div className="flex justify-center align-middle min-h-screen">
                {message !== "" ? (
                    <h1>{message}</h1>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[20vh] w-[35vw] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-[250px]" />
                                <Skeleton className="h-5 w-[200px]" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    else return null;
}