import Header from "@/app/UI/Header";
import BlogAdmin from "./blogAdmin";

export default function Admin() {
  return (
    <>
      <Header text="Admin" />
      <div className="px-[6%] py-24">
        <BlogAdmin />
      </div>
    </>
  );
}
