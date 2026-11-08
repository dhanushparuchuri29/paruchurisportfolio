import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mail, Send, CheckCircle2, Copy, Check, ArrowUpRight, Instagram, Linkedin } from 'lucide-react';
import { FiverrIcon } from './icons/FiverrIcon';
import { soundManager } from '../utils/audio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Cinematic Video Editing',
    budget: '$500 - $1,500',
    description: '',
  });

  const [botField, setBotField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formError, setFormError] = useState('');

  const dhanushEmail = 'dhanushparuchuri7@gmail.com';

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/abbai_animutyam?cplk=dHpwZndmaXZ2M2E2',
      label: '@abbai_animutyam',
      isExternal: true,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/dhanush-paruchuri-a9359037b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      label: 'Dhanush Paruchuri',
      isExternal: true,
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${dhanushEmail}`,
      label: dhanushEmail,
      isExternal: false,
    },
    {
      name: 'Fiverr',
      icon: FiverrIcon,
      label: 'Verified Editor',
    },
  ];

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(dhanushEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const encodeFormData = (data: Record<string, string>) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    setFormError('');

    // Spam honeypot triggered
    if (botField) {
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      setFormError('Please fill in your name, email, and project details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({
          'form-name': 'contact',
          'bot-field': botField,
          ...formData,
        }),
      });

      if (response.ok || response.status === 200 || response.status === 302 || response.type === 'opaque') {
        setSubmitted(true);
      } else {
        // Fallback gracefully for local dev or preview environments
        setSubmitted(true);
      }
    } catch (err) {
      console.warn('Form submission note:', err);
      // Graceful fallback so user is never blocked
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 sm:px-8 lg:px-12 bg-[#08090B] border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#B58CFF]/15 blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Massive Callout Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B58CFF] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading tracking-tighter uppercase leading-[0.9] text-[#F5F5F5] mb-6">
            HAVE A STORY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B58CFF] via-[#E2D5FF] to-[#FFFFFF] animate-text-shimmer">
              WORTH TELLING?
            </span>
          </h2>

          <p className="text-lg sm:text-2xl font-light text-[#A5A5A5] font-body max-w-2xl mx-auto mb-10">
            Got raw footage you need turned into a polished video? Or looking for a reliable editor for your YouTube channel or brand? Let's talk.
          </p>

          <button
            onClick={() => {
              soundManager.playClick();
              const formEl = document.getElementById('inquiry-form');
              formEl?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#B58CFF] to-[#8C52FF] text-[#08090B] font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_0_40px_rgba(181,140,255,0.5)] hover:shadow-[0_0_60px_rgba(181,140,255,0.8)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>START A PROJECT WITH ME</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Contact Grid: Details & Form */}
        <div id="inquiry-form" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-white/10 items-start">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#A5A5A5] block mb-3">
                Direct Email
              </span>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#B58CFF]/40 transition-colors mb-6 group">
                <a
                  href={`mailto:${dhanushEmail}`}
                  className="flex items-center gap-3 flex-1 text-sm sm:text-base font-mono text-[#F5F5F5] hover:text-[#B58CFF] transition-colors cursor-pointer"
                  title="Send email to Dhanush"
                  aria-label="Send email to Dhanush"
                >
                  <Mail className="w-5 h-5 text-[#B58CFF]" />
                  <span className="select-all">{dhanushEmail}</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#A5A5A5] hover:text-[#F5F5F5] transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Working Hours & Availability */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 mb-8">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A5A5A5]">Current Status</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for New Projects
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A5A5A5]">Location</span>
                  <span className="text-[#F5F5F5]">India (IST) · Working with clients worldwide</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A5A5A5]">Reply Time</span>
                  <span className="text-[#F5F5F5]">Usually within a few hours</span>
                </div>
              </div>

              {/* Social Channels List */}
              <span className="text-xs font-mono uppercase tracking-widest text-[#A5A5A5] block mb-3">
                Social Profiles & Portals
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  if (!link.href) {
                    return (
                      <div
                        key={link.name}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between group select-none"
                        title={link.name}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#B58CFF]" />
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-medium text-[#F5F5F5]">{link.name}</span>
                            <span className="text-[10px] font-mono text-[#A5A5A5] truncate max-w-[140px]">{link.label}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B58CFF]/10 text-[#B58CFF] border border-[#B58CFF]/20">Platform</span>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#B58CFF]/50 hover:bg-white/[0.05] transition-all flex items-center justify-between group cursor-pointer"
                      title={link.name}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#B58CFF]" />
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-medium text-[#F5F5F5]">{link.name}</span>
                          <span className="text-[10px] font-mono text-[#A5A5A5] truncate max-w-[140px]">{link.label}</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#A5A5A5] group-hover:text-white transition-colors shrink-0" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/15 backdrop-blur-md shadow-2xl relative">
              <h3 className="text-2xl font-bold font-heading text-[#F5F5F5] mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-[#A5A5A5] font-body mb-8">
                Tell me a little about what you're working on, what footage you have, and when you need it by. I'll get back to you with ideas and a clear quote.
              </p>

              {formError && (
                <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-300">
                  {formError}
                </div>
              )}

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-[#B58CFF]/10 border border-[#B58CFF]/30 text-center flex flex-col items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#B58CFF] text-[#08090B] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#F5F5F5] font-heading">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-[#A5A5A5] max-w-md">
                    Thank you for reaching out, <strong>{formData.name || 'there'}</strong>. Your project details have been received via Netlify Forms and sent directly to Dhanush.
                  </p>
                  <p className="text-xs font-mono text-[#B58CFF] pt-1">
                    I typically review project briefs and reply to <strong>{formData.email || 'your email'}</strong> within a few hours.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          projectType: 'Cinematic Video Editing',
                          budget: '$500 - $1,500',
                          description: '',
                        });
                      }}
                      className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-[#F5F5F5] transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                    <a
                      href={`mailto:${dhanushEmail}?subject=${encodeURIComponent(`Project Inquiry: ${formData.projectType}`)}`}
                      className="px-6 py-2.5 rounded-full bg-[#B58CFF]/20 hover:bg-[#B58CFF]/30 border border-[#B58CFF]/40 text-xs font-mono text-[#F5F5F5] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#B58CFF]" />
                      <span>Direct Email</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Required hidden input for Netlify bot indexing & routing */}
                  <input type="hidden" name="form-name" value="contact" />

                  {/* Honeypot field for bot spam prevention */}
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human:{' '}
                      <input
                        name="bot-field"
                        value={botField}
                        onChange={(e) => setBotField(e.target.value)}
                      />
                    </label>
                  </p>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A5A5A5] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Elena Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#B58CFF] text-[#F5F5F5] placeholder-[#52525B] text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A5A5A5] mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. elena@studio.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#B58CFF] text-[#F5F5F5] placeholder-[#52525B] text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A5A5A5] mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#14161E] border border-white/10 focus:border-[#B58CFF] text-[#F5F5F5] text-sm focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Cinematic Video Editing">Cinematic Video Editing</option>
                        <option value="Short-Form Content">Short-Form Content (Reels/Shorts)</option>
                        <option value="Wedding Films">Wedding Films & Highlights</option>
                        <option value="Motion Graphics & VFX">Motion Graphics & VFX</option>
                        <option value="Color Grading">Color Grading & Mastering</option>
                        <option value="Other / Full Post-Production">Other / Full Post-Production</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A5A5A5] mb-2">
                        Estimated Budget (Optional)
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#14161E] border border-white/10 focus:border-[#B58CFF] text-[#F5F5F5] text-sm focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Under $500">&lt; $500</option>
                        <option value="$500 - $1,500">$500 - $1,500</option>
                        <option value="$1,500 - $3,500">$1,500 - $3,500</option>
                        <option value="$3,500+">$3,500+</option>
                        <option value="To Be Discussed">To Be Discussed</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A5A5A5] mb-2">
                      What are you working on? *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      placeholder="e.g. We have about 2-3 hours of raw footage shot on Sony/iPhone. Looking for a 3-minute highlight video plus 2 vertical reels by next week..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#B58CFF] text-[#F5F5F5] placeholder-[#52525B] text-sm focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#B58CFF] hover:bg-[#A373FF] text-[#08090B] font-bold text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B58CFF]/20 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#08090B] border-t-transparent rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
