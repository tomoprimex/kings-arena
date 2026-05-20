"use client";
import React, { useState } from "react";
import "../styles/players.css";
import "../styles/cards.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general"
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Mock API call - replace with actual contact form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general"
      });
    } catch (error) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="players">
        <div className="playersContainer">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h1>Message Sent Successfully!</h1>
            <p>Thank you for contacting Kings Arena. We'll get back to you within 24 hours.</p>
            <button 
              className="backBtn"
              onClick={() => setSubmitted(false)}
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="players">
      <div className="playersContainer">
        <div className="contactHeader">
          <h1 className="playersTitle">Contact Us</h1>
          <p className="playersSubtitle">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="contactGrid">
          <div className="form-card">
            <div className="card-header">
              <h2 className="card-title">Send us a Message</h2>
              <p className="card-subtitle">We'll respond as soon as possible</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group-card">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input-card"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="tournaments">Tournament Questions</option>
                  <option value="partnerships">Partnerships</option>
                  <option value="feedback">Feedback</option>
                  <option value="bugs">Bug Reports</option>
                </select>
              </div>

              <div className="form-group-card">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-card"
                />
              </div>

              <div className="form-group-card">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-card"
                />
              </div>

              <div className="form-group-card">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-card"
                />
              </div>

              <div className="form-group-card">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="input-card"
                />
              </div>

              {error && <div className="error-card">{error}</div>}

              <button type="submit" className="submitBtn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="contactInfo">
            <div className="info-card">
              <div className="card-header">
                <h3>Get in Touch</h3>
                <p>Our support team is available Monday through Friday, 9 AM to 6 PM EST.</p>
              </div>
              
              <div className="contactMethods">
                <div className="contact-method-card">
                  <div className="method-icon-card">📧</div>
                  <div className="methodInfo">
                    <strong>Email</strong>
                    <p>support@kingsarena.com</p>
                  </div>
                </div>

                <div className="contact-method-card">
                  <div className="method-icon-card">💬</div>
                  <div className="methodInfo">
                    <strong>Discord</strong>
                    <p>Join our community server</p>
                    <a href="#" className="methodLink">Join Discord</a>
                  </div>
                </div>

                <div className="contact-method-card">
                  <div className="method-icon-card">🐦</div>
                  <div className="methodInfo">
                    <strong>Twitter</strong>
                    <p>@KingsArena</p>
                    <a href="#" className="methodLink">Follow Us</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <h3>Quick Links</h3>
              </div>
              <div className="quickLinks">
                <a href="/faq" className="quick-link-card">Frequently Asked Questions</a>
                <a href="/rules" className="quick-link-card">Tournament Rules</a>
                <a href="/guidelines" className="quick-link-card">Community Guidelines</a>
                <a href="/privacy" className="quick-link-card">Privacy Policy</a>
                <a href="/terms" className="quick-link-card">Terms of Service</a>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <h3>Office Location</h3>
              </div>
              <div className="officeInfo">
                <p>Kings Arena Headquarters</p>
                <p>123 Gaming Street</p>
                <p>Tech City, TC 12345</p>
                <p>United States</p>
              </div>
            </div>

            <div className="info-card">
              <div className="card-header">
                <h3>Response Times</h3>
              </div>
              <div className="responseTimes">
                <div className="response-item-card">
                  <strong>General Inquiries:</strong>
                  <span>24-48 hours</span>
                </div>
                <div className="response-item-card">
                  <strong>Technical Support:</strong>
                  <span>12-24 hours</span>
                </div>
                <div className="response-item-card">
                  <strong>Tournament Issues:</strong>
                  <span>2-4 hours</span>
                </div>
                <div className="response-item-card">
                  <strong>Partnership Inquiries:</strong>
                  <span>3-5 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Frequently Asked Questions</h2>
          </div>
          <div className="card-body">
            <div className="faq-card">
              <h3>How do I join a tournament?</h3>
              <p>Browse the tournaments section, find one you're interested in, and click the "Join Tournament" button. Make sure you meet the requirements and have the entry fee ready.</p>
            </div>

            <div className="faq-card">
              <h3>What games are supported?</h3>
              <p>We currently support eFootball, FIFA, and Call of Duty. We're always looking to add more games based on community demand.</p>
            </div>

            <div className="faq-card">
              <h3>How are rankings calculated?</h3>
              <p>Our ranking system considers factors like win rate, match difficulty, opponent skill level, and recent performance to provide accurate player rankings.</p>
            </div>

            <div className="faq-card">
              <h3>Can I create my own tournament?</h3>
              <p>Yes! Premium members can create custom tournaments with their own rules and prize pools. Check your dashboard for the "Create Tournament" option.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
