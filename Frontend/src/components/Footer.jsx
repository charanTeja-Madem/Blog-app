import React from 'react'
import { divider, bodyText, mutedText } from '../styles/common'

function Footer() {
  return (
    <footer className="bg-[#f4f0ea] border-t border-[#ddd7ce] py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#1a1410] mb-4">
              Literary Journal
            </h3>
            <p className={`${bodyText} mb-4`}>
              A curated space for thoughtful writing, literary exploration, and meaningful conversations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['DM_Sans'] text-sm font-semibold text-[#1a1410] uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className={`${bodyText} hover:text-[#c0392b] transition-colors`}>
                  Home
                </a>
              </li>
              <li>
                <a href="/articles" className={`${bodyText} hover:text-[#c0392b] transition-colors`}>
                  Articles
                </a>
              </li>
              <li>
                <a href="/authors" className={`${bodyText} hover:text-[#c0392b] transition-colors`}>
                  Authors
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['DM_Sans'] text-sm font-semibold text-[#1a1410] uppercase tracking-widest mb-4">
              Connect
            </h4>
            <p className={`${mutedText} mb-2`}>
              Have a story to tell?
            </p>
            <a
              href="/register"
              className="font-['DM_Sans'] text-[#c0392b] hover:text-[#922b21] transition-colors underline underline-offset-2"
            >
              Join our community →
            </a>
          </div>
        </div>

        <div className={divider}></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className={`${mutedText} text-center md:text-left`}>
            © 2026 Literary Journal. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className={`${mutedText} hover:text-[#1a1410] transition-colors`}>
              Privacy
            </a>
            <a href="#" className={`${mutedText} hover:text-[#1a1410] transition-colors`}>
              Terms
            </a>
            <a href="#" className={`${mutedText} hover:text-[#1a1410] transition-colors`}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
