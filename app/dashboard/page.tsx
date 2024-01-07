import DropzoneArea from "@/components/DropzoneArea";
import TabbleWrapper from "@/components/table/TabbleWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs";
import { getDocs, collection } from "firebase/firestore";

async function Dashboard() {
  const { userId } = auth();
  const docResults = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = docResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timeStamp.seconds * 1000),
    fullname: doc.data().fullname,
    downloadUrl: doc.data().downloadUrl,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <div className="container">
      <DropzoneArea />
      <section className="container space-y-5">
        <h2 className="font-bold">All Files</h2>
        <div>
          {/* Tabble Wrapper*/}
          <TabbleWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
