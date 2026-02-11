import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Intermigro",
  description: "Datenschutzerklärung - Privacy Policy Intermigro",
};

async function getPrivacyContent() {
  const filePath = path.join(process.cwd(), "public", "Datenschutzerklärung.md");
  const content = fs.readFileSync(filePath, "utf-8");
  return content;
}

export default async function PrivacyPage() {
  const content = await getPrivacyContent();

  return (
    <main className="bg-white text-black">
      <div className="px-5 pt-28 pb-16 md:px-10 md:pt-36 lg:px-20 lg:pt-40 xl:px-32 2xl:px-40">
        <Link
          href="/"
          className="text-brand mb-6 inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          ← Вернуться на главную
        </Link>

        <article className="max-w-none">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-6 text-2xl font-bold md:text-3xl lg:text-4xl">{children}</h1>
              ),
              h2: ({ children }) => <h2 className="mt-10 mb-4 text-xl font-bold">{children}</h2>,
              h3: ({ children }) => <h3 className="mt-6 mb-3 text-lg font-bold">{children}</h3>,
              p: ({ children }) => (
                <p className="text-gray-dark mb-4 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="text-gray-dark mb-4 list-disc space-y-1 pl-6">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="text-gray-dark mb-4 list-decimal space-y-1 pl-6">{children}</ol>
              ),
              li: ({ children }) => <li className="text-gray-dark">{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-brand hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-black">{children}</strong>
              ),
              hr: () => <hr className="my-8 border-gray-200" />,
            }}
          >
            {content}
          </Markdown>
        </article>
      </div>
    </main>
  );
}
