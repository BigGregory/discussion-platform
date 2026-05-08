import { cache } from 'react';

import { Comment } from '@prisma/client';
import { db } from '@/db';

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

// Request Memoization (Next)
// Adding caching to avoid "N +1 query problem"
// - fetch -> uses caching automatically
// - "cache" function from react when manually
export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    return db.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  },
);
