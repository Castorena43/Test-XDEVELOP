"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Book } from "../types/book.type";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book | undefined;
};

export default function BookDetailModal({ open, onOpenChange, book }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{book?.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Author:</strong>{" "}
            {book?.author_name?.join(", ") ?? "Unknown"}
          </p>

          <p>
            <strong>First publish year:</strong>{" "}
            {book?.first_publish_year ?? "N/A"}
          </p>

          <p>
            <strong>Editions:</strong> {book?.edition_count}
          </p>

          <p>
            <strong>Languages:</strong>{" "}
            {book?.language?.join(", ") ?? "N/A"}
          </p>

          <p>
            <strong>Ebook access:</strong> {book?.ebook_access}
          </p>

          <p>
            <strong>Full text available:</strong>{" "}
            {book?.has_fulltext ? "Yes" : "No"}
          </p>

          <p>
            <strong>Public scan:</strong>{" "}
            {book?.public_scan_b ? "Yes" : "No"}
          </p>

          <p className="text-xs text-muted-foreground">
            Key: {book?.key}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}