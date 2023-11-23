import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const getStorageName = () => {
  return process.env.NODE_ENV.startsWith('dev') ? 'comments.dev' : 'comments';
};

const fetchComments = async (article, response) => {
  try {
    const { data, error } = await supabase
      .from(getStorageName())
      .select(
        `created_at, content, author ( first_name, last_name, user_name, avatar )`
      )
      .eq('article', article);

    if (error) {
      console.error(error);
      response.status(400).json({ success: false, reason: error.message });
    } else {
      response.status(200).json({ success: true, data });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, reason: error.message });
  }
};

const addComment = async (commentData, response) => {
  try {
    const { author, article, content } = commentData;
    const { data, error } = await supabase.from(getStorageName()).insert({
      author,
      article,
      content,
    }).select()

    if (error) {
      console.error(error);
      response.status(400).json({ success: false, reason: error.message });
    } else {
      response.status(200).json({ success: true, data });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, reason: error.message });
  }
};

export default async function handler(request, response) {
  const mode = request.query.mode;

  switch (mode) {
    case 'select':
      await fetchComments(request.body, response);
      break;
    case 'add':
      await addComment(request.body, response);
      break;
    default:
      response.status(400).json({ success: false, reason: 'Invalid mode specified.' });
      break;
  }
}
