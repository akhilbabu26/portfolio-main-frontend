import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdEmail, MdSend, MdCheckCircle, MdError } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('http://localhost:8080/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-heading">Contact Me</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Quote */}
            <div className="glass rounded-2xl p-6 border border-blue-500/10">
              <p className="text-slate-300 italic leading-relaxed">
               ' I'm open to freelance work and full-time full-stack developer roles.
                 I specialize in building high-performance backends with Go (Gin) and modern, responsive frontends — let's build something amazing together.'
              </p>
            </div>

            {/* Contact links */}
            <div className="space-y-4">
              <ContactInfoItem
                icon={<MdEmail size={20} />}
                label="Email"
                value="akhilbabu.golang@gmail.com"
                href="mailto:akhilbabu.golang@gmail.com"
              />
              <ContactInfoItem
                icon={<FaWhatsapp size={18} />}
                label="WhatsApp"
                value="+91 8590223885"
                href="https://wa.me/918590223885?text=Hello%20I%20found%20your%20portfolio"
                color="#25D366"
              />
              <ContactInfoItem
                icon={<FaLinkedin size={18} />}
                label="LinkedIn"
                value="linkedin.com/in/akhilbabu"
                href="https://www.linkedin.com/in/akhilbabu26/"
                color="#0077B5"
              />
              <ContactInfoItem
                icon={<FaGithub size={18} />}
                label="GitHub"
                value="github.com/akhilbabu"
                href="https://github.com/akhilbabu26?tab=repositories"
              />
              <ContactInfoItem
                icon={<FaInstagram size={18} />}
                label="Instagram"
                value="https://www.instagram.com/akhil__0_0"
                href="https://www.instagram.com/akhil__0_0?igsh=MTg2N3RvMXp2am9nbw=="
              />
            </div>

            {/* Social icons row */}
            <div className="flex gap-3 pt-2">
              <a href="https://github.com/akhilbabu26?tab=repositories" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub size={20} /></a>
              <a href="https://www.linkedin.com/in/akhilbabu26/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin size={20} /></a>
              <a href="mailto:akhilbabu.golang@gmail.com" className="social-icon"><MdEmail size={20} /></a>
              <a href="https://wa.me/918590223885?text=Hello%20I%20found%20your%20portfolio" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#25D366' }}><FaWhatsapp size={20} /></a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-3xl p-8 md:p-10 border border-white/5 space-y-6"
          >
            <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Send a Message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-slate-400 text-sm mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-slate-400 text-sm mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="youremail@gmail.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-slate-400 text-sm mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows="6"
                value={form.message}
                onChange={handleChange}
                className="form-input resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full btn-primary justify-center text-base transition-all ${status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <MdSend size={18} />
                </>
              )}
            </button>

            {/* Success */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl text-emerald-400 border border-emerald-500/20"
                style={{ background: 'rgba(16,185,129,0.08)' }}
              >
                <MdCheckCircle size={22} />
                <span className="text-sm font-medium">Message sent! I'll get back to you soon.</span>
              </motion.div>
            )}

            {/* Error */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl text-red-400 border border-red-500/20"
                style={{ background: 'rgba(239,68,68,0.08)' }}
              >
                <MdError size={22} />
                <span className="text-sm font-medium">{errorMsg}</span>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const ContactInfoItem = ({ icon, label, value, href, color = '#60a5fa' }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all group"
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
      style={{ background: `${color}15`, color }}
    >
      {icon}
    </div>
    <div>
      <p className="text-slate-600 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-slate-200 text-sm font-medium group-hover:text-blue-400 transition-colors">{value}</p>
    </div>
  </a>
);

export default Contact;
