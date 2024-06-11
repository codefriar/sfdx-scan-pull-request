// Define your GraphQL response interfaces here
export interface GraphQLResponse {
  repository: Repository;
}

export interface Repository {
  pullRequest: PullRequest;
}

export interface PullRequest {
  reviewThreads: ReviewThreadConnection;
}

export interface ReviewThreadConnection {
  nodes: ReviewThreadNode[];
}

export interface ReviewThreadNode {
  isResolved: boolean;
  comments: CommentConnection;
}

export interface CommentConnection {
  nodes: CommentNode[];
}

export interface CommentNode {
  body: string;
  startLine: number;
  path: string;
  commit: Commit;
  line: number;
  url?: string;
}

export interface Commit {
  oid: string;
}
