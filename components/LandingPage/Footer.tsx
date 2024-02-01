import Link from "next/link";

export default function Footer(){
    return(
        <footer className="flex flex-col gap-2 sm:flex-row items-center px-4 py-10 md:px-6  rounded-xl mt-2 bg-[#ababab68] dark:bg-[#222222af]">
        <p className="text-sm text-gray-400">© 2024 LinkinBio. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Facebook
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Twitter
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Instagram
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            LinkedIn
          </Link>
        </nav>
      </footer>
    )
}