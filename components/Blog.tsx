import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Plus, Save, Trash2, Loader2, ArrowLeft, BookOpen, Edit3, ChevronDown, ChevronUp, Search } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../src/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, orderBy, query } from 'firebase/firestore';
import LoginModal from './LoginModal';
import { staticBlogs } from '../src/blogData';

interface DraftBlog {
  title: string;
  content: string;
  imageUrl: string;
}

interface BlogPost extends DraftBlog {
  id: string;
  date: string;
  createdAt?: any;
  category?: string;
  readTime?: string;
}

const Blog: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [blogs, setBlogs] = useState<BlogPost[]>(staticBlogs);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentDraft, setCurrentDraft] = useState<DraftBlog | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI Basics', 'Tech Explained', 'Business Insights', 'Prompt Engineering', 'Career & Trust'];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || (blog.category || 'AI Insights') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const faqs = [
    {
      question: "How does AI automation improve business efficiency?",
      answer: "AI automation streamlines repetitive tasks, reduces human error, and allows your team to focus on high-value strategic work. By implementing intelligent workflows, businesses can process data faster and make more informed decisions."
    },
    {
      question: "Is AI talent acquisition better than traditional methods?",
      answer: "AI-driven recruitment can analyze thousands of resumes in seconds, identifying the best candidates based on skills and cultural fit without bias. This significantly reduces time-to-hire and improves the quality of talent joining your organization."
    },
    {
      question: "What industries can benefit from Blyntic's AI solutions?",
      answer: "Blyntic's solutions are designed to be versatile. We work across finance, healthcare, retail, technology, and manufacturing sectors, tailoring our AI models to meet specific industry challenges and regulatory requirements."
    },
    {
      question: "How secure is my data when using AI automation?",
      answer: "Security is our top priority. We use enterprise-grade encryption and follow strict data privacy protocols (GDPR, SOC2) to ensure your business information remains confidential and protected at all times."
    }
  ];

  // Load blogs from Firebase
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(blogsQuery);
        const fetchedBlogs: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          fetchedBlogs.push({ id: doc.id, ...doc.data() } as BlogPost);
        });
        
        // Remove any static blog duplicates if they were manually saved to Firebase
        const fetchedIds = new Set(fetchedBlogs.map(b => b.id));
        const nonDuplicateStatic = staticBlogs.filter(b => !fetchedIds.has(b.id));
        setBlogs([...fetchedBlogs, ...nonDuplicateStatic]);
      } catch (error: any) {
        console.error("Error fetching blogs from Firebase:", error);
        // Fall back gracefully to static blogs since they are pre-initialized
        handleFirestoreError(error, OperationType.LIST, 'blogs');
      } finally {
        setIsLoadingBlogs(false);
      }
    };

    fetchBlogs();
    
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    
    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleCreateNew = () => {
    if (isLoggedIn) {
      setCurrentDraft({ title: '', content: '', imageUrl: '' });
      setIsCreating(true);
      setIsEditing(false);
      setEditingId(null);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setCurrentDraft({
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl
    });
    setIsEditing(true);
    setIsCreating(true);
    window.scrollTo(0, 0);
  };

  const handleSave = async () => {
    if (!currentDraft) return;
    setIsSaving(true);
    
    let safeImageUrl = currentDraft.imageUrl;

    try {
      if (isEditing && editingId) {
        const blogRef = doc(db, "blogs", editingId);
        await updateDoc(blogRef, {
          title: currentDraft.title,
          content: currentDraft.content,
          imageUrl: safeImageUrl
        });
        
        setBlogs(blogs.map(b => 
          b.id === editingId 
            ? { ...b, title: currentDraft.title, content: currentDraft.content, imageUrl: safeImageUrl } 
            : b
        ));
        
        setIsEditing(false);
        setEditingId(null);
      } else {
        const dateStr = new Date().toLocaleDateString();
        const newBlogData = {
          title: currentDraft.title,
          content: currentDraft.content,
          imageUrl: safeImageUrl,
          date: dateStr,
          createdAt: Timestamp.now()
        };
        
        const docRef = await addDoc(collection(db, "blogs"), newBlogData);
        
        const newBlog: BlogPost = {
          id: docRef.id,
          ...newBlogData
        };
        
        setBlogs([newBlog, ...blogs]);
      }
      
      setIsCreating(false);
      setCurrentDraft(null);
    } catch (error: any) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog to Firebase.");
      handleFirestoreError(error, isEditing ? OperationType.UPDATE : OperationType.CREATE, isEditing && editingId ? `blogs/${editingId}` : 'blogs');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (error: any) {
      console.error("Error deleting blog:", error);
      handleFirestoreError(error, OperationType.DELETE, `blogs/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
                Blyntic <span className="text-blue-600">Blog</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-gray-500 mt-2">Unlock Efficiency. Embrace AI Automation Solutions.</p>
            </Reveal>
          </div>
          
          <div className="flex items-center gap-4">
            {!isCreating && (
              <button 
                onClick={handleCreateNew}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                <Plus className="w-5 h-5" />
                Create Blog
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isCreating ? (
            <motion.div 
              key="create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => { setIsCreating(false); setCurrentDraft(null); }}
                className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to list
              </button>

              {currentDraft && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                    <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Blog' : 'Create New Blog'}</h2>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Title</label>
                      <input 
                        type="text" 
                        value={currentDraft.title}
                        onChange={(e) => setCurrentDraft({...currentDraft, title: e.target.value})}
                        className="w-full text-3xl font-bold border-b border-gray-200 focus:border-blue-500 p-2 outline-none transition-colors"
                        placeholder="Enter blog title..."
                      />
                    </div>
                    
                    <div className="relative aspect-video w-full rounded-[24px] overflow-hidden shadow-lg group">
                      {currentDraft.imageUrl ? (
                        <img src={currentDraft.imageUrl} alt="Blog Cover" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 font-medium">No Image Uploaded</span>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-3/4">
                          <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">Image URL</label>
                          <input
                            type="text"
                            value={currentDraft.imageUrl}
                            onChange={(e) => setCurrentDraft({ ...currentDraft, imageUrl: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-white/20 bg-black/60 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Content (Markdown)</label>
                      <textarea 
                        value={currentDraft.content}
                        onChange={(e) => setCurrentDraft({...currentDraft, content: e.target.value})}
                        placeholder="Paste your article here..."
                        className="w-full h-[400px] p-6 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button 
                      onClick={() => setCurrentDraft(null)}
                      className="px-8 py-4 rounded-full border border-gray-200 font-bold hover:bg-gray-50 transition-colors"
                    >
                      Discard
                    </button>
                    <button 
                      onClick={handleSave}
                      disabled={isSaving || !currentDraft.title.trim() || !currentDraft.content.trim()}
                      className="flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                      {isSaving ? 'Saving...' : 'Save Blog'}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <div className="space-y-12">
              {/* Search and Categories Bar */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search AI, Prompt Engineering, LLMs, Agents & Career guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm text-slate-800 shadow-sm transition-all"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 items-center">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <motion.div 
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredBlogs.length === 0 ? (
                  <div className="col-span-full py-20 text-center bg-gray-50 rounded-[32px] border border-dashed border-gray-300">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No guides or articles found matching your criteria. Try adjusting your search query!</p>
                  </div>
                ) : (
                  filteredBlogs.map((blog) => (
                    <motion.div 
                      key={blog.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={blog.imageUrl} 
                          alt={blog.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                          {isLoggedIn && (
                            <>
                              <button 
                                onClick={() => handleEdit(blog)}
                                className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(blog.id)}
                                className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                            {blog.category || 'AI Insights'}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">
                            {blog.readTime || '4 min read'}
                          </span>
                        </div>
                        
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>
                        
                        <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">
                          {blog.content.replace(/[#*`\-]/g, '').substring(0, 140).trim() + '...'}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                          <span className="text-xs text-slate-400 font-semibold">{blog.date}</span>
                          <a 
                            href={`#/blog/${blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} 
                            className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                          >
                            Read Article <Plus className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* FAQ Section */}
        <div className="mt-32 max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Frequently Asked Questions</h2>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-900">{faq.question}</span>
                    {openFaq === idx ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-8 pb-6 text-gray-600 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default Blog;
