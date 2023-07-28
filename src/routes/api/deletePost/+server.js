import { postsRef } from "$lib/server/db"
import { unlinkSync } from "fs"

export async function POST({ locals, request }) {
    if(locals.user){
        const formData = await request.json();
        const { id } = formData;

        let post = await postsRef.findOne({ id })

        if(post.file) unlinkSync(`static/files/${post.file}`);

        await postsRef.deleteOne({ id });

        return new Response(JSON.stringify({ error:false, message:"Post deleted." }));
    }else {
        return new Response(JSON.stringify({ error:true, message:"Not logged-in!" }));
    }
};
