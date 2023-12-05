import { createClient } from '@supabase/supabase-js'
import formidable from 'formidable'
import fs from 'fs'

async function handler(req, res) {
  const form = formidable({}) //new formidable.IncomingForm()
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  )

  const storageName = process.env.NODE_ENV.startsWith('dev')
    ? 'users.dev'
    : 'users'

  const insertRecord = async () => {
    return new Promise(async (resolve, reject) => {
      form.parse(req, async function (err, fields, files) {
        if (err) {
          console.error(err);
          return reject({ success: false });
        }

        var cols = {};

        for (const [key, value] of Object.entries(files)) {
          if (files[key]) {
            const file = files[key][0]
            let filepath = `${key}/${file.newFilename}.${file.mimetype.split('/').pop()}`;
            const rawData = fs.readFileSync(file.filepath);

            try {
              const { data, error } = await supabase.storage
                .from(storageName)
                .upload(filepath, rawData, {
                  contentType: file.mimetype,
                });

              if (error) {
                console.error(error);
                throw new Error('Supabase storage error');
              }

              const field = key;
              cols[field] = `${process.env.SUPABASE_URL}/storage/v1/object/public/${storageName}/${filepath}`;
            } catch (storageError) {
              console.error(storageError);
              return reject({ success: false });
            }
          }
        }

        for (const [key, value] of Object.entries(fields)) {
          if (key !== 'path' && key !== 'email')
            cols[key] = value[0] === '' ? null : value[0];
        }

        try {
          const { data, error } = await supabase.from(storageName).update(cols).eq('email', fields.email);
          if (error) {
            console.error(error);
            throw new Error('Supabase database update error');
          }

          resolve({ success: true });
        } catch (updateError) {
          console.error(updateError);
          return reject({ success: false });
        }
      });
    });
  };

  switch (req.query.mode) {
    // case 'deactivate':
    //   console.log('>>> deactivating user', req.query.email);
    //   try {
    //     var { error } = await supabase.from(storageName).delete().eq('email', req.query.email)
    //     if (error) console.log(error)
    //     res.status(200).send({ success: true })
    //   } catch (err) {
    //     res.status(400).send({ success: false })
    //   }
    //   break;

    default:
      try {
        await insertRecord()
        res.status(200).send({ success: true })
      } catch (err) {
        console.error(err)
        res.status(400).send({ success: false })
      }
      break;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
