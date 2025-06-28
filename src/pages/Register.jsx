import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null); // Tracks if username is available
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Reset username availability when changing the username
    if (name === 'username') {
      setUsernameAvailable(null);
    }
    
    // Clear general registration error
    if (registrationError) {
      setRegistrationError('');
    }
  };
  
  // Function to check if username is already taken
  const checkUsernameAvailability = async (username) => {
    setCheckingUsername(true);
    setUsernameAvailable(null); // Reset availability status
    
    try {
      // Add a small delay to make the loading indicator visible
      // This enhances UX by making the check feel more deliberate
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Check if username exists in profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        // PGRST116 means no results found, which is what we want
        console.error('Error checking username:', error);
        setUsernameAvailable(true); // Allow form to proceed, better UX in case of error
        return true;
      }
      
      const isAvailable = !data;
      setUsernameAvailable(isAvailable);
      return isAvailable; // Username is available if no data was found
    } catch (error) {
      console.error('Error in username check:', error);
      setUsernameAvailable(true); // Allow form to proceed in case of error
      return true;
    } finally {
      setCheckingUsername(false);
    }
  };

  const validateForm = async () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    } else if (usernameAvailable === false) {
      // We already know username is taken from earlier check
      newErrors.username = 'Username is already taken';
    } else if (usernameAvailable === null) {
      // If we don't have a result yet, do a check now
      const isAvailable = await checkUsernameAvailability(formData.username);
      if (!isAvailable) {
        newErrors.username = 'Username is already taken';
      }
    }
    // If usernameAvailable is true, no error needed
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) return;
    
    setLoading(true);
    
    try {
      // Create a fake email by appending @noemail.com to username
      const fakeEmail = `${formData.username.toLowerCase()}@noemail.com`;
      
      // Register user with Supabase using the fake email
      const { data, error } = await supabase.auth.signUp({
        email: fakeEmail,
        password: formData.password
      });
      
      if (error) {
        console.error('Registration error:', error);
        throw error;
      }
      
      // Log the user data for debugging
      console.log('Registration successful:', data);

      // Sign in the user immediately after registration
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: fakeEmail,
        password: formData.password,
      });
      
      if (signInError) {
        console.error('Error signing in after registration:', signInError);
        alert('Registration successful! You can now log in with your credentials.');
        navigate('/login');
        return;
      }

      // Now that the user is signed in, we can safely update their profile
      if (data?.user?.id) {
        try {
          // 1. First update user metadata in auth.users table
          const { error: updateError } = await supabase.auth.updateUser({
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName
            }
          });
          
          if (updateError) console.error('Error updating user metadata:', updateError);
          
          // 2. Then explicitly create a profile record in the profiles table
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert([
              {
                id: data.user.id,
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: `${formData.username.toLowerCase()}@noemail.com`,
                username: formData.username,
                role: 'customer'
              }
            ], { onConflict: 'id', ignoreDuplicates: false });
          
          if (profileError) {
            console.error('Error creating profile record:', profileError);
          } else {
            console.log('Profile created successfully');
          }
        } catch (profileError) {
          console.error('Profile update error:', profileError);
        }
      }
      
      // Show success message and redirect to home
      alert('Registration successful! You are now logged in.');
      navigate('/');
      // You could also automatically sign them in and redirect to home page
    } catch (error) {
      console.error('Error registering:', error);
      setRegistrationError(
        error.message || 'An error occurred during registration. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };
  
  // useEffect for debounced username availability check
  useEffect(() => {
    // Don't check if username is too short
    if (formData.username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    // Setup a timer for debouncing
    const timer = setTimeout(() => {
      // Only check if username meets the required format
      if (/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        checkUsernameAvailability(formData.username);
      }
    }, 800); // Wait 800ms after user stops typing

    // Cleanup: clear timeout if component unmounts or username changes again
    return () => clearTimeout(timer);
  }, [formData.username]);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
          
          {registrationError && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4" role="alert">
              {registrationError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded ${errors.username ? 'border-red-500' : (usernameAvailable === true ? 'border-green-500' : 'border-gray-300')}`}
                />
                {checkingUsername && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
                {!checkingUsername && formData.username.length > 2 && usernameAvailable === true && !errors.username && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
              {!errors.username && formData.username.length > 2 && usernameAvailable === true && (
                <p className="text-green-500 text-sm mt-1">Username is available!</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
