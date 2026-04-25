import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://safdbuyuzvgughhvsbfj.supabase.co'
const supabaseAnonKey = 'sb_publishable_lEYyzSYhJfI_xkm1upcLgQ_j9BmyZ6a'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
