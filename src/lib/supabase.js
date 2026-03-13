import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getMessages = async () => {
  const { data, error } = await supabase
    .from('ucapan_tamu')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching messages:', error)
    return []
  }
  
  return data
}

export const addMessage = async (nama_tamu, pesan, will_attend) => {
  const { data, error } = await supabase
    .from('ucapan_tamu')
    .insert([
      { 
        nama_tamu, 
        pesan, 
        will_attend,
        created_at: new Date().toISOString()
      }
    ])
    .select()
  
  if (error) {
    console.error('Error adding message:', error)
    throw error
  }
  
  return data
}

export const subscribeToMessages = (callback) => {
  const subscription = supabase
    .channel('ucapan_tamu_changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'ucapan_tamu'
      },
      (payload) => {
        callback(payload.new)
      }
    )
    .subscribe()
  
  return subscription
}
