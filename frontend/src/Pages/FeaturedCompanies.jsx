import React from 'react';
import '../style/FeaturedCompanies.css';

const companies = [
  {
    name: 'Google',
    logo: 'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png',
    website: 'https://careers.google.com/',
    description: 'Building technology to make information accessible.',
    rating: 4.8,
  },
  {
    name: 'Microsoft',
    logo: 'https://1000logos.net/wp-content/uploads/2021/04/Microsoft-logo.png',
    website: 'https://careers.microsoft.com/',
    description: 'Empowering every person on the planet.',
    rating: 4.7,
  },
  {
    name: 'Amazon',
    logo: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo.png',
    website: 'https://www.amazon.jobs/',
    description: 'Invent and simplify.',
    rating: 4.6,
  },
  {
    name: 'Adobe',
    logo: 'https://1000logos.net/wp-content/uploads/2021/04/Adobe-logo.png',
    website: 'https://careers.adobe.com/',
    description: 'Creativity for all.',
    rating: 4.6,
  },
  {
    name: 'Paytm',
    logo: 'https://1000logos.net/wp-content/uploads/2021/05/Paytm-logo.png',
    website: 'https://jobs.paytm.com/',
    description: 'Leading digital payments in India.',
    rating: 4.3,
  },
  {
    name: 'Flipkart',
    logo: 'https://1000logos.net/wp-content/uploads/2022/01/Flipkart-Logo.png',
    website: 'https://www.flipkartcareers.com/',
    description: 'Shaping e-commerce in India.',
    rating: 4.2,
  },
  {
    name: 'Zomato',
    logo: 'https://1000logos.net/wp-content/uploads/2021/11/Zomato-logo.png',
    website: 'https://careers.zomato.com/',
    description: 'Connecting people to restaurants and food.',
    rating: 4.1,
  },
];

const FeaturedCompanies = () => (
  <div className="featured-container">
    <h2 className="featured-title">🌟 Top Companies Hiring Now</h2>
    <div className="slider">
      <div className="slider-track">
        {[...companies, ...companies].map((company, index) => (
          <div className="company-card" key={index}>
            <img src={company.logo} alt={company.name} className="company-logo" />
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            <a
              href={company.website}
              className="visit-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FeaturedCompanies;
