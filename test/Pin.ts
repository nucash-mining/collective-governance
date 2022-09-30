/** @format */

import { pinToIPFS } from "../scripts/pin";
import { expect } from "chai";
import axios from "axios";
describe("pinning", function () {
  let response: any;
  let data: any;
  this.beforeEach(async function () {
    data = {
      organization: "Done Collectively",
      address: "Anytown, USA",
      url: "https://done.collectively",
      twitter: "@doneCollectively",
      instagram: "@doneCollectively",
      adaHandle: "$done",
    };
    response = await pinToIPFS(data);
  });
  it("should store an object on ipfs", async function () {
    const { cid, size } = response;
    expect(cid).to.eql(
      "bafkreicgf3d74elnlirxdcligg7eksngfewfldqozz6ydqbgsvjfxgfkn4"
    );
    expect(size).to.eql(177);
  });

  it("should retrieve an object from ipfs", async function () {
    const { cid } = response;
    const fetched = await axios
      .get(`https://ipfs.io/ipfs/${cid}`)
      .then((res) => res.data)
      .catch(console.error);
    console.log(fetched);
    expect(fetched).to.eql(data);
  });
});
