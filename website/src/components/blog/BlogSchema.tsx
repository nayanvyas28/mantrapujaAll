import { SchemaConfig, generateBlogDetailSchema } from "@/lib/schema-utils";

/**
 * 🕉️ BlogSchema (Server Component)
 * 
 * Injects a unified JSON-LD @graph into the head of the blog detail page.
 * Purely server-side; zero hydration cost.
 */
export default function BlogSchema({ config }: { config: SchemaConfig }) {
    const schema = generateBlogDetailSchema(config);
    
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
