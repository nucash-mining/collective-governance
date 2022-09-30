/** @format */

import { pin } from "@snapshot-labs/pineapple";

export async function pinToIPFS(obj: Object) {
  const receipt = await pin(obj);
  return receipt;
}
