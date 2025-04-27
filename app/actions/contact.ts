'use server'

import { createClient } from '@supabase/supabase-js'


const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or anonymous key.')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface ContactFormData {
  name: string
  email: string
  telegram?: string
  wallet?: string
  message?: string
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    const { data, error } = await supabase
      .from('contact')
      .insert([{
        name: formData.name,
        email: formData.email,
        telegram: formData.telegram || null,
        wallet: formData.wallet || null,
        message: formData.message || null,
      }])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      return { success: false, error: error.message }
    }

    console.log('Supabase insert success:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { success: false, error: errorMessage }
  }
} 