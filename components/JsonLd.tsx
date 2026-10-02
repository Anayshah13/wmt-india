/**
 * Renders schema.org structured data as a JSON-LD <script>.
 * "<" is escaped as < so string content can never close the script tag (XSS-safe).
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
