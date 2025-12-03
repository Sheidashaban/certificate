import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.query;

  if (!code) {
    return res.redirect('/?error=linkedin_auth_failed');
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      null,
      {
        params: {
          grant_type: 'authorization_code',
          code: code as string,
          redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Parse state to get certificate ID
    const certificateId = state as string;

    // Store access token in session/cookie (in production, use secure session management)
    // For now, redirect with token in URL (not ideal for production)
    const shareUrl = `/certificate/${certificateId}?token=${access_token}`;
    
    return res.redirect(shareUrl);
  } catch (error: any) {
    console.error('LinkedIn OAuth error:', error);
    console.error('Error details:', error.response?.data || error.message);
    const errorDetails = error.response?.data || error.message;
    return res.redirect(`/?error=linkedin_auth_failed&details=${encodeURIComponent(JSON.stringify(errorDetails))}`);
  }
}

