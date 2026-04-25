
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('blog_authors')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, avatar, bio } = body;

    const { data, error } = await supabase
      .from('blog_authors')
      .insert([{ name, role, avatar, bio }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, role, avatar, bio } = body;

    // 1. Get old name to find related blogs
    const { data: oldAuthor } = await supabase
      .from('blog_authors')
      .select('name')
      .eq('id', id)
      .single();

    // 2. Update author profile
    const { data, error } = await supabase
      .from('blog_authors')
      .update({ name, role, avatar, bio })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // 3. AUTO-SYNC: Update all blogs that were written by this author
    if (oldAuthor) {
      console.log(`Syncing blogs for author: ${oldAuthor.name} -> ${name}`);
      await supabase
        .from('blogs')
        .update({ 
          author_name: name,
          author_role: role,
          author_avatar: avatar,
          author_id: id // Ensure link is set
        })
        .eq('author_name', oldAuthor.name);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) throw new Error("ID required");

    const { error } = await supabase
      .from('blog_authors')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
