import Link from "next/link";

export default function Footer(){
    return(
        <footer className="flex flex-col gap-2 sm:flex-row items-center px-4 py-10 md:px-6 rounded-t-xl mt-4 mb-0 bg-[#ababab68] dark:bg-[#222222af]">
        <p className="text-sm text-gray-400">© 2024 MyLinksLive All rights reserved.</p>
        <nav className=" flex gap-4 sm:gap-6 lg:ml-auto md:ml-auto sm:ml-0">
          <Link className="text-xs hover:underline underline-offset-4" href="https://github.com/techlism">
            GitHub
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="https://x.com/techlism1">
            Twitter
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="https://github.com/techlism/mylivelink">
            Report a bug
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="https://blog.techlism.in">
            Blog
          </Link>           
        </nav>
      </footer>
    )
}