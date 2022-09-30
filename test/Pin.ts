/** @format */

import { pinToIPFS } from "../scripts/pin";
import { expect } from "chai";
import axios from "axios";
describe("Pinnging", function () {
  let response: any;
  let data: any;
  this.beforeEach(async function () {
    data = {
      organization: "Done Collectively",
      address: "Anytown, USA",
      url: "https://donecollectively.com",
      twitter: "https://twitter.com/done_collective",
      adaHandle: "$DCOLL",
    };
    response = await pinToIPFS(data);
  });
  it("Should store an object to ipfs", async function () {
    const { cid, size } = response;
    expect(cid).to.eql(
      "bafkreibuzcsiabvyt64gcavkotfck7vxywqbfx6qw3woxwkr3ca5x3h33e"
    );
    expect(size).to.eql(167);
  });

  it("Should retrieve an object from ipfs", async function () {
    const { cid } = response;
    const fetched = await axios
      .get(`https://ipfs.io/ipfs/${cid}`)
      .then((res) => res.data)
      .catch(console.error);
    expect(fetched).to.eql(data);
  });
});
