# CUBIQO - Comprehensive Startup Growth Platform

## Overview

CUBIQO has been transformed from a basic collaboration platform into a comprehensive startup growth engine with AI-powered business assistance, robust security, and enterprise-grade architecture.

## Architecture

### Backend Structure

The backend follows a modular, service-oriented architecture:

```
backend/
├── config/              # Application configuration
│   └── settings.py      # Centralized settings management
├── core/                # Core functionality
│   ├── auth/            # Authentication & JWT tokens
│   └── security/        # Security utilities & RBAC
│       ├── rbac.py      # Role-Based Access Control
│       └── encryption.py # End-to-end encryption
├── models/              # Pydantic data models
│   ├── user.py          # User & authentication models
│   ├── business.py      # Business tools models
│   └── analytics.py     # Analytics & monitoring models
├── services/            # Business logic services
│   ├── ai/              # AI services
│   │   └── business_assistant.py  # AI business assistance
│   ├── business_tools/  # Business tool services
│   └── analytics/       # Analytics services
├── api/                 # API endpoints
│   └── v1/
│       └── endpoints/
│           ├── auth.py      # Authentication endpoints
│           ├── business.py  # Business tools endpoints
│           └── admin.py     # Admin dashboard endpoints
├── middleware/          # Custom middleware
│   └── security.py      # Security middleware
└── server_v2.py         # Enhanced FastAPI application
```

### Frontend Structure

```
frontend/src/
├── app/
│   ├── admin/
│   │   └── dashboard/   # Admin dashboard
│   ├── business/        # Business tools interface
│   └── page.tsx         # Main application
└── components/
    └── ui/              # Reusable UI components
```

## Key Features Implemented

### 1. Security & Privacy (Phase 1)

#### Authentication & Authorization
- **OAuth 2.0 & JWT**: Secure token-based authentication
- **Role-Based Access Control (RBAC)**: Granular permissions (Admin, Founder, Developer, Marketer, User, Guest)
- **Multi-Factor Authentication (MFA)**: Support for 2FA (structure in place)
- **Password Security**: bcrypt hashing with salt

#### Data Protection
- **End-to-End Encryption**: AES-256 encryption for sensitive data
- **Encryption Service**: Utility for encrypting/decrypting data
- **Secure Token Management**: JWT with expiration and refresh tokens

#### Security Middleware
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, CSP, HSTS
- **Rate Limiting**: Configurable requests per minute (default: 60/min)
- **Anti-Phishing Protection**: Pattern detection for malicious content
- **Intrusion Detection**: Suspicious activity monitoring

### 2. AI-Powered Business Tools (Phase 2)

#### Business Plan Generator
- Automated comprehensive business plan generation
- Sections: Executive Summary, Market Analysis, Competitive Analysis, Marketing Strategy, Operations, Financial Projections, Risk Analysis
- AI-driven insights based on industry and market data

#### Pitch Deck Creator
- Investor-ready slide generation
- Structured slides: Problem, Solution, Market, Business Model, Traction, Team, Funding Ask
- Customizable based on business stage

#### SWOT Analysis
- AI-powered analysis of Strengths, Weaknesses, Opportunities, Threats
- Actionable recommendations
- Industry-specific insights

#### Competitor Analysis
- Automated competitor identification
- Market gap analysis
- Strategic positioning recommendations

#### Funding Strategy Generator
- Stage-appropriate funding recommendations
- Milestone-based roadmap
- Investor targeting strategies

### 3. Admin Dashboard (Phase 3)

#### Real-time Monitoring
- Total users and active sessions
- Security alerts dashboard
- System health monitoring
- API request tracking

#### Security Management
- Failed login attempt monitoring
- Suspicious activity alerts
- Alert resolution workflow
- User activity logs

#### User Management
- View all users with pagination
- Session management
- Role assignment capabilities
- Activity audit logs

#### Business Metrics
- MRR and ARR tracking
- Churn rate calculation
- Customer Lifetime Value (CLV)
- Customer Acquisition Cost (CAC)
- Conversion rate analytics

### 4. CI/CD Pipeline (Phase 1)

#### GitHub Actions Workflow
- **Backend Testing**:
  - Python dependency caching
  - Linting with Black, isort, flake8
  - Automated test execution
  - Code coverage reporting

- **Frontend Testing**:
  - Node.js dependency caching
  - ESLint validation
  - Build verification

- **Security Scanning**:
  - Trivy vulnerability scanner
  - Python safety checks
  - SARIF upload to GitHub Security tab

- **Code Quality**:
  - SonarCloud integration (ready)
  - Static analysis

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - Register new user
- `POST /login` - User login (returns access & refresh tokens)
- `GET /me` - Get current user info
- `POST /refresh` - Refresh access token

### Business Tools (`/api/v1/business`)
- `POST /profiles` - Create business profile
- `GET /profiles` - Get user's business profiles
- `POST /business-plan` - Generate business plan
- `POST /pitch-deck` - Generate pitch deck
- `POST /swot-analysis` - Perform SWOT analysis
- `POST /competitor-analysis` - Analyze competitors
- `POST /funding-strategy` - Generate funding strategy

### Admin Dashboard (`/api/v1/admin`)
- `GET /dashboard` - Get admin dashboard overview
- `GET /security-alerts` - Get security alerts
- `PUT /security-alerts/{id}/resolve` - Resolve alert
- `GET /users` - Get all users (paginated)
- `GET /sessions` - Get active sessions
- `GET /activity-logs` - Get activity logs
- `GET /business-metrics` - Get business metrics

## Configuration

### Environment Variables

Required environment variables (create `.env` file):

```bash
# Database
MONGO_URL=mongodb://localhost:27017
DB_NAME=cubiqo_db

# Security
SECRET_KEY=your-secret-key-change-in-production
ENCRYPTION_KEY=your-encryption-key

# External Services (optional)
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key

# Redis Cache (optional)
REDIS_URL=redis://localhost:6379

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:8000

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASSWORD=your-password

# Security Settings
ENABLE_SECURITY_HEADERS=true
ENABLE_RATE_LIMITING=true
RATE_LIMIT_PER_MINUTE=60
```

## Installation & Setup

### Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the server (original)
python server.py

# Run the enhanced server
python server_v2.py

# Run tests
pytest tests/ -v

# Lint code
black .
isort .
flake8 .
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## User Roles & Permissions

| Role      | Read | Write | Delete | Admin |
|-----------|------|-------|--------|-------|
| Admin     | ✓    | ✓     | ✓      | ✓     |
| Founder   | ✓    | ✓     | ✓      | ✗     |
| Developer | ✓    | ✓     | ✗      | ✗     |
| Marketer  | ✓    | ✓     | ✗      | ✗     |
| User      | ✓    | ✓     | ✗      | ✗     |
| Guest     | ✓    | ✗     | ✗      | ✗     |

## Security Best Practices

1. **Always use HTTPS in production**
2. **Rotate JWT secrets regularly**
3. **Enable MFA for admin accounts**
4. **Monitor security alerts daily**
5. **Review activity logs regularly**
6. **Keep dependencies updated**
7. **Run security scans in CI/CD**
8. **Use strong password policies**
9. **Implement rate limiting**
10. **Enable audit logging**

## Future Enhancements (Roadmap)

### Immediate (Next Phase)
- [ ] No-Code/Low-Code UI Builder
- [ ] CRM Integrations (HubSpot, Zoho, Salesforce)
- [ ] Email Marketing Integration
- [ ] Social Media Automation
- [ ] Real AI Integration (OpenAI, Anthropic)

### Mid-term
- [ ] Voice-to-Text and Text-to-Speech
- [ ] Multi-Channel Support (WhatsApp, Slack, Telegram)
- [ ] Document Management & Knowledge Base
- [ ] Predictive Analytics Dashboard
- [ ] Legal Document Templates

### Long-term
- [ ] Mobile Applications (iOS, Android)
- [ ] Investment Readiness Assessment
- [ ] Automated Market Intelligence
- [ ] Compliance Management (GDPR, CCPA)
- [ ] Revenue & Monetization Planner

## Technology Stack

### Backend
- **Framework**: FastAPI 0.110.1
- **Database**: MongoDB (Motor async driver)
- **Authentication**: JWT (python-jose)
- **Encryption**: cryptography (AES-256)
- **Password Hashing**: bcrypt
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: Next.js 14.2.5
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.4.1
- **Components**: Radix UI
- **Icons**: Lucide React

### DevOps
- **CI/CD**: GitHub Actions
- **Security Scanning**: Trivy
- **Code Quality**: SonarCloud (ready)
- **Testing**: pytest, jest

## Contributing

1. Follow the modular architecture
2. Write tests for new features
3. Use type hints (Python) and TypeScript
4. Run linters before committing
5. Update documentation
6. Follow security best practices

## Support

For issues, feature requests, or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## License

[Your License Here]

---

**CUBIQO** - Transforming startups from idea to success 🚀
