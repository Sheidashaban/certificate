import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { accessToken, certificateUrl, text } = req.body;

    console.log('🔄 LinkedIn share request received');
    console.log('📋 Certificate URL:', certificateUrl);
    console.log('📝 Text length:', text?.length || 0);

    if (!accessToken || !certificateUrl) {
      return res.status(400).json({ error: 'Access token and certificate URL are required' });
    }

    // Get user profile to verify token
    console.log('🔐 Verifying LinkedIn token...');
    const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('✅ Token verified, user ID:', profileResponse.data.sub);

    // Share on LinkedIn using UGC Posts API
    console.log('📤 Posting to LinkedIn...');
    const shareResponse = await axios.post(
      'https://api.linkedin.com/v2/ugcPosts',
      {
        author: `urn:li:person:${profileResponse.data.sub}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: text || `I'm excited to share my certificate from AI Tech Institute! 🎓\n\nView my certificate: ${certificateUrl}`,
            },
            shareMediaCategory: 'ARTICLE',
            media: [
              {
                status: 'READY',
                description: {
                  text: 'Certificate of Completion from AI Tech Institute',
                },
                originalUrl: certificateUrl,
                title: {
                  text: 'AI Tech Institute Certificate',
                },
              },
            ],
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ LinkedIn post successful!');
    console.log('📝 Post ID:', shareResponse.data.id);
    console.log('📋 Response:', JSON.stringify(shareResponse.data, null, 2));

    return res.status(200).json({
      success: true,
      postId: shareResponse.data.id,
      message: 'Certificate shared successfully on LinkedIn!',
    });
  } catch (error: any) {
    console.error('❌ LinkedIn share error:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    console.error('Error message:', error.message);
    
    // Provide more helpful error messages
    let errorMessage = 'Failed to share on LinkedIn';
    let errorDetails = error.response?.data || error.message;

    if (error.response?.status === 401) {
      errorMessage = 'LinkedIn authentication failed. Please try authorizing again.';
    } else if (error.response?.status === 403) {
      errorMessage = 'LinkedIn API access denied. Your app may need approval for posting permissions.';
    } else if (error.response?.status === 400) {
      errorMessage = 'Invalid request to LinkedIn API. Please check your certificate URL.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    return res.status(error.response?.status || 500).json({
      error: errorMessage,
      details: errorDetails,
      statusCode: error.response?.status || 500,
    });
  }
}

