import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signin"); // redirect to default after mount
  }, [router]);

  return null;
}
