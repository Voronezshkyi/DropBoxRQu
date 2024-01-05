import DropzoneArea from "@/components/DropzoneArea";
import { auth } from "@clerk/nextjs";
const page = () => {
  const { userId } = auth();
  return (
    <div>
      <DropzoneArea />
    </div>
  );
};

export default page;
