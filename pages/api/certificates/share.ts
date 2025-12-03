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

    if (!accessToken || !certificateUrl) {
      return res.status(400).json({ error: 'Access token and certificate URL are required' });
    }

    // Get user profile to verify token
    const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Share on LinkedIn using UGC Posts API
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

    return res.status(200).json({
      success: true,
      postId: shareResponse.data.id,
      message: 'Certificate shared successfully on LinkedIn!',
    });
  } catch (error: any) {
    console.error('LinkedIn share error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Failed to share on LinkedIn',
      details: error.response?.data || error.message,
    });
  }
}

