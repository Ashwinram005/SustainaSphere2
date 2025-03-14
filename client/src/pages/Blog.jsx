import React, { useState, useEffect } from "react";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: "", content: "", type: "article", videoFile: null, document: null });
    const [activeTab, setActiveTab] = useState("article"); // Default tab is Articles

    // Load stored posts from localStorage on mount
    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(storedPosts);
    }, []);

    // Save posts to localStorage whenever posts change
    useEffect(() => {
        if (posts.length > 0) {
            localStorage.setItem("posts", JSON.stringify(posts));
        }
    }, [posts]);

    const handlePostUpload = () => {
        if (newPost.title && (newPost.content || newPost.videoFile || newPost.document)) {
            if (newPost.type === "video") {
                // Convert video to Base64 before saving
                const reader = new FileReader();
                reader.readAsDataURL(newPost.videoFile);
                reader.onloadend = () => {
                    const updatedPost = {
                        id: Date.now(),
                        title: newPost.title,
                        type: "video",
                        videoFile: reader.result, // Base64 video
                    };
                    const updatedPosts = [updatedPost, ...posts];
                    setPosts(updatedPosts);
                    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Save after setting state
                };
            } else if (newPost.type === "article") {
                // Store text article
                const updatedPost = {
                    id: Date.now(),
                    title: newPost.title,
                    type: "article",
                    content: newPost.content,
                };
                const updatedPosts = [updatedPost, ...posts];
                setPosts(updatedPosts);
                localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Save after setting state
            } else if (newPost.type === "Document") {
                // Convert PDF to Base64 before saving
                if (!newPost.document) {
                    alert("Please select a PDF file.");
                    return;
                }

                const reader = new FileReader();
                reader.readAsDataURL(newPost.document);
                reader.onloadend = () => {
                    console.log("Base64 PDF:", reader.result); // Debugging log
                    if (reader.result) {
                        const updatedPost = {
                            id: Date.now(),
                            title: newPost.title,
                            type: "Document",
                            document: reader.result, // Base64 PDF
                        };
                        const updatedPosts = [updatedPost, ...posts];
                        setPosts(updatedPosts);
                        localStorage.setItem("posts", JSON.stringify(updatedPosts));
                    } else {
                        alert("Failed to read the PDF file.");
                    }
                };
                reader.onerror = () => {
                    alert("Error reading the PDF file.");
                };
            } else {
                alert("Please fill all fields before posting.");
            }
            setNewPost({ title: "", content: "", type: "article", videoFile: null, document: null });
        } else {
            alert("Please fill all fields before posting.");
        }
    };

    const handleDelete = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-1/4 bg-white shadow-lg p-6">
                {/* <h2 className="text-2xl font-bold text-green-700">🌿 Greenwatch Blog</h2> */}
                <p className="mt-2 text-gray-600">Share your thoughts on sustainability.</p>

                <div className="mt-4">
                    {/* Input Field for Post Title */}
                    <input
                        type="text"
                        placeholder="Post Title"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />

                    {/* Dropdown for Post Type */}
                    <select
                        className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        value={newPost.type}
                        onChange={(e) => setNewPost({ ...newPost, type: e.target.value, content: "", videoFile: null, document: null })}
                    >
                        <option value="article">Article</option>
                        <option value="Document">Documents</option>
                        <option value="video">Video</option>
                    </select>

                    {/* Conditional Input Fields */}
                    {newPost.type === "article" && (
                        <textarea
                            placeholder="Write your article..."
                            className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 h-32"
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        />
                    )}

                    {newPost.type === "video" && (
                        <input
                            type="file"
                            accept="video/*"
                            className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            onChange={(e) => {
                                console.log("Selected video file:", e.target.files[0]); // Debugging log
                                setNewPost({ ...newPost, videoFile: e.target.files[0] });
                            }}
                        />
                    )}

                    {newPost.type === "Document" && (
                        <input
                            type="file"
                            accept=".pdf"
                            className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            onChange={(e) => {
                                console.log("Selected PDF file:", e.target.files[0]); // Debugging log
                                setNewPost({ ...newPost, document: e.target.files[0] });
                            }}
                        />
                    )}

                    {/* Post Button */}
                    <button
                        onClick={handlePostUpload}
                        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Post
                    </button>
                </div>
            </div>

            {/* Main Content with New Gradient Background */}
            <div
                className="w-3/4 p-6"
                style={{
                    background: "linear-gradient(135deg, #bfdbfe, #93c5fd)", // Soothing blue gradient
                }}
            >
                <h2 className="text-3xl font-semibold text-blue-700">📢 Community Posts</h2>

                {/* Tabs */}
                <div className="mt-4 flex gap-4 border-b">
                    <button
                        className={`py-2 px-4 text-white rounded-t-lg transition-all duration-300 ${
                            activeTab === "article"
                                ? "bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg"
                                : "bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700"
                        }`}
                        onClick={() => setActiveTab("article")}
                    >
                        Articles
                    </button>
                    <button
                        className={`py-2 px-4 text-white rounded-t-lg transition-all duration-300 ${
                            activeTab === "Document"
                                ? "bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg"
                                : "bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700"
                        }`}
                        onClick={() => setActiveTab("Document")}
                    >
                        Documents
                    </button>
                    <button
                        className={`py-2 px-4 text-white rounded-t-lg transition-all duration-300 ${
                            activeTab === "video"
                                ? "bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg"
                                : "bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700"
                        }`}
                        onClick={() => setActiveTab("video")}
                    >
                        Videos
                    </button>
                </div>

                {/* Content Display Based on Active Tab */}
                <div className="mt-4 grid grid-cols-2 gap-6">
                    {activeTab === "article" && (
                        posts.filter(post => post.type === "article").length > 0
                            ? posts.filter(post => post.type === "article").map((post) => (
                                <div key={post.id} className="bg-white p-4 shadow-md rounded-lg relative">
                                    <h3 className="text-lg font-bold text-blue-800">{post.title}</h3>
                                    <p className="mt-2 text-gray-700">{post.content}</p>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="absolute top-2 right-2 bg-white-500 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-300"
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))
                            : <p className="text-gray-500 col-span-2">No articles yet. Start by creating one!</p>
                    )}

                    {activeTab === "video" && (
                        posts.filter(post => post.type === "video").length > 0
                            ? posts.filter(post => post.type === "video").map((post) => (
                                <div key={post.id} className="bg-white p-4 shadow-md rounded-lg relative">
                                    <h3 className="text-lg font-bold text-blue-800">{post.title}</h3>
                                    <video className="w-full mt-2 rounded-lg shadow-md" controls>
                                        {post.videoFile ? (
                                            <source src={post.videoFile} type="video/mp4" />
                                        ) : null}
                                        Your browser does not support the video tag.
                                    </video>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="absolute top-2 right-2 bg-white-500 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-300"
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))
                            : <p className="text-gray-500 col-span-2">No videos yet. Start by uploading one!</p>
                    )}

                    {activeTab === "Document" && (
                        posts.filter(post => post.type === "Document").length > 0
                            ? posts.filter(post => post.type === "Document").map((post) => (
                                <div key={post.id} className="bg-white p-4 shadow-md rounded-lg relative">
                                    <h3 className="text-lg font-bold text-blue-800">{post.title}</h3>
                                    {post.document && (
                                        <iframe
                                            src={post.document}
                                            className="w-full mt-2 rounded-lg shadow-md"
                                            style={{ height: "500px" }} // Adjust height as needed
                                            title={post.title}
                                        >
                                            Your browser does not support PDFs.
                                        </iframe>
                                    )}
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="absolute top-2 right-2 bg-white-500 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-300"
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))
                            : <p className="text-gray-500 col-span-2">No Documents yet. Start by uploading one!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blog;