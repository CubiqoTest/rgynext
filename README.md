# CUBIQO - Comprehensive Startup Growth Platform

## Overview

CUBIQO is an enterprise-grade platform that transforms startups from idea to success. It combines AI-powered business assistance, robust security, real-time analytics, and comprehensive tools for founders, developers, and business teams.

## 🚀 Key Features

### 🔐 Security & Privacy
- OAuth 2.0 & JWT authentication
- Role-Based Access Control (RBAC)
- End-to-end encryption (AES-256)
- Multi-Factor Authentication (MFA) ready
- Rate limiting and anti-phishing protection
- Security headers and intrusion detection

### 🤖 AI-Powered Business Tools
- **Business Plan Generator**: Comprehensive AI-generated business plans
- **Pitch Deck Creator**: Investor-ready presentation slides
- **SWOT Analysis**: Automated strength, weakness, opportunity, and threat analysis
- **Competitor Analysis**: Market intelligence and competitive insights
- **Funding Strategy**: Personalized funding recommendations

### 📊 Admin Dashboard
- Real-time user and session monitoring
- Security alerts and threat detection
- Performance metrics and analytics
- Business metrics (MRR, ARR, churn, LTV, CAC)
- User management and activity logs

### 🏗️ Modern Architecture
- Modular backend with FastAPI
- Next.js frontend with React 18
- MongoDB with async Motor driver
- CI/CD with GitHub Actions
- Comprehensive API documentation

## 🛠️ Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- MongoDB
- Git

### Setup

```bash
# Clone repository
git clone https://github.com/CubiqoTest/rgynext.git
cd rgynext

# Run setup script
./setup.sh

# Or manually:

# Backend setup
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your configuration

# Frontend setup
cd ../frontend
npm install
```

### Running the Application

**Backend:**
```bash
cd backend
python server_v2.py
# API available at http://localhost:8000
# Docs at http://localhost:8000/docs
```

**Frontend:**
```bash
cd frontend
npm run dev
# App available at http://localhost:3000
```

## 📚 Documentation

- **[Architecture Guide](PLATFORM_ARCHITECTURE.md)**: Comprehensive platform documentation
- **[API Documentation](http://localhost:8000/docs)**: Interactive API docs (when server is running)
- **[Setup Guide](setup.sh)**: Automated setup script

## 🏛️ Architecture

```
rgynext/
├── backend/              # FastAPI backend
│   ├── api/             # API endpoints
│   ├── config/          # Configuration
│   ├── core/            # Core functionality (auth, security)
│   ├── models/          # Data models
│   ├── services/        # Business logic
│   ├── middleware/      # Custom middleware
│   └── tests/           # Test suite
├── frontend/            # Next.js frontend
│   └── src/
│       ├── app/         # Pages and routes
│       └── components/  # Reusable components
├── .github/
│   └── workflows/       # CI/CD pipelines
└── docs/                # Additional documentation
```

## 🔑 Key Technologies

- **Backend**: FastAPI, Python, Motor (MongoDB), JWT
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Database**: MongoDB
- **Security**: bcrypt, cryptography, python-jose
- **DevOps**: GitHub Actions, Docker (ready)
- **Testing**: pytest, jest

## 🌟 Features by User Role

### Admin
- Full platform access
- User management
- Security monitoring
- System configuration
- Analytics dashboard

### Founder
- Business tools access
- Team collaboration
- Analytics and metrics
- All CRUD operations

### Developer
- API access
- Read and write permissions
- Code generation tools

### User
- Basic platform access
- Personal workspace
- Collaboration features

## 🔒 Security Features

- **Authentication**: JWT-based with refresh tokens
- **Authorization**: Role-Based Access Control (RBAC)
- **Encryption**: AES-256 for sensitive data
- **Rate Limiting**: Configurable per endpoint
- **Security Headers**: HSTS, CSP, X-Frame-Options, etc.
- **Vulnerability Scanning**: Automated in CI/CD

## 📈 Roadmap

### Phase 1: Foundation ✅
- [x] Modular architecture
- [x] Security infrastructure
- [x] CI/CD pipeline
- [x] AI business tools
- [x] Admin dashboard

### Phase 2: Integration 🚧
- [ ] No-code/low-code builders
- [ ] CRM integrations
- [ ] Email marketing
- [ ] Social media automation

### Phase 3: Advanced Features 📅
- [ ] Voice interactions
- [ ] Multi-channel support
- [ ] Document management
- [ ] Predictive analytics
- [ ] Mobile applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[Your License Here]

## 🆘 Support

For support, please:
- Open an issue on GitHub
- Check the [documentation](PLATFORM_ARCHITECTURE.md)
- Contact the development team

---

Built with ❤️ by the CUBIQO team
