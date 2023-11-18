require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const yaml = require('js-yaml');

// Replace with your Supabase credentials and table details
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const tableName = 'testimonials';

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchTestimonials() {
  try {
    // Fetch data from the Supabase table
    const { data, error } = await supabase.from(tableName).select('*');

    if (error) {
      throw error;
    }

    // Transform the data into the desired YAML format
    const yamlData = data.map(entry => ({
      person: entry.name,
      title: entry.occupation,
      photo: entry.picture,
      text: entry.description,
    }));

    // Create YAML content
    const yamlContent = yaml.dump({ testimonials: yamlData });

    // Write YAML content to a file
    fs.writeFileSync('testimonials.yaml', yamlContent);

    console.log('YAML file created successfully.');
  } catch (error) {
    console.error('Error fetching data from Supabase:', error.message);
  }
}

// Run the script
fetchTestimonials();
