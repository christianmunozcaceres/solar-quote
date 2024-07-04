# Simple Solar Quote

An application where you can fill in your address and get an automated quotation for a solar installation! Powered by NestJS and Google Cloud + Google Solar API.

See the project live [here](https://solar-quote-byrw63ghha-lz.a.run.app)!

[Server](./server/)

## Why?

Why did I make this project?

1. I wanted to practice creating a system-spec for a use-case, and then creating a deployed MVP of that spec
2. I wanted to try out NestJS
3. I wanted to try making a simple UI (since I'm primarily a backend-developer)

## Setup

Simple Solar Quote is built using NestJS together with Firestore as a database, serving the client as static HTML files together with Bootstrap.

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

## System Specification

The basics of simple-solar-quote is that it calculates an estimation of what a solar-installation would cost. A full-fledged solar-quoation tool would have a flow that looks something like this.

1. A Customer can get a rough Estimation of the cost of a solar-installation (as well as a savings-estimate) by solely providing their address. With the address, together with Google Solar API the following are estimated:
   - Material Costs
   - Labout Costs
   - Lifetime Savings
2. The Customer has their own interface to tweak the values of the Estimation in order to make it more accurate
3. Customer can submit a Request For Offer, which sends the Estimation to a Solar-Expert
4. The Solar-Expert can then review the Estimation and tweak it until they verify it as an official Quotation that can be signed
5. The Quotation can be viewed by the Customer, and ultimately signed

### MVP

With the program-spec in mind, I have made an MVP that let's us perform the simplest action, with all the basic infrastructure deployed. The simplest flow would then be the following:

1. Submit your address
2. View the estimated Quotation
3. "Sign" or "Reject" the Quotation

This would require the following basic infrastructure to be deployed in a production environment:

- A UI to perform these actions
- An API for the actions, with:
  - A Database to save the Quotations
  - A 3rd-Party API integration (Google Solar API) for the estimations

Everything else is just iterated upon this basic setup.

## To Do

Objective: Acheiving the specs for the MVP

- Init the UI
- Add Address-Select screen
- Add Quotation-View screen
- Add mocked Sign and Reject screens

Beyond MVP

- Lifetime Savings calculations
  - Gotta estimate/collect the household-consumption
- Show a picture of the installation (using Google Solar API)

## Further Steps

This personal-project was scoped to be completed within a couple of weeks in my spare time. If this has any intention of being a full-fledged solar-quotation tool I would add the following things:

### Interfaces for Customers and Solar-Experts

The value of a tool like this is for a potential customer to start interfacing with a solar-installer by getting an estimation for their solar-installation, and for them to then request an offer with the estimation they just generated.

The Customer would need an interface where they can see their offer, tweak values for more accurate estimation, submit the estimation to get an official quotation, and sign the quotation (with notifications included).

The Solar-Expert would need extensive ability to change all the parameters that affect the Quotation, as well as have the option to use the Customer provided parameters or the 3rd Party Service generated parameters.

### Integration with a real Product Catalog

In this Project I've hard-coded the products used in the estimation, but in real life this would come from some kind of ERP software or other Product Catalog that the solar-installation company would use. Making some kind of integration towards that tool would ensure the quote-tool uses the correct data that is managed by the people responsible for it.
