import { expect, it, describe } from "@jest/globals";
import { gunzipSync } from "zlib";
import { compressAndEncode } from "../src/SarifUploader";

describe("compressAndEncode", () => {
  it("should gzip and base64 encode content", () => {
    const input = '{"version":"2.1.0","runs":[]}';
    const result = compressAndEncode(input);
    const decoded = Buffer.from(result, "base64");
    const decompressed = gunzipSync(decoded).toString();
    expect(decompressed).toBe(input);
  });

  it("should return a valid base64 string", () => {
    const input = "test content";
    const result = compressAndEncode(input);
    expect(result).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });
});
