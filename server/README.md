# Simple Solar Quote - Server

This is the backend part of the Solar Quote application. It is built using NestJS together with Firestore as a database. Initially a self-hosted MongoDB instance was used as the DB but since the server would be deployed on Google Cloud Run, Firestore was used instead for deployment simplicity.

## Run Locally

This is a portfolio project and not meant to be collaborated on, but I'll provide instructions as if.

Get local environment variables as in `.env.example`

Download the Google Cloud Service Account Private key (`gcp-service-account.json`) from GCP and put it in `solar-quote/server`

Install dependencies

```bash
npm i
```

Run development server (with reload on file-save)

```bash
npm run start:dev
```

## Deployment and Infrastructure

The server is deployed on Google Cloud Run using Google Cloud Build to deploy on merge to `master` on this repository. Database is Firestore.
