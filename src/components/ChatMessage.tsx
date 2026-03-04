import ReactMarkdown from "react-markdown";
import { type Message } from "@/lib/streamChat";
import { BookOpen, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

function useWordReveal(content: string, isStreaming: boolean) {
  const [visibleCount, setVisibleCount] = useState(isStreaming ? 0 : Infinity);
  const words = content.split(/(\s+)/); // preserve whitespace
  const prevContentRef = useRef(content);

  useEffect(() => {
    if (!isStreaming) {
      setVisibleCount(Infinity);
      return;
    }

    // When content grows (new chunk), reveal new words one by one
    const totalWords = words.length;
    if (visibleCount >= totalWords) return;

    const timer = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= totalWords) {
          clearInterval(timer);
          return c;
        }
        return c + 1;
      });
    }, 30); // 30ms per word segment

    return () => clearInterval(timer);
  }, [content, isStreaming, words.length]);

  // When streaming ends, show everything
  useEffect(() => {
    if (!isStreaming) setVisibleCount(Infinity);
  }, [isStreaming]);

  if (visibleCount >= words.length) return content;
  return words.slice(0, visibleCount).join("");
}

export function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const displayContent = useWordReveal(message.content, isStreaming && !isUser);

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full gold-gradient flex items-center justify-center mt-1">
          <BookOpen className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card ottoman-border"
        }`}
      >
        {isUser ? (
          <p className="text-sm font-sans">{message.content}</p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none font-sans text-foreground
            prose-headings:font-serif prose-headings:text-primary
            prose-strong:text-primary prose-a:text-primary
            prose-ul:text-foreground prose-ol:text-foreground
            prose-li:text-foreground">
            <ReactMarkdown>{displayContent}</ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center mt-1">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
}
