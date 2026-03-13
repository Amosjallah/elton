'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCMS } from '@/context/CMSContext';
import PageHero from '@/components/PageHero';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function AboutPage() {
  usePageTitle('Our Story');
  const { getSetting } = useCMS();
  const [activeTab, setActiveTab] = useState('story');

  const siteName = getSetting('site_name') || 'PROFILE LOGISTICS';

  const values = [
    {
      icon: 'ri-verified-badge-line',
      title: 'Reliable Handling',
      description: 'Your equipment is handled with extreme care, ensuring high-value assets arrive in perfect condition.'
    },
    {
      icon: 'ri-time-line',
      title: 'On-Time Delivery',
      description: 'We value your time. Our logistics network is optimized for speed and efficiency across Ghana.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Secure Shipping',
      description: 'Your assets are safe with us. We use secure tracking and specialized handling for every piece of equipment.'
    },
    {
      icon: 'ri-truck-line',
      title: 'Nationwide Network',
      description: 'Based in Accra, we leverage a robust network to deliver to every corner of the country.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="Your Stationery Clinic"
        subtitle="Emerging stationery solutions in Tema and Accra. We respond to all your needs."
        backgroundImage="/product-money-counter-2.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex border-b border-gray-200 mb-12 justify-center">
          <button
            onClick={() => setActiveTab('story')}
            className={`px-4 py-2 sm:px-8 sm:py-4 font-medium transition-colors text-lg cursor-pointer ${activeTab === 'story'
              ? 'text-blue-700 border-b-4 border-blue-700 font-bold'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Our Story
          </button>
          <button
            onClick={() => setActiveTab('mission')}
            className={`px-4 py-2 sm:px-8 sm:py-4 font-medium transition-colors text-lg cursor-pointer ${activeTab === 'mission'
              ? 'text-blue-700 border-b-4 border-blue-700 font-bold'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Our Mission
          </button>
        </div>

        {activeTab === 'story' && (
          <div className="grid md:grid-cols-2 gap-16 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Built on Reliability</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  <strong>The Stationery Clinic</strong> (by PROFILE LOGISTICS) was founded on a simple principle: every office, school, and creative space deserves a reliable source of high-quality tools.
                </p>
                <p>
                  Located in the vibrant business hubs of Tema and Accra, we have quickly emerged as a trusted name in the stationery industry. We believe that stationery is more than just paper and pens—it is the fuel for education, productivity, and creativity.
                </p>
                <p>
                  Our dedicated team is committed to "responding to all your needs," ensuring that whether you need a single notebook or a full office supply restock, you receive professional service and premium products.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 relative flex items-center justify-center">
                <img
                  src="/profile-logistics-logo.jpg"
                  alt="PROFILE LOGISTICS"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <p className="text-white font-bold text-xl">PROFILE LOGISTICS</p>
                  <p className="text-blue-200">Reliable · Fast · Secure</p>
                </div>
              </div>
              {/* Decorative Element */}
              <div className="absolute -z-10 top-10 -right-10 w-full h-full border-4 border-blue-100 rounded-2xl hidden md:block"></div>
            </div>
          </div>
        )}

        {activeTab === 'mission' && (
          <div className="grid md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <i className="ri-truck-line text-3xl text-white"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Seamless Operations</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our mission is to lead the stationery market in Ghana by providing reliable, high-quality supplies with unmatched speed and care. We aim to be the first name you think of for office and school essentials.
              </p>
            </div>
            <div className="bg-amber-50 p-10 rounded-3xl border border-amber-100">
              <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <i className="ri-shield-star-line text-3xl text-white"></i>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Customer Experience</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                We put our clients first. From real-time updates to professional support, we ensure your logistics experience is stress-free and reliable.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Partner With Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Trusted by businesses and individuals for secure and timely deliveries.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <i className={`${value.icon} text-2xl text-blue-700`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-900 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to move your items?</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Experience the difference with The Stationery Clinic. We are here to respond to every stationery inquiry with excellence and reliability.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-blue-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Get a Quote
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
