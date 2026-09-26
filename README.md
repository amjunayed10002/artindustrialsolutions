# ART Industrial Solutions

Company website for ART Industrial Solutions, built with React, TypeScript, Vite and Tailwind CSS. It includes a product catalogue, services, industries, vendor documents, quotation requests and an admin panel.

## Run locally

Install the frontend dependencies:

```powershell
npm install
```

Set up the Django/MySQL backend once. This creates a database-scoped MySQL user and writes generated local credentials to the ignored `backend/.env` file:

```powershell
python -m venv backend/.venv
backend\.venv\Scripts\python.exe -m pip install -r backend/requirements.txt
backend\.venv\Scripts\python.exe backend/bootstrap_database.py
backend\.venv\Scripts\python.exe backend/manage.py migrate
backend\.venv\Scripts\python.exe backend/manage.py createsuperuser
```

Run the backend and frontend in separate terminals:

```powershell
backend\.venv\Scripts\python.exe backend/manage.py runserver 127.0.0.1:8000
```

```powershell
npm run dev
```

Open http://localhost:3000. Sign in to the CMS with the Django superuser account. The first successful admin login imports the browser's existing site data into MySQL; later CMS edits and public RFQ/contact submissions are saved through Django.

## Build

```
npm run build
```

The production files are written to `dist/`.

## Deploy

The frontend is configured for local development with Django at `127.0.0.1:8000`. Production deployment also requires hosting the Django backend and MySQL database and configuring the frontend API URL, allowed hosts, and CSRF trusted origins for those deployed domains. Vercel alone only hosts the frontend; do not put MySQL credentials in frontend environment variables.
