import Link from 'next/link'
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
const CompanyActivities = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Create the pie chart
      const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [' Industries Area. ', ' Industries Area. ', ' Industries Area. '],
          datasets: [
            {
              data: [90, 95, 90],
              backgroundColor: ['#ADC5E4', '#DAE6F2', '#DAE6F2'],
            },
          ],
          datalabels: {
            color: 'white', // Set the color of the data labels
            anchor: 'end',
            align: 'start',
            offset: 8, // Adjust the distance from the chart segments
            formatter: (value, context) => {
              return value + '%'; // Format the label as needed
            },
          },
        },
        options: {
          // Move the legend to the left
          plugins: {
            legend: {
              position: 'top',
              gap:'50',
              align: 'right',
              title:"dada",
              datalabels: {
                color: 'white', // Set the color of the data labels
                anchor: 'end',
                align: 'start',
                offset: 8, // Adjust the distance from the chart segments
                formatter: (value, context) => {
                  return value + '%'; // Format the label as needed
                },
              },
              labels: {
                boxWidth: 15, // Adjust box width if needed
              },
            },
          },
        },
      });

      // Cleanup on component unmount
      return () => {
        myChart.destroy();
      };
    }
  }, []);
  return (
    <div className="company-activities-area mb-130">
  <div className="container-fluid one pl--95">
    <div className="row">
      <div className="col-lg-12 gap-lg-5 gap-4 d-flex flex-lg-nowrap flex-wrap align-items-start justify-content-between mb-60">
        <div className="section-title1 one">
          <span>Our Activities</span>
          <h2>Conduct market research to understand industry trends, competition.</h2>
        </div>
        <Link legacyBehavior href="/about">
          <a className="explore-btn" >
          Explore Us
          <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.1865 1.06237L0 11.2484L0.751627 12L10.9376 1.81347V8.85645H12V0H3.14355V1.06237H10.1865Z" />
          </svg>
          </a>
        </Link>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6 pr--95">
        <div className="company-activites-content">
          <div className="sulution-approach mb-50">
            <h3>Key Solution Approach :</h3>
            <ul>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14">
                  <path d="M12.1223 3.19025C12.163 3.23089 12.1953 3.27917 12.2174 3.33232C12.2394 3.38548 12.2508 3.44246 12.2508 3.5C12.2508 3.55755 12.2394 3.61453 12.2174 3.66768C12.1953 3.72084 12.163 3.76911 12.1223 3.80975L5.99725 9.93475C5.95661 9.9755 5.90833 10.0078 5.85518 10.0299C5.80203 10.0519 5.74505 10.0633 5.6875 10.0633C5.62996 10.0633 5.57298 10.0519 5.51982 10.0299C5.46667 10.0078 5.41839 9.9755 5.37775 9.93475L2.31525 6.87225C2.2331 6.7901 2.18695 6.67868 2.18695 6.5625C2.18695 6.44632 2.2331 6.3349 2.31525 6.25275C2.3974 6.1706 2.50882 6.12445 2.625 6.12445C2.74118 6.12445 2.8526 6.1706 2.93475 6.25275L5.6875 9.00638L11.5028 3.19025C11.5434 3.14951 11.5917 3.11719 11.6448 3.09513C11.698 3.07307 11.755 3.06172 11.8125 3.06172C11.87 3.06172 11.927 3.07307 11.9802 3.09513C12.0333 3.11719 12.0816 3.14951 12.1223 3.19025Z">
                  </path>
                </svg> Initial Assessment
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14">
                  <path d="M12.1223 3.19025C12.163 3.23089 12.1953 3.27917 12.2174 3.33232C12.2394 3.38548 12.2508 3.44246 12.2508 3.5C12.2508 3.55755 12.2394 3.61453 12.2174 3.66768C12.1953 3.72084 12.163 3.76911 12.1223 3.80975L5.99725 9.93475C5.95661 9.9755 5.90833 10.0078 5.85518 10.0299C5.80203 10.0519 5.74505 10.0633 5.6875 10.0633C5.62996 10.0633 5.57298 10.0519 5.51982 10.0299C5.46667 10.0078 5.41839 9.9755 5.37775 9.93475L2.31525 6.87225C2.2331 6.7901 2.18695 6.67868 2.18695 6.5625C2.18695 6.44632 2.2331 6.3349 2.31525 6.25275C2.3974 6.1706 2.50882 6.12445 2.625 6.12445C2.74118 6.12445 2.8526 6.1706 2.93475 6.25275L5.6875 9.00638L11.5028 3.19025C11.5434 3.14951 11.5917 3.11719 11.6448 3.09513C11.698 3.07307 11.755 3.06172 11.8125 3.06172C11.87 3.06172 11.927 3.07307 11.9802 3.09513C12.0333 3.11719 12.0816 3.14951 12.1223 3.19025Z">
                  </path>
                </svg> Solution Development
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14">
                  <path d="M12.1223 3.19025C12.163 3.23089 12.1953 3.27917 12.2174 3.33232C12.2394 3.38548 12.2508 3.44246 12.2508 3.5C12.2508 3.55755 12.2394 3.61453 12.2174 3.66768C12.1953 3.72084 12.163 3.76911 12.1223 3.80975L5.99725 9.93475C5.95661 9.9755 5.90833 10.0078 5.85518 10.0299C5.80203 10.0519 5.74505 10.0633 5.6875 10.0633C5.62996 10.0633 5.57298 10.0519 5.51982 10.0299C5.46667 10.0078 5.41839 9.9755 5.37775 9.93475L2.31525 6.87225C2.2331 6.7901 2.18695 6.67868 2.18695 6.5625C2.18695 6.44632 2.2331 6.3349 2.31525 6.25275C2.3974 6.1706 2.50882 6.12445 2.625 6.12445C2.74118 6.12445 2.8526 6.1706 2.93475 6.25275L5.6875 9.00638L11.5028 3.19025C11.5434 3.14951 11.5917 3.11719 11.6448 3.09513C11.698 3.07307 11.755 3.06172 11.8125 3.06172C11.87 3.06172 11.927 3.07307 11.9802 3.09513C12.0333 3.11719 12.0816 3.14951 12.1223 3.19025Z">
                  </path>
                </svg> Problem Definition
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14">
                  <path d="M12.1223 3.19025C12.163 3.23089 12.1953 3.27917 12.2174 3.33232C12.2394 3.38548 12.2508 3.44246 12.2508 3.5C12.2508 3.55755 12.2394 3.61453 12.2174 3.66768C12.1953 3.72084 12.163 3.76911 12.1223 3.80975L5.99725 9.93475C5.95661 9.9755 5.90833 10.0078 5.85518 10.0299C5.80203 10.0519 5.74505 10.0633 5.6875 10.0633C5.62996 10.0633 5.57298 10.0519 5.51982 10.0299C5.46667 10.0078 5.41839 9.9755 5.37775 9.93475L2.31525 6.87225C2.2331 6.7901 2.18695 6.67868 2.18695 6.5625C2.18695 6.44632 2.2331 6.3349 2.31525 6.25275C2.3974 6.1706 2.50882 6.12445 2.625 6.12445C2.74118 6.12445 2.8526 6.1706 2.93475 6.25275L5.6875 9.00638L11.5028 3.19025C11.5434 3.14951 11.5917 3.11719 11.6448 3.09513C11.698 3.07307 11.755 3.06172 11.8125 3.06172C11.87 3.06172 11.927 3.07307 11.9802 3.09513C12.0333 3.11719 12.0816 3.14951 12.1223 3.19025Z">
                  </path>
                </svg> Implementation Assistance
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14">
                  <path d="M12.1223 3.19025C12.163 3.23089 12.1953 3.27917 12.2174 3.33232C12.2394 3.38548 12.2508 3.44246 12.2508 3.5C12.2508 3.55755 12.2394 3.61453 12.2174 3.66768C12.1953 3.72084 12.163 3.76911 12.1223 3.80975L5.99725 9.93475C5.95661 9.9755 5.90833 10.0078 5.85518 10.0299C5.80203 10.0519 5.74505 10.0633 5.6875 10.0633C5.62996 10.0633 5.57298 10.0519 5.51982 10.0299C5.46667 10.0078 5.41839 9.9755 5.37775 9.93475L2.31525 6.87225C2.2331 6.7901 2.18695 6.67868 2.18695 6.5625C2.18695 6.44632 2.2331 6.3349 2.31525 6.25275C2.3974 6.1706 2.50882 6.12445 2.625 6.12445C2.74118 6.12445 2.8526 6.1706 2.93475 6.25275L5.6875 9.00638L11.5028 3.19025C11.5434 3.14951 11.5917 3.11719 11.6448 3.09513C11.698 3.07307 11.755 3.06172 11.8125 3.06172C11.87 3.06172 11.927 3.07307 11.9802 3.09513C12.0333 3.11719 12.0816 3.14951 12.1223 3.19025Z">
                  </path>
                </svg> Data Gathering and Analysis
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14">
                  <path d="M12.1223 3.19025C12.163 3.23089 12.1953 3.27917 12.2174 3.33232C12.2394 3.38548 12.2508 3.44246 12.2508 3.5C12.2508 3.55755 12.2394 3.61453 12.2174 3.66768C12.1953 3.72084 12.163 3.76911 12.1223 3.80975L5.99725 9.93475C5.95661 9.9755 5.90833 10.0078 5.85518 10.0299C5.80203 10.0519 5.74505 10.0633 5.6875 10.0633C5.62996 10.0633 5.57298 10.0519 5.51982 10.0299C5.46667 10.0078 5.41839 9.9755 5.37775 9.93475L2.31525 6.87225C2.2331 6.7901 2.18695 6.67868 2.18695 6.5625C2.18695 6.44632 2.2331 6.3349 2.31525 6.25275C2.3974 6.1706 2.50882 6.12445 2.625 6.12445C2.74118 6.12445 2.8526 6.1706 2.93475 6.25275L5.6875 9.00638L11.5028 3.19025C11.5434 3.14951 11.5917 3.11719 11.6448 3.09513C11.698 3.07307 11.755 3.06172 11.8125 3.06172C11.87 3.06172 11.927 3.07307 11.9802 3.09513C12.0333 3.11719 12.0816 3.14951 12.1223 3.19025Z">
                  </path>
                </svg> Monitoring and Evaluation
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14">
                  <path d="M12.1223 3.19025C12.163 3.23089 12.1953 3.27917 12.2174 3.33232C12.2394 3.38548 12.2508 3.44246 12.2508 3.5C12.2508 3.55755 12.2394 3.61453 12.2174 3.66768C12.1953 3.72084 12.163 3.76911 12.1223 3.80975L5.99725 9.93475C5.95661 9.9755 5.90833 10.0078 5.85518 10.0299C5.80203 10.0519 5.74505 10.0633 5.6875 10.0633C5.62996 10.0633 5.57298 10.0519 5.51982 10.0299C5.46667 10.0078 5.41839 9.9755 5.37775 9.93475L2.31525 6.87225C2.2331 6.7901 2.18695 6.67868 2.18695 6.5625C2.18695 6.44632 2.2331 6.3349 2.31525 6.25275C2.3974 6.1706 2.50882 6.12445 2.625 6.12445C2.74118 6.12445 2.8526 6.1706 2.93475 6.25275L5.6875 9.00638L11.5028 3.19025C11.5434 3.14951 11.5917 3.11719 11.6448 3.09513C11.698 3.07307 11.755 3.06172 11.8125 3.06172C11.87 3.06172 11.927 3.07307 11.9802 3.09513C12.0333 3.11719 12.0816 3.14951 12.1223 3.19025Z">
                  </path>
                </svg> Stakeholder Engagement
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14">
                  <path d="M12.1223 3.19025C12.163 3.23089 12.1953 3.27917 12.2174 3.33232C12.2394 3.38548 12.2508 3.44246 12.2508 3.5C12.2508 3.55755 12.2394 3.61453 12.2174 3.66768C12.1953 3.72084 12.163 3.76911 12.1223 3.80975L5.99725 9.93475C5.95661 9.9755 5.90833 10.0078 5.85518 10.0299C5.80203 10.0519 5.74505 10.0633 5.6875 10.0633C5.62996 10.0633 5.57298 10.0519 5.51982 10.0299C5.46667 10.0078 5.41839 9.9755 5.37775 9.93475L2.31525 6.87225C2.2331 6.7901 2.18695 6.67868 2.18695 6.5625C2.18695 6.44632 2.2331 6.3349 2.31525 6.25275C2.3974 6.1706 2.50882 6.12445 2.625 6.12445C2.74118 6.12445 2.8526 6.1706 2.93475 6.25275L5.6875 9.00638L11.5028 3.19025C11.5434 3.14951 11.5917 3.11719 11.6448 3.09513C11.698 3.07307 11.755 3.06172 11.8125 3.06172C11.87 3.06172 11.927 3.07307 11.9802 3.09513C12.0333 3.11719 12.0816 3.14951 12.1223 3.19025Z">
                  </path>
                </svg> Project Closure and Reporting
              </li>
            </ul>
          </div>
          <div className="eg-progress-wrap">
            <div className="eg-progress-bar-single mb-35">
              <div className="eg-progress-bar-title">
                <h6>Market Analaysis</h6>
              </div>
              <div className="eg-progress-bar">
                <div className="subscription-bar-per" data-per="90%" style={{width: '90%'}} />
              </div>
            </div>
            <div className="eg-progress-bar-single mb-35">
              <div className="eg-progress-bar-title">
                <h6>Expert Research</h6>
              </div>
              <div className="eg-progress-bar">
                <div className="subscription-bar-per" data-per="95%" style={{width: '95%'}} />
              </div>
            </div>
            <div className="eg-progress-bar-single">
              <div className="eg-progress-bar-title">
                <h6>Consulting Rate </h6>
              </div>
              <div className="eg-progress-bar">
                <div className="subscription-bar-per" data-per="90%" style={{width: '90%'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="pie-chart-wrap">
          <div className="year">2023</div>
          <div className="title-and-year">
            <h5>Yearly Business Growth</h5>
          </div>
          <canvas ref={chartRef} className="chartCanvas" />
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default CompanyActivities
