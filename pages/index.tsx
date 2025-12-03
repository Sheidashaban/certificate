import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Tech Institute - Certificate Generator</title>
        <meta name="description" content="Generate and share certificates for AI Tech Institute students" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>AI Tech Institute</h1>
          <h2 style={styles.subtitle}>Certificate Generator</h2>
          <p style={styles.description}>
            Generate professional certificates for your students and enable them to share on LinkedIn.
          </p>
          <Link href="/admin" style={styles.button}>
            Generate Certificate
          </Link>
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
    textAlign: 'center' as const,
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2C3E50',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#34495E',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.1rem',
    color: '#7F8C8D',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  button: {
    display: 'inline-block',
    padding: '15px 30px',
    backgroundColor: '#0077B5',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

