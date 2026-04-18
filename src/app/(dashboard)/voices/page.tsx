import { voicesSearchParamsCache } from "@/features/voices/lib/params";
import { VoicesView } from "@/features/voices/views/voices-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { SearchParams } from "nuqs/server";

export default async function VoicesPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const { query } = await voicesSearchParamsCache.parse(searchParams);
  
  prefetch(trpc.voices.getAll.queryOptions({ query }));
  
  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  )
}