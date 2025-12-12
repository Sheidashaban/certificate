import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CertificatePage() {
  const router = useRouter();
  const { id, token } = router.query;
  const [certificateData, setCertificateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [autoPosting, setAutoPosting] = useState(false);
  const [imageUrlCopied, setImageUrlCopied] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCertificateData();
    }
  }, [id]);

  // Auto-post if token is present (from OAuth callback)
  useEffect(() => {
    if (token && id && certificateData && !sharing && !shareSuccess && !autoPosting) {
      setAutoPosting(true);
      handleAutoPost(token as string);
    }
  }, [token, id, certificateData, sharing, shareSuccess, autoPosting]);

  const fetchCertificateData = async () => {
    try {
      const response = await fetch(`/api/certificates/data/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCertificateData(data);
      }
    } catch (error) {
      console.error('Error fetching certificate data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoPost = async (accessToken: string) => {
    if (!id || typeof window === 'undefined') return;

    setSharing(true);
    setShareError(null);

    try {
      const certificateUrl = `${window.location.origin}/certificate/${id}`;
      const certificateImageUrl = `${window.location.origin}/api/certificates/${id}`;
      const shareText = certificateData 
        ? `I'm excited to share my certificate from AI Tech Institute! 🎓\n\nI successfully completed ${certificateData.course_name}.\n\nView my certificate: ${certificateUrl}`
        : `I'm excited to share my certificate from AI Tech Institute! 🎓\n\nView my certificate: ${certificateUrl}`;

      console.log('🔄 Attempting to post certificate to LinkedIn...');
      console.log('📋 Certificate URL:', certificateUrl);
      console.log('🖼️ Image URL:', certificateImageUrl);

      const response = await fetch('/api/certificates/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          certificateUrl,
          text: shareText,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setShareSuccess(true);
        setShareError(null);
        console.log('✅ Certificate posted to LinkedIn successfully!', result);
        
        // Remove token from URL for security
        router.replace(`/certificate/${id}`, undefined, { shallow: true });
      } else {
        console.error('❌ LinkedIn API error:', result);
        // If API fails, offer fallback to Share URL method
        const errorMsg = result.error || 'Failed to post to LinkedIn';
        throw new Error(`${errorMsg}. You can try using the Share URL method instead.`);
      }
    } catch (error: any) {
      console.error('❌ LinkedIn posting failed:', error);
      const errorMsg = error.message || 'Failed to post certificate to LinkedIn';
      setShareError(errorMsg);
      setShareSuccess(false);
      
      // Offer fallback option
      console.log('💡 Consider using LinkedIn Share URL as fallback');
    } finally {
      setSharing(false);
      setAutoPosting(false);
    }
  };

  const handleLinkedInShare = () => {
    if (!id || typeof window === 'undefined') return;

    setSharing(true);
    setShareError(null);

    // Use LinkedIn Share URL method - works immediately, no OAuth approval needed
    // This opens LinkedIn's share dialog where user can write their own message
    const certificateUrl = `${window.location.origin}/certificate/${id}`;
    const certificateImageUrl = `${window.location.origin}/api/certificates/${id}`;
    
    // LinkedIn Share URL - LinkedIn will try to fetch Open Graph tags from the URL
    // Note: For localhost, LinkedIn can't access the image, so user should attach image manually
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateUrl)}`;
    
    // Open LinkedIn share dialog in new window
    const shareWindow = window.open(linkedinShareUrl, '_blank', 'width=600,height=700');
    
    if (!shareWindow) {
      setShareError('Popup blocked. Please allow popups for this site and try again.');
      setSharing(false);
      return;
    }

    // Show instructions for localhost
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalhost) {
      setShareError('Note: Since you\'re using localhost, LinkedIn can\'t fetch the certificate image automatically. After writing your post, click the image icon in LinkedIn\'s share dialog to attach the certificate image manually.');
    }

    // Show success message
    setTimeout(() => {
      setShareSuccess(true);
      setSharing(false);
    }, 1000);
  };

  const handleShare = () => {
    handleLinkedInShare();
  };

  const copyImageUrl = () => {
    if (!id || typeof window === 'undefined') return;
    const imageUrl = `${window.location.origin}/api/certificates/${id}`;
    navigator.clipboard.writeText(imageUrl).then(() => {
      setImageUrlCopied(true);
      setTimeout(() => setImageUrlCopied(false), 3000);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = imageUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setImageUrlCopied(true);
      setTimeout(() => setImageUrlCopied(false), 3000);
    });
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <p>Loading certificate...</p>
      </div>
    );
  }

  const certificateImageUrl = id ? `/api/certificates/${id}` : '';
  const certificatePageUrl = id ? `${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/certificate/${id}` : '';

  return (
    <>
      <Head>
        <title>Certificate - AI Tech Institute</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {certificateData && certificateImageUrl && (
          <>
            <meta property="og:title" content={`Certificate: ${certificateData.course_name} - ${certificateData.student_name}`} />
            <meta property="og:description" content={`${certificateData.student_name} successfully completed ${certificateData.course_name} from AI Tech Institute`} />
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')}${certificateImageUrl}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="800" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:secure_url" content={`${process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')}${certificateImageUrl}`} />
            <meta property="og:url" content={certificatePageUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="AI Tech Institute" />
            {/* LinkedIn specific */}
            <meta name="linkedin:owner" content="AI Tech Institute" />
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`Certificate: ${certificateData.course_name}`} />
            <meta name="twitter:description" content={`${certificateData.student_name} completed ${certificateData.course_name}`} />
            <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')}${certificateImageUrl}`} />
          </>
        )}
      </Head>
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.certificateContainer}>
            {certificateImageUrl && (
              <img
                src={certificateImageUrl}
                alt="Certificate"
                style={styles.certificateImage}
              />
            )}
          </div>

          <div style={styles.actions}>
            <a
              href={certificateImageUrl}
              download={`certificate-${id}.png`}
              style={styles.downloadButton}
            >
              Download Certificate
            </a>

            <button
              onClick={handleShare}
              disabled={sharing}
              style={{
                ...styles.shareButton,
                ...(sharing ? styles.shareButtonDisabled : {}),
              }}
            >
              {sharing ? 'Posting to LinkedIn...' : 'Share on LinkedIn'}
            </button>
          </div>

          {shareSuccess && (
            <div style={styles.successMessage}>
              ✅ LinkedIn share window opened! 
              <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
                <strong>Important:</strong> Since you're using localhost, LinkedIn can't automatically fetch the certificate image.
                <br />
                <strong>To include the certificate image:</strong>
                <ol style={{ textAlign: 'left', display: 'inline-block', marginTop: '10px', marginBottom: '10px' }}>
                  <li>Write your message in the LinkedIn dialog</li>
                  <li>Click the <strong>image icon</strong> (📷) in the LinkedIn share box</li>
                  <li>Paste the image URL (click button below to copy)</li>
                  <li>Or download the certificate and upload it directly</li>
                  <li>Click "Post" to share</li>
                </ol>
                <button
                  onClick={copyImageUrl}
                  style={{
                    ...styles.copyButton,
                    ...(imageUrlCopied ? styles.copyButtonSuccess : {}),
                  }}
                >
                  {imageUrlCopied ? '✅ Image URL Copied!' : '📋 Copy Image URL'}
                </button>
                <div style={{ marginTop: '5px', fontSize: '0.85em', color: '#666' }}>
                  URL: <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '3px', fontSize: '0.9em' }}>{typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/api/certificates/{id}</code>
                </div>
              </div>
            </div>
          )}

          {shareError && (
            <div style={styles.errorMessage}>
              ❌ {shareError}
              {shareError.includes('OAuth') && (
                <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
                  <p>To enable LinkedIn sharing, please configure LinkedIn OAuth credentials in your .env file.</p>
                </div>
              )}
              {!shareError.includes('OAuth') && (
                <div style={{ marginTop: '10px' }}>
                  <button
                    onClick={() => {
                      const certificateUrl = typeof window !== 'undefined' ? `${window.location.origin}/certificate/${id}` : '';
                      const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateUrl)}`;
                      window.open(linkedinShareUrl, '_blank', 'width=600,height=400');
                    }}
                    style={styles.fallbackButton}
                  >
                    Try Manual Share Instead
                  </button>
                </div>
              )}
            </div>
          )}

          {autoPosting && (
            <div style={styles.infoMessage}>
              🔄 Automatically posting your certificate to LinkedIn...
            </div>
          )}

          {certificateData && (
            <div style={styles.info}>
              <p>
                <strong>Student:</strong> {certificateData.student_name}
              </p>
              <p>
                <strong>Course:</strong> {certificateData.course_name}
              </p>
              <p>
                <strong>Year:</strong> {certificateData.year}
              </p>
            </div>
          )}
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
    background: '#f5f5f5',
    padding: '20px',
  },
  container: {
    background: 'white',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    maxWidth: '1200px',
    width: '100%',
  },
  certificateContainer: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  certificateImage: {
    maxWidth: '100%',
    height: 'auto',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  actions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap' as const,
  },
  downloadButton: {
    padding: '12px 24px',
    backgroundColor: '#2C3E50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  shareButton: {
    padding: '12px 24px',
    backgroundColor: '#0077B5',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  shareButtonSuccess: {
    backgroundColor: '#28a745',
  },
  successMessage: {
    padding: '15px',
    backgroundColor: '#D4EDDA',
    color: '#155724',
    borderRadius: '5px',
    textAlign: 'center' as const,
    marginBottom: '20px',
  },
  errorMessage: {
    padding: '15px',
    backgroundColor: '#F8D7DA',
    color: '#721C24',
    borderRadius: '5px',
    textAlign: 'center' as const,
    marginBottom: '20px',
  },
  infoMessage: {
    padding: '15px',
    backgroundColor: '#D1ECF1',
    color: '#0C5460',
    borderRadius: '5px',
    textAlign: 'center' as const,
    marginBottom: '20px',
  },
  shareButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  fallbackButton: {
    padding: '8px 16px',
    backgroundColor: '#0077B5',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9em',
    marginTop: '10px',
  },
  copyButton: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9em',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  copyButtonSuccess: {
    backgroundColor: '#155724',
  },
  info: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    textAlign: 'center' as const,
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontSize: '1.2rem',
    color: '#7F8C8D',
  },
};

