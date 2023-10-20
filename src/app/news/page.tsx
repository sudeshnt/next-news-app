import { NextPageProps } from "@/types";
import { Text } from "@chakra-ui/react";
import { useMemo } from "react";

export default function NewsDetailsPage({ searchParams }: NextPageProps) {
  const news = useMemo(() => {
    if (searchParams?.data) {
      try {
        let jsonObject = JSON.parse(searchParams?.data);
        return jsonObject;
      } catch (err) {
        return null;
      }
    } else {
      return null;
    }
  }, [searchParams?.data]);

  return (
    <div className="page">
      <Text>News Details Page</Text>
    </div>
  );
}
