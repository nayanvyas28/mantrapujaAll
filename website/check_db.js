const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkBlog() {
    const { data, error } = await supabase
        .from('Final_blog')
        .select('*')
        .limit(1)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error:', error);
        return;
    }

    if (data && data.length > 0) {
        const blog = data[0];
        console.log('--- BLOG KEYS ---');
        console.log(Object.keys(blog));
        console.log('\n--- CONTENT SAMPLE ---');
        console.log('blog_content type:', typeof blog.blog_content);
        console.log('blog_content value:', JSON.stringify(blog.blog_content).substring(0, 100));
        console.log('\n--- LEGACY CONTENT SAMPLE ---');
        console.log('content type:', typeof blog.content);
        console.log('content value:', JSON.stringify(blog.content).substring(0, 100));
    } else {
        console.log('No blogs found');
    }
}

checkBlog();
