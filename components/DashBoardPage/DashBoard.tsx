import Container from "../LinkContainer";
import NormalLinkCard from "../NormalLinkCard";
import { CreateLinkDialog } from "./CreateLinkDialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";

import { LinkType, LinkSchema, LinkCategory } from "@/app/api/db/schema/links";
import { User } from "@/app/api/db/schema/users";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUserDetailDialog from "./EditUserDetailDialog";
import UserDetailCard from "./UserDetailCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExistingNormalLinkCard from "../ExistingNormalLinkCard";
export type LinksArray = LinkSchema[];

export const backgrounds = [
  { name: "Background 1", url: "/bg1.svg" },
  { name: "Background 2", url: "/bg2.svg" },
  { name: "Background 3", url: "/bg3.svg" },
  { name: "Background 4", url: "/bg4.svg" },
  { name: "Background 5", url: "/bg5.svg" },
  { name: "Background 6", url: "/bg6.svg" },
  { name: "Background 7", url: "/bg7.svg" },
  { name: "Plain white", url: "/bgplain1.svg" },
  { name: "Plain dark", url: "/bgplain2.svg" },
  { name: "Default Dark", url: "/bgdark.svg" },
  { name: "Default Light", url: "/bglight.svg" },
];

export default function DashBoard() {
	// state variables
  const [links, setLinks] = useState<LinksArray>([]);
  const [existingLinks, setExistingLinks] = useState<LinksArray>([]);
  const { user } = useUser();

  const [newLink, setNewLink] = useState<LinkSchema>({
    title: "",
    url: "",
    thumbnailUrl: "",
    faviconURL: "",
    type: LinkType.New,
    category: LinkCategory.Normal,
    username: user?.username!,
  });

  const [userDetails, setUserDetails] = useState<User>({
    username: user?.username!,
    heading: "A custom message for your visitors",
    background: backgrounds[0].url,
    userProfileURL: user?.imageUrl || "",
  });
  // handler functions
  const addLink = (link: LinkSchema) => {
    if (!link.title || !link.url) return;
    setLinks([...links, link]);
    setNewLink({
      title: "",
      url: "",
      thumbnailUrl: "",
      faviconURL: "",
      type: LinkType.New,
      category: LinkCategory.Normal,
      username: user?.username!,
    });
  };

  function handleDelete(url: string) {
    setLinks(links.filter((l) => l.url !== url));
  }
  function handleExistingDelete(url: string) {
    setExistingLinks(existingLinks.filter((l) => l.url !== url));
  }
  async function saveToDB() {
    try {
      const response = await axios.post("/api/db/addLinks", { links: links });
      if (response.data.success) {
        setExistingLinks(links.map((link) => ({ ...link, type: LinkType.Existing })));
        toast("Saved Successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      } else if (response.data.partial_insertion) {
        const successful: number[] = response.data.partial_success;
        setExistingLinks(
          links.map((link, index) => {
            if (successful.includes(index)) {
              return { ...link, type: LinkType.Existing };
            }
            return link;
          })
        );
        toast("Some Links were not saved", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      } else if (response.data.failure) {
        toast(`Something went wrong : ${response.data.failure}`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast(`Error : ${error}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  // useEffect 
  useEffect(() => {
    async function getUserDetails() {
      const check = await axios.get(
        `/api/db/checkUserExist?username=${user?.username}`
      );
      if (check.data.true) {
        const details: User = check.data.true;
        setUserDetails(details);
      }
    }
    getUserDetails();
  }, []);

  useEffect(() => {
    async function fetchLinks() {
		if(user?.username){
			try {
				const response = await axios.get(
				  `/api/db/getLinks?username=${user?.username}`
				);
				if (response.data.success) {
				  setExistingLinks(response.data.success);
				} else if (response.data.failure) {
				  toast(`Something went wrong : ${response.data.failure}`, {
					position: "bottom-right",
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
					theme: "dark",
				  });
				}
			  } catch (error) {
				toast(`Error : ${error}`, {
				  position: "bottom-right",
				  autoClose: 2000,
				  hideProgressBar: true,
				  closeOnClick: true,
				  pauseOnHover: true,
				  draggable: false,
				  progress: undefined,
				  theme: "dark",
				});
			  }
			}
		}

    fetchLinks();
  },[existingLinks]);  
  console.log(links);
  return (
    <div className="p-5 flex align-middle justify-center">
      <Container>
        <div>
          <UserDetailCard userDetails={userDetails} />
          <EditUserDetailDialog
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        </div>
        <Tabs defaultValue="new">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">New Links</TabsTrigger>
            <TabsTrigger value="existing">Existing Links</TabsTrigger>
          </TabsList>
          <TabsContent value="new">
            <div className="flex flex-col gap-4">
              <CreateLinkDialog
                newLink={newLink}
                setNewLink={setNewLink}
                addLink={addLink}
              />
              {links.map(
                (link, index) =>
                  link.type === LinkType.New && (
                    <NormalLinkCard
                      link={link}
                      key={index}
                      onDelete={handleDelete}
                      links={links}
                    />
                  )
              )}
              <Button variant={"default"} onClick={saveToDB}>
                Save Changes
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="existing">
		  	{existingLinks.map(
                (elink, index) =>                  
                    <ExistingNormalLinkCard
                      link={elink}
                      key={index+"existing"}
                      onDelete={handleExistingDelete}
                      links={existingLinks}
                    />
			)}
		  </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
