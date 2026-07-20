import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from './blogData';
import heroBg from '../../assets/raw/Cueva-Venta-El-Gallo-6-Julio-7-1.jpg';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Dynamic SEO Meta tags for the index
    document.title = "Blog del Sacromonte | Venta El Gallo";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Descubre la historia del flamenco, la zambra gitana y la cultura del Sacromonte en el blog oficial de Venta El Gallo.");
    }
  }, []);

  return (
    <div className="fade-in flex flex-col min-h-screen bg-[#faf9f6]">
      {/* Cinematic Header para contraste del Navbar */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img src={heroBg} alt="Venta El Gallo Blog" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-deep-black/40 to-deep-black/90"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative z-10 text-center flex flex-col items-center mb-10 px-4"
        >
          <div className="w-px h-16 bg-gold drop-shadow-md mb-6"></div>
          <h1 className="text-5xl md:text-7xl font-serif text-white drop-shadow-2xl">
            Nuestro <span className="text-gold">Blog</span>
          </h1>
        </motion.div>
      </section>

      {/* Grid de Artículos */}
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <p className="text-gray-700 font-light text-lg md:text-xl leading-relaxed">
            Sumérgete en la cultura, historia y noticias del auténtico flamenco del Sacromonte.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 flex flex-col h-full border border-gray-100"
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4 uppercase tracking-wider font-semibold">
                  <span className="flex items-center gap-1"><Calendar size={12} className="text-gold" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={12} className="text-gold" /> {post.author}</span>
                </div>
                <h3 className="text-2xl font-serif mb-4 flex-grow text-deep-black leading-tight hover:text-sacromonte-red transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-600 font-light mb-8 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.slug}`} className="text-sacromonte-red uppercase tracking-widest text-xs font-black flex items-center gap-2 group w-fit">
                  Leer Más
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
