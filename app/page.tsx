import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const router = useRouter();
    router.push("/");
  },[]  );
  return (
    <>
    </>
  );
}
