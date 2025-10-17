import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import logo from '../assets/SpellingBeezLogo.png';

export default function AuthForm({ mode }) {
  // Local form state — kept simple on purpose for a lightweight auth screen
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // small UX toggle
  const navigate = useNavigate();

  // ---- Google OAuth via popup ----
  // Frontend responsibility here:
  // 1) open a safe-sized popup
  // 2) listen for a postMessage containing a token
  // 3) store token, then route to the app
  const handleOauthLogin = () => {
    const popup = window.open(
      'http://localhost:8000/auth/google',
      'googleLogin',
      'width=600,height=700'
    );

    // If the browser blocks popups, fail early with an explicit message
    if (!popup) {
      alert('Popup blocked — please allow popups for this site to continue.');
      return;
    }

    // For safety: only accept messages from our own app origin during local dev.
    // (In production, replace with your deployed frontend origin.)
    const allowedMessageOrigins = ['http://localhost:5173'];

    const messageListener = event => {
      console.log('📨 Message received from:', event.origin, event.data);

      // Basic origin check — avoid accepting tokens from unknown pages
      if (!allowedMessageOrigins.includes(event.origin)) return;

      const { token } = event.data || {};
      if (token) {
        // Store the token to authenticate subsequent requests
        localStorage.setItem('token', token);

        // Clean up listener as soon as we’re done to avoid leaks
        window.removeEventListener('message', messageListener);

        // Optional: close popup after success (if the flow doesn’t already)
        try {
          popup.close();
        } catch {}
        navigate('/welcome');
      }
    };

    // Note: we only add the listener right when starting OAuth
    window.addEventListener('message', messageListener);
  };

  // ---- Email/password submit ----
  // Keep the handler small: validate on the backend, surface readable errors.
  const handleSubmit = async e => {
    e.preventDefault();

    const endpoint =
      mode === 'signup'
        ? 'http://127.0.0.1:8000/api/register'
        : 'http://127.0.0.1:8000/api/login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      // Keep logs during dev to see status + raw body (helps when backend returns text)
      console.log('Response status:', response.status);
      const text = await response.text();
      console.log('Raw response:', text);

      if (!response.ok) {
        // Show a friendly message while preserving status context
        throw new Error(
          `${mode === 'signup' ? 'Signup' : 'Login'} failed (${
            response.status
          }): ${text}`
        );
      }

      // Some backends return text; parse only after ok
      const data = JSON.parse(text);
      localStorage.setItem('token', data.token);

      // Simple success path: push to a welcome screen
      navigate('/welcome');
    } catch (err) {
      // Don’t swallow errors — show something the user can act on
      console.error('Error in auth:', err);
      alert(err.message);
    }
  };

  return (
    <div className='w-full max-w-sm px-6 py-8 shadow-lg rounded-2xl border border-white'>
      {/* Compact brand header; small image keeps first paint snappy */}
      <div className='flex justify-center mb-6'>
        <img
          src={logo}
          alt='SpellingBeezLogo'
          className='w-24 h-24 object-contain'
        />
      </div>

      {/* Google button first — reduces friction for most users */}
      <button
        onClick={handleOauthLogin}
        className='w-full py-3 text-black rounded-xl font-light flex items-center justify-center gap-2'
        style={{
          backgroundColor: '#F8E090',
          borderRadius: '50px',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f6d770')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F8E090')}
      >
        <FcGoogle size={20} />
        <span>
          {mode === 'signup' ? 'Sign up with Google' : 'Log in with Google'}
        </span>
      </button>

      {/* Divider helps users understand there are two sign-in options */}
      <div className='flex items-center my-6'>
        <hr className='flex-1 border-gray-200' />
        <span className='px-2 text-gray-400 text-sm'>or use Email</span>
        <hr className='flex-1 border-gray-200' />
      </div>

      {/* Minimal form; HTML5 validation + controlled inputs for reliable state */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Email input — required to keep payload clean for backend */}
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className='w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none'
        />

        {/* Password with toggle; avoid revealing by default */}
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className='w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none'
          />
          <div
            className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500'
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </div>
        </div>

        {/* Primary CTA — nothing fancy: clear label + hover state */}
        <button
          type='submit'
          className='w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800'
        >
          {mode === 'signup' ? 'Sign Up' : 'Log In'}
        </button>
      </form>

      {/* Gentle legal + routing cues below the fold; copy is short and neutral */}
      {mode === 'signup' ? (
        <div className='mt-4 text-center text-sm text-gray-600 space-y-2'>
          <p className='text-xs text-gray-500 leading-relaxed px-2'>
            By signing up, you agree to our{' '}
            <a
              href='/privacy-policy'
              className='text-black underline hover:text-gray-800'
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href='/terms-of-service'
              className='text-black underline hover:text-gray-800'
            >
              Terms of Service
            </a>
            .
          </p>

          <p>
            Already a member?{' '}
            <a href='/login' className='text-black font-medium'>
              Log In
            </a>
          </p>
        </div>
      ) : (
        <p className='text-center mt-4 text-sm text-gray-600'>
          Are you a Newbie?{' '}
          <a href='/' className='text-black font-medium'>
            GET STARTED - IT'S FREE
          </a>
        </p>
      )}
    </div>
  );
}
