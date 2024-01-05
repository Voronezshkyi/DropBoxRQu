import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center bg-[#2B2929] dark:bg-slate-800">
        <div className="flex p-10">
          <div className="flex flex-col justify-center space-y-5 text-white">
            <h1 className="text-5xl font-bold">Welcome to RQu Dropbox Clone</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              magni.
            </p>
            <p className="pb-10">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
              eos reiciendis consequatur. Repellat velit voluptate dolore
              doloremque numquam necessitatibus cumque saepe quo autem, omnis,
              ipsa quas natus praesentium a recusandae sed hic obcaecati, eum
              temporibus sequi assumenda? Provident quas deleniti quos sequi
              quidem. Cupiditate ullam iure esse odio, rerum delectus.
            </p>
            <Link
              href="/dashboard"
              className="flex cursor-pointer bg-blue-500 p-5 w-fit"
            >
              Try it for free!
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        <div className="h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080-ru.mp4"
              type="video/mp4"
            ></source>
          </video>
        </div>
      </div>
      <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam minima
        veritatis illum nisi voluptatum eveniet repellat vero officia autem
        aliquam?
      </p>
    </main>
  );
}
