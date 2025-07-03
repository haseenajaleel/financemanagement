import React from 'react';

export default function SummarySlider({ income, expenses }) {
  const balance = income - expenses;

  const summaryPoints = [
    `Total Income: ₹${income}`,
    `Total Expenses: ₹${expenses}`,
    `Remaining Balance: ₹${balance}`,
    '✔ Save at least 20% monthly',
    '✔ Track expenses regularly'
  ];

  return (
    <div
      id="summaryCarousel"
      className="carousel slide my-5"
      data-bs-ride="carousel"
      style={{ maxWidth: '1100px', margin: '0 auto' }}
    >
      <div className="carousel-inner">

        {/* Slide 1: Big Balance */}
        <div
          className="carousel-item active d-flex flex-column justify-content-center align-items-center p-5"
          style={{
            backgroundColor: '#e0f2f1',
            height: '400px',
            borderRadius: '12px'
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(48px, 6vw, 100px)',
              fontWeight: 'bold',
              color: '#2e7d32',
              marginBottom: '20px'
            }}
          >
            ₹ {balance}
          </h1>
          <h4 style={{ fontSize: 'clamp(20px, 3vw, 32px)', color: '#004d40' }}>
            Your Remaining Balance
          </h4>
        </div>

        {/* Slide 2: Bullet Points */}
        <div
          className="carousel-item d-flex flex-column justify-content-center align-items-center p-5"
          style={{
            backgroundColor: '#fce4ec',
            height: '400px',
            borderRadius: '12px'
          }}
        >
          <h3
            className="mb-4"
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              color: '#880e4f'
            }}
          >
            Summary
          </h3>
          <ul
            style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              maxWidth: '800px',
              textAlign: 'left',
              listStyleType: 'disc'
            }}
          >
            {summaryPoints.map((point, index) => (
              <li key={index} className="mb-2">{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#summaryCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#summaryCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" />
      </button>
    </div>
  );
}
