import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CertificatePage() {
  const router = useRouter();
  const { id } = router.query;
  const [certificateData, setCertificateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCertificateData();
    }
  }, [id]);

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

  const handleLinkedInShare = () => {
    if (!id || typeof window === 'undefined') return;

    // Use LinkedIn Share URL - simpler, works immediately, no approval needed
    const certificateUrl = `${window.location.origin}/certificate/${id}`;
    const certificateImageUrl = `${window.location.origin}/api/certificates/${id}`;
    
    // LinkedIn Share URL - opens LinkedIn's share dialog
    // Include summary and source for better preview
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateUrl)}`;
    
    // Open in new window
    window.open(linkedinShareUrl, '_blank', 'width=600,height=400');
  };

  const handleShare = () => {
    // Use simple LinkedIn Share URL method - works immediately, no OAuth needed
    handleLinkedInShare();
    setShareSuccess(true);
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <p>Loading certificate...</p>
      </div>
    );
  }

  const certificateUrl = id ? `/api/certificates/${id}` : '';

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
              style={styles.shareButton}
            >
              Share on LinkedIn
            </button>
          </div>

          {shareSuccess && (
            <div style={styles.successMessage}>
              LinkedIn share window opened! Write your message and click "Post" to share your certificate.
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

