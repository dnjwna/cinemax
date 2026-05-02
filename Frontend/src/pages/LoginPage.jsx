import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
 
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    setLoading(true);
    setError("");
 
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Email atau password salah.");
      } else {
        setError("Terjadi kesalahan server.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          CINE<span style={styles.accent}>MAX</span>
        </div>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to continue watching</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={styles.input}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.btn}>
            Sign In
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#141414',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #2a2a2a',
  },
  logo: { fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '24px', textAlign: 'center' },
  accent: { color: '#E50914' },
  title: { fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '6px', textAlign: 'center' },
  subtitle: { color: '#888', fontSize: '14px', textAlign: 'center', marginBottom: '28px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', color: '#ccc', fontWeight: '500' },
  input: {
    backgroundColor: '#2a2a2a',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '12px 14px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
  },
  error: {
    backgroundColor: 'rgba(229,9,20,0.15)',
    border: '1px solid rgba(229,9,20,0.3)',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#ff6b6b',
    fontSize: '13px',
  },
  btn: {
    backgroundColor: '#E50914',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '13px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '4px',
  },
  footer: { textAlign: 'center', color: '#888', fontSize: '13px', marginTop: '20px' },
  link: { color: '#E50914', textDecoration: 'none', fontWeight: '600' },
  hint: { textAlign: 'center', color: '#555', fontSize: '12px', marginTop: '12px' },
}

