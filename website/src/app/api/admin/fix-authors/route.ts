import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { auth: { persistSession: false } }
        );

        const authorProfiles = [
            { name: 'Mantra Guru Ji', role: 'Divine Guide', avatar: '/logo.png' },
            { name: 'Aacharya Dr. Ram Ramanuj', role: 'Vedic Scholar', avatar: '/logo.png' },
            { name: 'Pandit Ravi Shastri', role: 'Head Priest', avatar: '/logo.png' },
            { name: 'Acharya Meera', role: 'Senior Astrologer', avatar: '/logo.png' },
            { name: 'Dr. Aryan Sharma', role: 'Vedic Researcher', avatar: '/logo.png' }
        ];

        // 1. Fetch all blogs with the generic name
        const { data: blogs, error: fetchError } = await supabase
            .from('Final_blog')
            .select('id, blog_title')
            .or('author_name.eq.MantraPuja AI,author_name.is.null');

        if (fetchError) throw fetchError;

        console.log(`[FixAuthors] Found ${blogs?.length || 0} blogs to update.`);

        // 2. Update each blog with a random professional profile
        const results = [];
        for (const blog of blogs || []) {
            const profile = authorProfiles[Math.floor(Math.random() * authorProfiles.length)];
            
            const { error: updateError } = await supabase
                .from('Final_blog')
                .update({
                    author_name: profile.name,
                    author_role: profile.role,
                    author_avatar: profile.avatar,
                    updated_at: new Date().toISOString()
                })
                .eq('id', blog.id);

            if (!updateError) {
                results.push({ id: blog.id, title: blog.blog_title, new_author: profile.name });
            }
        }

        return NextResponse.json({
            success: true,
            updated_count: results.length,
            details: results
        });

    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
