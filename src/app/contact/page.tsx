'use client';

import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Headphones, 
  Users, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
}

interface ContactInfo {
  icon: any;
  title: string;
  details: string[];
  color: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo: ContactInfo[] = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: ['+1 (800) 555-SMART', 'Mon-Fri: 8AM-8PM EST', 'Sat-Sun: 9AM-5PM EST'],
      color: 'text-blue-400'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: ['support@smartbuildhub.com', 'sales@smartbuildhub.com', 'Response within 2 hours'],
      color: 'text-green-400'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      details: ['Available 24/7', 'Instant responses', 'Technical support'],
      color: 'text-purple-400'
    },
    {
      icon: MapPin,
      title: 'Visit Our Store',
      details: ['123 Industrial Blvd', 'SmartCity, ST 12345', 'Mon-Sat: 7AM-7PM'],
      color: 'text-orange-400'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'sales', label: 'Sales & Pricing' },
    { value: 'returns', label: 'Returns & Exchanges' },
    { value: 'partnership', label: 'Business Partnership' },
    { value: 'feedback', label: 'Feedback & Suggestions' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'general',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="bg-dark-light border-b border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions? We are here to help. Reach out to our expert team for support, 
              sales inquiries, or just to say hello.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-dark-light rounded-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className={`w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4 ${info.color}`}>
                <info.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
              <div className="space-y-1">
                {info.details.map((detail, idx) => (
                  <p key={idx} className={`text-sm ${idx === 0 ? 'font-semibold text-primary' : 'text-gray-400'}`}>
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-dark-light rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Send className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Send us a Message</h2>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-600/20 border border-green-600/40 rounded-lg p-4 mb-6 flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-green-400 font-semibold">Message sent successfully!</p>
                  <p className="text-sm text-green-300">We will get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-600/20 border border-red-600/40 rounded-lg p-4 mb-6 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-400 font-semibold">Failed to send message</p>
                  <p className="text-sm text-red-300">Please try again or contact us directly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none resize-none"
                  placeholder="Please provide detailed information about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-dark font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* FAQ Section */}
            <div className="bg-dark-light rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <MessageSquare className="h-6 w-6 text-primary mr-3" />
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    question: "What are your shipping options?",
                    answer: "We offer standard (5-7 days), express (2-3 days), and overnight shipping options."
                  },
                  {
                    question: "Do you offer bulk pricing for contractors?",
                    answer: "Yes! We provide special pricing for contractors and bulk orders. Contact our sales team for details."
                  },
                  {
                    question: "What is your return policy?",
                    answer: "We offer 30-day returns on most items in original condition. Professional tools have a 90-day warranty."
                  },
                  {
                    question: "Do you provide technical support?",
                    answer: "Yes, our expert technicians are available 24/7 to help with product selection and troubleshooting."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                    <h4 className="font-semibold text-primary mb-2">{faq.question}</h4>
                    <p className="text-gray-300 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-dark-light rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Clock className="h-6 w-6 text-primary mr-3" />
                Business Hours
              </h3>
              
              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', hours: '8:00 AM - 8:00 PM EST' },
                  { day: 'Saturday', hours: '9:00 AM - 5:00 PM EST' },
                  { day: 'Sunday', hours: '9:00 AM - 5:00 PM EST' },
                  { day: 'Holidays', hours: '10:00 AM - 4:00 PM EST' }
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-primary">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm text-primary font-medium">💡 Pro Tip</p>
                <p className="text-sm text-gray-300 mt-1">
                  For fastest response, use our live chat feature available 24/7 on any page!
                </p>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-600/30 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 flex items-center text-red-400">
                <Headphones className="h-6 w-6 mr-3" />
                Emergency Support
              </h3>
              <p className="text-gray-300 mb-4">
                Need urgent assistance with equipment failure or safety concerns?
              </p>
              <div className="space-y-2">
                <p className="text-lg font-bold text-red-400">📞 Emergency Hotline</p>
                <p className="text-2xl font-bold text-white">+1 (800) 555-HELP</p>
                <p className="text-sm text-gray-400">Available 24/7 for critical support</p>
              </div>
            </div>

            {/* Team Info */}
            <div className="bg-dark-light rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Users className="h-6 w-6 text-primary mr-3" />
                Our Expert Team
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Sarah Johnson', role: 'Sales Manager', specialty: 'Commercial Projects' },
                  { name: 'Mike Rodriguez', role: 'Technical Lead', specialty: 'Power Tools' },
                  { name: 'Lisa Chen', role: 'Customer Success', specialty: 'Order Support' },
                  { name: 'David Wilson', role: 'Product Expert', specialty: 'Electrical Systems' }
                ].map((member, index) => (
                  <div key={index} className="text-center p-3 bg-gray-800 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-dark font-bold text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm">{member.name}</h4>
                    <p className="text-xs text-gray-400">{member.role}</p>
                    <p className="text-xs text-primary">{member.specialty}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-dark-light rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Visit Our Showroom</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Sagarmatha Light Solution Headquarters</h4>
                  <p className="text-gray-300">123 Industrial Boulevard</p>
                  <p className="text-gray-300">SmartCity, ST 12345</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Showroom Hours</h4>
                  <p className="text-gray-300">Monday - Saturday: 7:00 AM - 7:00 PM</p>
                  <p className="text-gray-300">Sunday: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
              
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">🛠️ What You will Find</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Hands-on tool demonstrations</li>
                  <li>• Expert product consultations</li>
                  <li>• Bulk order processing center</li>
                  <li>• Professional training workshops</li>
                  <li>• Same-day pickup available</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-gray-400">Interactive Map</p>
                <p className="text-sm text-gray-500">Google Maps integration would go here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}