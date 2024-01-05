import Image from "next/image";
import Link from "next/link";
import { Toggler } from "./ui/Toggler";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="flex items-center bg-[#0160FE] w-fit">
          <Image
            src="/dropbox.svg"
            alt="logo"
            className="invert"
            height={50}
            width={50}
          />
        </div>
        <p className="font-bold text-xl">Dropbox</p>
      </Link>
      <div className="flex items-center space-x-2 px-5">
        <Toggler />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
