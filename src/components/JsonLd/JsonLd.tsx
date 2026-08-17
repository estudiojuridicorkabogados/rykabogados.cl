import type { Thing, WithContext } from "schema-dts";

interface JsonLdProps {
  schema: WithContext<Thing> | Array<WithContext<Thing>>;
}

/**
 * Renders structured data as an application/ld+json script tag.
 */
export const JsonLd: React.FC<JsonLdProps> = ({ schema }) => (
  <script
    type="application/ld+json"
    suppressHydrationWarning={true}
    /* oxlint-disable-next-line react/no-danger -- JSON-LD built from our own content, not user input */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
);
