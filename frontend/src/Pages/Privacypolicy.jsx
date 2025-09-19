import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
function Privacypolicy() {
 return (
  <>
  <Header />
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-black flex items-center justify-center text-white" style={{ top:"200px" }}>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight animate-fade-in">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium animate-fade-in delay-200">
            Vinston Designs
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{position:"relative",top:"200px", marginBottom:"200px"}}>
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed">
              At Vinston Designs, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, store, and safeguard your information when you visit our website or make a purchase with us.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Effective Date: 05 July 2025
            </p>
          </section>

          <hr className="my-8 border-gray-200" />

          {/* Section 1: Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed">
              When you interact with our website, we may collect the following types of information:
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">a. Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Shipping and billing address</li>
                  <li>Payment information (secured and encrypted via third-party gateways)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">b. Order Information</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Items purchased</li>
                  <li>Customization preferences</li>
                  <li>Order history and communication</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">c. Technical Information</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>IP address</li>
                  <li>Device type</li>
                  <li>Browser type</li>
                  <li>Cookies and usage data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>To process and fulfill orders</li>
              <li>To offer customer support and respond to inquiries</li>
              <li>To personalize your shopping experience</li>
              <li>To send updates about your orders, offers, or new launches (only with your consent)</li>
              <li>To improve our website performance, security, and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Section 3: Sharing of Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Sharing of Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell or rent your personal data to third parties. However, we may share limited information with:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Trusted service providers (like payment gateways, shipping companies, marketing platforms) who help us operate our business</li>
              <li>Legal authorities if required by law, court orders, or to protect our rights or the safety of others</li>
            </ul>
            <p className="mt-4 text-gray-700 leading-relaxed">
              All partners are contractually bound to protect your data and use it solely for the intended services.
            </p>
          </section>

          {/* Section 4: Payment Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Security</h2>
            <p className="text-gray-700 leading-relaxed">
              All payment transactions are securely processed via certified third-party gateways like PayPal, Mercury, Wise, Razorpay, or others. We do not store your credit/debit card details on our servers.
            </p>
          </section>

          {/* Section 5: Cookies and Tracking Technologies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Improve website functionality</li>
              <li>Analyze site traffic and performance</li>
              <li>Personalize content and advertising</li>
            </ul>
            <p className="mt-4 text-gray-700 leading-relaxed">
              You may adjust your browser settings to manage cookies, though this may affect your browsing experience on our website.
            </p>
          </section>

          {/* Section 6: Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal data only as long as necessary:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>To fulfill orders and deliver services</li>
              <li>To comply with legal, tax, or regulatory obligations</li>
              <li>For legitimate business interests like dispute resolution or fraud prevention</li>
            </ul>
            <p className="mt-4 text-gray-700 leading-relaxed">
              You can request deletion of your data at any time by contacting us.
            </p>
          </section>

          {/* Section 7: Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
            <p className="mt-4 text-gray-700 leading-relaxed">
              To exercise these rights, please email us at: <a href="mailto:support@vinstondesigns.com" className="text-blue-600 hover:underline">support@vinstondesigns.com</a>
            </p>
          </section>

          {/* Section 8: Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your data against unauthorized access, alteration, or misuse. However, no method of online transmission is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 9: Children’s Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children’s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for individuals under the age of 16. We do not knowingly collect data from minors. If we become aware of such data, we will take immediate steps to delete it.
            </p>
          </section>

          {/* Section 10: International Customers */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Customers</h2>
            <p className="text-gray-700 leading-relaxed">
              If you’re accessing our website from outside United States, please note that your data may be transferred to and processed in countries with different data protection laws. By using our site, you consent to such transfers.
            </p>
          </section>

          {/* Section 11: Updates to This Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Updates to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date. We encourage you to review this page periodically.
            </p>
          </section>

          {/* Section 12: Contact Us */}
<section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about these Terms, please feel free to reach out:
            </p>
            <div className="mt-4 text-gray-700">
              <p><strong>Vinston Designs</strong></p>
              <p>Email: <a href="mailto:support@vinstondesigns.com" className="text-blue-600 hover:underline">support@vinstondesigns.com</a></p>
              <p>Phone: <a href="tel:+918824284631" className="text-blue-600 hover:underline">+91-8824284631</a></p>
              <p>Address: Vinston Designs LLC 30 N Gould St #42530 Sheridan, WY 82801 United States</p>
            </div>
          </section>
        </div>
      </main>


    </div>
    <Footer />
  </>

  )
}

export default Privacypolicy