import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Admin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    studentName: '',
    courseName: '',
    instructorName: '',
    year: new Date().getFullYear(),
    studentEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{ certificateUrl: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(null);

    try {
      const response = await fetch('/api/certificates/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Server error: ${response.status}. Check the server terminal for details.`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to generate certificate');
      }

      setSuccess({ certificateUrl: data.certificate.url });
      
      // Show email status
      if (data.emailSent === false) {
        setError(`Certificate generated, but email failed to send: ${data.emailError || 'Unknown error'}. Check server terminal for details.`);
      }
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred. Please check the server terminal for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Generate Certificate - AI Tech Institute</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>Generate Certificate</h1>
          
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          {success && (
            <div style={styles.success}>
              <h3>Certificate Generated Successfully!</h3>
              <p>Certificate URL: <a href={success.certificateUrl} target="_blank" rel="noopener noreferrer">{success.certificateUrl}</a></p>
              <p style={{marginTop: '10px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px', color: '#856404'}}>
                <strong>Note:</strong> Check the server terminal (PowerShell window) for email sending status. 
                If email failed, verify your email configuration in the .env file.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="studentName" style={styles.label}>
                Student Name *
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="John Doe"
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="courseName" style={styles.label}>
                Course Name *
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="AI Foundations"
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="instructorName" style={styles.label}>
                Instructor Name *
              </label>
              <input
                type="text"
                id="instructorName"
                name="instructorName"
                value={formData.instructorName}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Dr. Jane Smith"
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="year" style={styles.label}>
                Year *
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                style={styles.input}
                min="2020"
                max="2100"
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="studentEmail" style={styles.label}>
                Student Email *
              </label>
              <input
                type="email"
                id="studentEmail"
                name="studentEmail"
                value={formData.studentEmail}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="student@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
              }}
            >
              {loading ? 'Generating...' : 'Generate Certificate'}
            </button>
          </form>

          <a href="/" style={styles.backLink}>
            ← Back to Home
          </a>
        </div>
      </main>
    </>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  container: {
    background: 'white',
    borderRadius: '10px',
    padding: '40px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    fontSize: '2rem',
    color: '#2C3E50',
    marginBottom: '30px',
    textAlign: 'center' as const,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#34495E',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #BDC3C7',
    borderRadius: '5px',
    fontSize: '1rem',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '15px',
    backgroundColor: '#0077B5',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#95A5A6',
    cursor: 'not-allowed',
  },
  error: {
    padding: '15px',
    backgroundColor: '#F8D7DA',
    color: '#721C24',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  success: {
    padding: '15px',
    backgroundColor: '#D4EDDA',
    color: '#155724',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  backLink: {
    display: 'block',
    marginTop: '20px',
    textAlign: 'center' as const,
    color: '#0077B5',
    textDecoration: 'none',
  },
};

