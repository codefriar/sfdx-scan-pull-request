import { expect, it, describe, beforeEach } from "@jest/globals";
import { execFileSync } from "child_process";
import fs from "fs";
import { getDiffInPullRequest } from "../src/git-actions";

jest.mock("child_process");
jest.mock("fs");
jest.mock("@actions/github", () => ({
  context: { repo: { owner: "test-owner", repo: "test-repo" }, sha: "abc123" },
}));

const sampleDiff = `diff --git a/src/Foo.cls b/src/Foo.cls
--- a/src/Foo.cls
+++ b/src/Foo.cls
@@ -1,3 +1,5 @@
 public class Foo {
+    public void bar() {
+        System.debug('hello');
+    }
 }
diff --git a/src/Bar.cls b/src/Bar.cls
deleted file mode 100644
--- a/src/Bar.cls
+++ /dev/null
@@ -1,3 +0,0 @@
-public class Bar {
-    // deleted
-}
`;

describe("getDiffInPullRequest", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (execFileSync as jest.Mock).mockReturnValue(Buffer.from(""));
    (fs.readFileSync as jest.Mock).mockReturnValue(sampleDiff);
    (fs.writeFileSync as jest.Mock).mockReturnValue(undefined);
  });

  it("should return changed lines mapped by file path", async () => {
    const result = await getDiffInPullRequest("main", "feature-branch");
    expect(result.has("src/Foo.cls")).toBe(true);
    expect(result.get("src/Foo.cls")!.changedLines.size).toBe(3);
  });

  it("should exclude deleted files (/dev/null)", async () => {
    const result = await getDiffInPullRequest("main", "feature-branch");
    expect(result.has("src/Bar.cls")).toBe(false);
  });

  it("should add destination remote when provided", async () => {
    await getDiffInPullRequest("main", "feature-branch", "https://github.com/org/repo.git");
    expect(execFileSync).toHaveBeenCalledWith(
      "git", ["remote", "add", "-f", "destination", "https://github.com/org/repo.git"],
      expect.anything()
    );
  });

  it("should not add destination remote when not provided", async () => {
    await getDiffInPullRequest("main", "feature-branch");
    const calls = (execFileSync as jest.Mock).mock.calls;
    const remoteAddCalls = calls.filter((call: any[]) => call[0] === "git" && call[1]?.[0] === "remote");
    expect(remoteAddCalls).toHaveLength(0);
  });

  it("should use execFileSync to prevent shell injection", async () => {
    await getDiffInPullRequest("main; rm -rf /", "feature; cat /etc/passwd");
    // execFileSync passes arguments as an array, not through a shell,
    // so shell metacharacters are treated as literal strings
    const diffCall = (execFileSync as jest.Mock).mock.calls.find(
      (call: any[]) => call[0] === "git" && call[1]?.[0] === "diff"
    );
    expect(diffCall).toBeDefined();
    // The ref is passed as a single argument, not interpreted by a shell
    expect(diffCall![1][1]).toBe("destination/main; rm -rf /...origin/feature; cat /etc/passwd");
  });

  it("should only track added lines, not deleted lines", async () => {
    const result = await getDiffInPullRequest("main", "feature-branch");
    const fooInfo = result.get("src/Foo.cls")!;
    // Only "add" type changes should be tracked (lines 2, 3, 4 in the new file)
    for (const line of fooInfo.changedLines) {
      expect(line).toBeGreaterThan(0);
    }
  });
});
