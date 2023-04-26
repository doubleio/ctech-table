import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase.types'

const supabaseUrl = 'https://gxwdywzruhgspakvhknf.supabase.co'
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d2R5d3pydWhnc3Bha3Zoa25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzExOTk3MjQsImV4cCI6MTk4Njc3NTcyNH0.LbgDZ-fk4IDidYfI5YqGgMEVww45FCJ69iAMO8lScKQ'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
