import { ClipLoader } from "react-spinners";
export default function Loader() {
  return <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <ClipLoader size={60} color="#3498db" />
  </div>;
}
