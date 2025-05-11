import { useState, useEffect } from 'react';
import { getResumeUrl } from '../services/firebaseResume';

export default function ResumeDownload() {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const url = await getResumeUrl();
        setResumeUrl(url);
      } catch (error) {
        console.error('Error fetching resume:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return <div className="text-white">Loading resume...</div>;
  }

  if (!resumeUrl) {
    return <div className="text-white">Resume not available</div>;
  }

  return (
    <div className="mt-4">
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download Resume
      </a>
    </div>
  );
}
