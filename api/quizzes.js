import { createClient } from '@supabase/supabase-js'

async function handler(request, response) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )

  switch (request.query.mode) {

    case 'details':
      try {
        const storageName = process.env.NODE_ENV.startsWith('dev')
          ? 'quizzes.dev'
          : 'quizzes'
        const { quiz, question, answer, correct, elapsed, user } = request.body
        await supabase.from(storageName).insert({
          quiz, question, answer, correct, elapsed, user
        })
        response.status(200).send({ success: true })
      } catch (err) {
        console.log(err)
        response.status(400).send({ success: false })
      }
      break;

    case 'update':
      try {
        const storageName = process.env.NODE_ENV.startsWith('dev')
          ? 'rankings.dev'
          : 'rankings'
        const { user, quiz, accuracy, speed, accuracy2, speed2 } = request.body
        const { data, error } = await supabase.from(storageName).insert({
          player: user, quiz, accuracy, speed, accuracy2, speed2
        })
        if (error) console.log(error.message)

        if (accuracy >= 90 && speed >= 90) { // code for free
          const storageName2 = process.env.NODE_ENV.startsWith('dev')
            ? 'permissions.dev'
            : 'permissions'
          // const { data, error } = await supabase.from(storageName2).insert({
          //   user,
          //   article: '/blog/just-solution/',
          // })
          if (error) console.log(error.message)
        }

        response.status(200).send({ success: true })
      } catch (err) {
        console.log(err)
        response.status(400).send({ success: false })
      }
      break;

    case 'select':
      try {
        const storageName = process.env.NODE_ENV.startsWith('dev')
          ? 'rankings.dev'
          : 'rankings'
        // const data = (await supabase.from(storageName).select()).data
        const { data, error } = (
          await supabase
            .from(storageName)
            .select(
              `created_at, player ( email, user_name, title, created_at, avatar ), accuracy, speed, quiz`
            )
          // .eq('quiz', 'Welcome Test')
        )
        response.status(200).json({ data })
      } catch (error) {
        console.log(error);
        response.status(400).json({ message: 'Sorry, an error occurred.' })
      }
      break;

    default:
      console.error('[error][quizzes] unknown query parameter');
      response
        .status(400)
        .send({ success: false, error: 'Unknown query parameter' })
      break;
  }
}

export default handler
