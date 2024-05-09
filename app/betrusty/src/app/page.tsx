import Header from "./components/Header";
import edit from "./assets/Like.png";
import share from "./assets/Share.png";
import Image from "next/image";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />

      <div className="bg-red-500">
        <div>
          <h1>Frank Apart</h1>

          <div>
            <Image src={edit} alt="edit" className="w-32 h-9" />
            <Image src={share} alt="share" className="w-11 h-11" />
          </div>
        </div>
      </div>
    </main>
  );
}
