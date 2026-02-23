import { StarRating } from "./StarRating";
import { timeAgo } from "@/lib/utils";

interface ReviewUser {
  name: string | null;
  username: string;
  avatar: string | null;
}

interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  createdAt: Date | string;
  user: ReviewUser;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const displayName = review.user.name || review.user.username;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
      {/* Rating + Timestamp */}
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} size="sm" />
        <span className="text-xs text-[var(--text-tertiary)]">
          {timeAgo(review.createdAt)}
        </span>
      </div>

      {/* Title */}
      {review.title && (
        <h4 className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
          {review.title}
        </h4>
      )}

      {/* Body */}
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
        {review.body}
      </p>

      {/* User info */}
      <div className="mt-4 flex items-center gap-2.5 border-t border-[var(--border)] pt-3">
        {review.user.avatar ? (
          <img
            src={review.user.avatar}
            alt={displayName}
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-600">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-[var(--text-primary)]">
            {displayName}
          </span>
          <span className="text-xs text-[var(--text-tertiary)]">
            @{review.user.username}
          </span>
        </div>
      </div>
    </div>
  );
}
