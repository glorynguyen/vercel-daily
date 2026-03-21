import Image from "next/image";

interface ContentBlock {
  type: string;
  text?: string;
  level?: number;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
}

export default function ArticleContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <article className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed mb-6"
              >
                {block.text}
              </p>
            );
          case "heading":
            return block.level === 2 ? (
              <h2
                key={i}
                className="text-2xl font-semibold text-foreground mt-10 mb-4 tracking-tight"
              >
                {block.text}
              </h2>
            ) : (
              <h3
                key={i}
                className="text-xl font-semibold text-foreground mt-8 mb-3 tracking-tight"
              >
                {block.text}
              </h3>
            );
          case "blockquote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground bg-muted/30 rounded-r-lg"
              >
                {block.text}
              </blockquote>
            );
          case "unordered-list":
            return (
              <ul key={i} className="list-disc pl-6 my-6 space-y-2">
                {block.items?.map((item, j) => (
                  <li key={j} className="text-muted-foreground leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "ordered-list":
            return (
              <ol key={i} className="list-decimal pl-6 my-6 space-y-2">
                {block.items?.map((item, j) => (
                  <li key={j} className="text-muted-foreground leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "image":
            return (
              <figure key={i} className="my-8">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border">
                  <Image
                    src={block.src || ""}
                    alt={block.alt || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}