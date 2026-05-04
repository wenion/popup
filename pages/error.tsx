import { useRouter } from "next/router";
import { Button } from "@heroui/button";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";

import { useAppContext } from "@/components/context";

export default function ErrorPage() {
  const { error } = useAppContext();
  const router = useRouter();

  const onExit = () => {
    // backwards history
    router.back();
  };

  const onResetClick = async () => {
    await chrome.storage.local.clear();
    router.back();
  };

  return (
    <main className="w-80 bg-white shadow-sm ring-1 ring-black/5">
      {error && (
        <Card>
          <CardHeader className="text-lg">Error</CardHeader>
          <CardBody>
            <p className="text-sm text-gray-600">{error}</p>
          </CardBody>
          <CardFooter className="flex px-12 py-4 justify-between">
            <Button size="sm" color="danger" onPress={onResetClick}>
              Reset
            </Button>
            <Button size="sm" color="primary" onPress={onExit}>
              Close
            </Button>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
