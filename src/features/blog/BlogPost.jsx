import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { blogPosts } from './blogData';
import heroBg from '../../assets/raw/Restaurante-Venta-El-Gallo-Alhambra-de-Granada-1-1.jpg';

const BlogPost = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug);
    if (!foundPost) {
      navigate('/blog');
      return;
    }
    setPost(foundPost);
    
    // Smooth scroll to top
    window.scrollTo(0, 0);

    // Dynamic SEO Meta tags injection
    document.title = `${foundPost.title} | Venta El Gallo`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", foundPost.excerpt);

    // Inyectar Schema.org JSON-LD estructurado
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'blog-schema';
    schemaScript.innerText = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": foundPost.title,
      "description": foundPost.excerpt,
      "author": {
        "@type": "Organization",
        "name": foundPost.author
      },
      "datePublished": "2026-08-10T08:00:00+08:00", // Placeholder if we had actual strict iso dates
      "keywords": foundPost.seoKeywords.join(", ")
    });
    
    // Clean up old schema if exists
    const oldSchema = document.getElementById('blog-schema');
    if (oldSchema) oldSchema.remove();
    document.head.appendChild(schemaScript);

    return () => {
      // Cleanup on unmount
      if (schemaScript.parentNode) {
        schemaScript.remove();
      }
    };
  }, [slug, navigate]);

  if (!post) return null;

  return (
    <div className="fade-in flex flex-col min-h-screen bg-[#faf9f6]">
      {/* Cinematic Header para contraste del Navbar */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <img src={heroBg} alt={post.title} className="w-full h-[120%] object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-deep-black/40 to-deep-black/90"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative z-10 text-center flex flex-col items-center mt-20 px-4 max-w-4xl"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gold/80 font-medium uppercase tracking-widest mb-6">
            <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-2"><User size={14} /> {post.author}</span>
            <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime} lectura</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 drop-shadow-xl leading-tight">
            {post.title}
          </h1>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-3xl py-16">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-sacromonte-red font-bold uppercase tracking-widest text-xs mb-10 hover:text-gold transition-colors"
        >
          <ArrowLeft size={14} /> Volver al Blog
        </Link>
        
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div 
            className="w-full text-deep-black"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.seoKeywords.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-500 font-medium tracking-wide">
                  #{keyword}
                </span>
              ))}
            </div>
          </footer>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPost;
