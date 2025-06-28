import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data?.session?.user || null);
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getInitialSession();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });
    
    // Clean up subscription on unmount
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);
  
  const signIn = async (username, password) => {
    try {
      // Create fake email from username
      const fakeEmail = `${username.toLowerCase()}@noemail.com`;
      
      const { error } = await supabase.auth.signInWithPassword({ 
        email: fakeEmail, 
        password 
      });
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error signing in:', error);
      return { success: false, error: error.message };
    }
  };
  
  const signUp = async (username, password, userData) => {
    try {
      // Create fake email from username
      const fakeEmail = `${username.toLowerCase()}@noemail.com`;
      
      // Add username to user data
      const enhancedUserData = {
        ...userData,
        username
      };
      
      const { error } = await supabase.auth.signUp({ 
        email: fakeEmail, 
        password,
        options: { data: enhancedUserData }
      });
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error signing up:', error);
      return { success: false, error: error.message };
    }
  };
  
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      return { success: false, error: error.message };
    }
  };
  
  const getUserProfile = async () => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };
  
  return { user, loading, signIn, signUp, signOut, getUserProfile };
};

export default useAuth;
