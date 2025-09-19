import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'


function TermsConditions() {
  return (
    <>
    <Header />
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-black flex items-center justify-center text-white" style={{top:"200px"}}>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight animate-fade-in">
            Terms & Conditions
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
              Welcome to Vinston Designs. By accessing or using our website, placing an order, or engaging with any of our services, you agree to be bound by the following Terms and Conditions. Please read them carefully. If you do not agree with any of these terms, you should not use this website.
            </p>

<p className="mt-2 text-sm text-gray-600">
              Effective Date: 15 July 2025
            </p>

          </section>

          <hr className="my-8 border-gray-200" />

          {/* Section 1: Overview */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              This website is operated by Vinston Designs. Throughout the site, the terms “we”, “us”, and “our” refer to Vinston Designs. By visiting our site and/or purchasing from us, you engage in our “Service” and agree to be bound by the following Terms and Conditions (“Terms”, “Terms of Service”), including any additional terms and policies referenced here or available by hyperlink.
            </p>
          </section>

          {/* Section 2: Eligibility */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility</h2>
            <p className="text-gray-700 leading-relaxed">
              To use our services, you must be at least 18 years old or accessing the site under the supervision of a parent or legal guardian. By placing an order, you confirm that all information provided is accurate and complete and that you have legal rights to use any payment method provided.
            </p>
          </section>

          {/* Section 3: Product Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Product Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We specialize in thematic and personalized jewelry including custom-made designs, 925 Sterling Silver, and Solid Gold pieces with natural gemstones, birthstones, diamonds, and more. All product descriptions, images, and prices are presented accurately to the best of our knowledge. However:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Colors may vary slightly due to screen settings.</li>
              <li>Handmade and natural gemstone products may have slight irregularities or variations.</li>
              <li>Customizations and engravings are made as per your instructions and are non-refundable unless defective.</li>
            </ul>
          </section>

          {/* Section 4: Pricing and Payments */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Pricing and Payments</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>All prices are listed in USD and are subject to change without notice.</li>
              <li>We reserve the right to modify or discontinue products without prior notice.</li>
              <li>We accept secure online payments via PayPal, Stripe, Razorpay, etc.</li>
              <li>All transactions are encrypted and processed through trusted third-party providers.</li>
            </ul>
          </section>

          {/* Section 5: Order Process */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Order Process</h2>
            <h3 className="text-xl font-medium text-gray-900 mb-2">a. Placing an Order</h3>
            <p className="text-gray-700 leading-relaxed">
              Once an order is placed, you will receive an order confirmation via email. If you’ve ordered a custom or personalized piece, production will begin only after confirmation of design and payment.
            </p>
            <h3 className="text-xl font-medium text-gray-900 mt-4 mb-2">b. Cancellations</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Orders can be canceled within 24 hours of purchase.</li>
              <li>Custom orders cannot be canceled or refunded once production has started.</li>
            </ul>
          </section>

          {/* Section 6: Shipping & Delivery */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Shipping & Delivery</h2>
            <p className="text-gray-700 leading-relaxed">
              We ship worldwide. Shipping timelines depend on the destination and product type:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Ready-to-ship pieces: Dispatch in 3–5 business days.</li>
              <li>Made-to-order and custom jewelry: Usually ships in 10–21 business days.</li>
            </ul>
            <p className="text-gray-700 mt-4 leading-relaxed">
              We are not responsible for delays caused by customs, local holidays, or courier issues. Customers are responsible for any applicable import duties or taxes.
            </p>
          </section>

          {/* Section 7: Returns & Refunds */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Returns & Refunds</h2>
            <p className="text-gray-700 leading-relaxed">
              We take pride in every handcrafted piece, but if something isn’t right, please contact us within 7 days of receiving your order.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Ready-made jewelry: Eligible for return/exchange under certain conditions.</li>
              <li>Custom, engraved, or personalized items: Non-refundable and non-returnable unless defective.</li>
              <li>Refunds (if applicable) will be processed to the original payment method once the product is returned and inspected.</li>
            </ul>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Please review our detailed <a href="#" className="text-blue-600 hover:underline">Return & Refund Policy</a> for complete information.
            </p>
          </section>

          {/* Section 8: Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on this website, including images, text, product designs, graphics, logos, and branding, is the intellectual property of Vinston Designs and is protected under international copyright and trademark laws.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">You may not:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Reproduce, distribute, or exploit any part of the website or designs without written permission.</li>
              <li>Use our products or content for unauthorized commercial purposes.</li>
            </ul>
          </section>

          {/* Section 9: Custom Design Ownership */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Custom Design Ownership</h2>
            <p className="text-gray-700 leading-relaxed">
              All custom designs, sketches, and concepts created in collaboration with our clients remain the intellectual property of Vinston Designs, unless a separate written agreement is made. We reserve the right to display these designs in our portfolio, unless requested otherwise.
            </p>
          </section>

          {/* Section 10: Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              Vinston Designs shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>The use or misuse of our website or products.</li>
              <li>Delays in delivery.</li>
              <li>Any inaccuracies or omissions in product listings.</li>
              <li>Any allergic reactions to materials used in our jewelry (please ensure to read product descriptions).</li>
            </ul>
          </section>

          {/* Section 11: Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              We care deeply about your privacy. All personal data collected is handled in accordance with our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>. We do not share or sell your data to third parties.
            </p>
          </section>

          {/* Section 12: Force Majeure */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Force Majeure</h2>
            <p className="text-gray-700 leading-relaxed">
              We are not liable for failure to perform our obligations due to unforeseen circumstances beyond our control, including but not limited to: natural disasters, strikes, pandemics, customs delays, or internet outages.
            </p>
          </section>

          {/* Section 13: Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts of Wyoming, United States.
            </p>
          </section>

          {/* Section 14: Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be posted on this page, and continued use of the website implies acceptance of the revised terms.
            </p>
          </section>

          {/* Section 15: Contact Us */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Us</h2>
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

export default TermsConditions