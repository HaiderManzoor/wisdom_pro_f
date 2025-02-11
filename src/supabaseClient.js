import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uesicaftnpeqmumwbiwx.supabase.co'; // Replace with your URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlc2ljYWZ0bnBlcW11bXdiaXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4MzQyMDQsImV4cCI6MjA1NDQxMDIwNH0.P4_1x7Tf_G7wmM1Zk5lMqoiEXq-CyVU03YuJhrTSA2o'; // Replace with your key
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
