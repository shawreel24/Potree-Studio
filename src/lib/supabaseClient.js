import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://guxoclcecklyvpanwleg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1eG9jbGNlY2tseXZwYW53bGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjk3OTQsImV4cCI6MjA5Njg0NTc5NH0.XqnI_FjlhNwBNbr09fM3a_g2SIaJTq1eopg_NRNPvZg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
