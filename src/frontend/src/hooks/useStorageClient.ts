import { HttpAgent } from "@icp-sdk/core/agent";
import { useMemo } from "react";
import { loadConfig } from "../config";
import { StorageClient } from "../utils/StorageClient";
import { useInternetIdentity } from "./useInternetIdentity";

let storageClientPromise: Promise<StorageClient> | null = null;
let lastIdentity: unknown = undefined;

export function useStorageClient(): {
  getStorageClient: () => Promise<StorageClient>;
} {
  const { identity } = useInternetIdentity();

  const getStorageClient = useMemo(() => {
    return async (): Promise<StorageClient> => {
      if (storageClientPromise && lastIdentity === identity) {
        return storageClientPromise;
      }
      lastIdentity = identity;
      storageClientPromise = (async () => {
        const config = await loadConfig();
        const agent = new HttpAgent({
          host: config.backend_host,
          identity: identity ?? undefined,
        });
        return new StorageClient(
          config.bucket_name,
          config.storage_gateway_url,
          config.backend_canister_id,
          config.project_id,
          agent,
        );
      })();
      return storageClientPromise;
    };
  }, [identity]);

  return { getStorageClient };
}
