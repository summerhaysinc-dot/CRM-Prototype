# CRM Prototype

Production-style CRM prototype using Next.js App Router, TypeScript, Prisma/Postgres, Tailwind, and JWT cookie auth.

## File Tree

```text
crm-prototype/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── ai/page.tsx
│   ├── contacts/page.tsx
│   ├── conversations/page.tsx
│   ├── dashboard/page.tsx
│   ├── flows/page.tsx
│   ├── sequences/page.tsx
│   ├── settings/user/page.tsx
│   ├── settings/company/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── forms/contact-form.tsx
│   ├── nav/top-nav.tsx
│   └── ui/{button.tsx,input.tsx}
├── lib/
│   ├── auth/{jwt.ts,session.ts}
│   ├── db/prisma.ts
│   └── utils/{cn.ts,validators.ts}
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── pages/api/
│   ├── ai/index.ts
│   ├── auth/{login.ts,logout.ts}
│   ├── contacts/{index.ts,[id].ts}
│   ├── conversations/index.ts
│   ├── flows/{index.ts,[id].ts}
│   ├── sequences/{index.ts,[id].ts}
│   └── users/{company.ts,settings.ts}
├── styles/globals.css
├── middleware.ts
├── .env.example
└── README.md
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment:

   ```bash
   cp .env.example .env
   ```

3. Run Prisma migrations:

   ```bash
   npm run prisma:migrate
   ```

4. Seed default user:

   ```bash
   npm run prisma:seed
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

## Test Credentials

- Email: `admin@crm.local`
- Password: `Password123!`

## API Contracts

- `POST /api/auth/login` -> `{ token, user }`
- `GET /api/contacts` -> list contacts
- `POST /api/contacts` -> create contact
- `PUT /api/contacts/:id` -> update contact
- `DELETE /api/contacts/:id` -> delete contact

## Notes

- JWT is stored in `auth_token` HTTP-only cookie.
- Middleware protects all routes except `/login` and `/api/auth/login`.
- Company logo is stored locally in `public/company-logo.txt` for prototype simplicity and easy future S3 swap.
