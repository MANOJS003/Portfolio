import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Testing = () => {
    const [testResults, setTestResults] = useState([]);
    const [error, setError] = useState('');
    const [isTesting, setIsTesting] = useState(false);

    const runTests = async () => {
        setIsTesting(true);
        setError('');
        setTestResults([]);

        try {
            // Test 1: Firestore Read
            const commentsRef = collection(db, 'portfolio-comments');
            const querySnapshot = await getDocs(commentsRef);
            setTestResults(prev => [...prev, {
                test: 'Firestore Read Test',
                result: 'Success',
                details: `Found ${querySnapshot.size} comments`
            }]);

            // Test 2: Firestore Write
            const testComment = {
                content: 'Test comment from testing page',
                userName: 'Test User',
                createdAt: serverTimestamp()
            };
            const docRef = await addDoc(commentsRef, testComment);
            setTestResults(prev => [...prev, {
                test: 'Firestore Write Test',
                result: 'Success',
                details: `Document ID: ${docRef.id}`
            }]);

            // Test 3: Storage Upload
            const storageRef = ref(storage, 'test-image.jpg');
            // Create a test blob
            const blob = new Blob(['test'], { type: 'text/plain' });
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);
            setTestResults(prev => [...prev, {
                test: 'Storage Upload Test',
                result: 'Success',
                details: `URL: ${url}`
            }]);

            setTestResults(prev => [...prev, {
                test: 'Overall Test Result',
                result: 'All tests passed successfully',
                details: 'All Firebase services are working correctly'
            }]);

        } catch (err) {
            setError(err.message);
            setTestResults(prev => [...prev, {
                test: 'Error',
                result: 'Failed',
                details: err.message
            }]);
        } finally {
            setIsTesting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030014] p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Firebase Testing Page</h1>
            
            <div className="space-y-4">
                <button
                    onClick={runTests}
                    disabled={isTesting}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                    {isTesting ? 'Running Tests...' : 'Run Tests'}
                </button>

                {error && (
                    <div className="bg-red-500/20 p-4 rounded-lg mb-4">
                        <p className="text-red-400">Error: {error}</p>
                    </div>
                )}

                <div className="space-y-4">
                    {testResults.map((result, index) => (
                        <div key={index} className="p-4 rounded-lg" style={{
                            backgroundColor: result.result === 'Success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                        }}>
                            <h3 className={`font-semibold mb-2 ${result.result === 'Success' ? 'text-green-400' : 'text-red-400'}`}>
                                {result.test}
                            </h3>
                            <p className="text-gray-400">{result.details}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testing;
