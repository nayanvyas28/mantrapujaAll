
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import AuthorProfileClient from '@/components/authors/AuthorProfileClient';

// Disable caching for real-time updates during development
export const revalidate = 0;

async function getAuthor(slug: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Clean slug helper (removes dots, etc)
    const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    const decodedSlug = decodeURIComponent(slug);
    
    // 1. Try fetching from blog_authors table
    const { data: allAuthors } = await supabase.from('blog_authors').select('*');
    let author = allAuthors?.find((a: any) => clean(a.name) === clean(decodedSlug));

    // 2. If not in blog_authors, check the predefined personas
    if (!author) {
        const personas = [
            { name: 'Mantra Guru Ji', role: 'Divine Guide', avatar: '/logo.png', bio: 'Expert in Sanatan Dharma and Vedic rituals.' },
            { name: 'Aacharya Dr. Ram Ramanuj', role: 'Vedic Scholar', avatar: '/logo.png', bio: 'Senior researcher specializing in ancient Sanskrit scriptures.' },
            { name: 'Pandit Ravi Shastri', role: 'Head Priest', avatar: '/logo.png', bio: 'Dedicated to the performance and preservation of traditional Hindu rituals.' },
            { name: 'Acharya Meera', role: 'Senior Astrologer', avatar: '/logo.png', bio: 'Renowned astrologer providing spiritual and planetary guidance.' },
            { name: 'Dr. Aryan Sharma', role: 'Vedic Researcher', avatar: '/logo.png', bio: 'Scientist and scholar exploring the intersection of Vedic wisdom and modern life.' }
        ];
        
        const persona = personas.find(p => clean(p.name) === clean(decodedSlug));
        if (persona) {
            author = { ...persona, id: clean(persona.name) };
        }
    }

    // 3. 🚀 THE "GHOST AUTHOR" FIX: Search Final_blog for ANY author with this name slug
    if (!author) {
        const { data: allBlogAuthors } = await supabase
            .from('Final_blog')
            .select('author_name, author_role, author_avatar')
            .not('author_name', 'is', null);

        // Find a unique author name that matches our slug
        const foundBlogAuthor = allBlogAuthors?.find(b => clean(b.author_name) === clean(decodedSlug));
        
        if (foundBlogAuthor) {
            author = {
                name: foundBlogAuthor.author_name,
                role: foundBlogAuthor.author_role || 'Divine Guide',
                avatar: foundBlogAuthor.author_avatar || '/logo.png',
                bio: 'Contributing scholar and researcher at MantraPuja.',
                id: clean(foundBlogAuthor.author_name)
            };
        }
    }

    if (!author) return null;

    // 4. Fetch their blogs from Final_blog
    const { data: blogs } = await supabase
        .from('Final_blog')
        .select('*')
        .eq('author_name', author.name)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(12); // Show more blogs for dedicated author pages

    return {
        ...author,
        blogs: blogs || []
    };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = await getAuthor(slug);

    if (!author) {
        notFound();
    }

    return <AuthorProfileClient author={author} />;
}
