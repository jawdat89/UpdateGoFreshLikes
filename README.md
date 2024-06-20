# UpdateGoFreshLikes Azure Function

This repository contains the `UpdateGoFreshLikes` Azure Function for the Go Fresh project. This function increments the likes count for a menu item in the Sanity CMS.

## Table of Contents

- [Overview](#overview)
- [Environment Setup](#environment-setup)
- [Function Code](#function-code)
- [Running Locally](#running-locally)
- [Deploying to Azure](#deploying-to-azure)
- [Testing the Function](#testing-the-function)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

## Overview

The `UpdateGoFreshLikes` function is a serverless function built using Azure Functions and TypeScript. It interacts with the Sanity CMS to increment the likes count for a specified menu item.

## Environment Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
### Notes
   
Update CORS and Add App Key:

In the Azure portal, navigate to your Function App.
Go to **Settings** > **Configuration**.
Add your frontend's domain to the CORS allowed origins.
Add the environment variables (from your `.env` file) under the **Application settings** section.
Obtain the Function Key from **Functions** > **Manage** > **Function keys**.
Use the provided default app key in your application client header.

Add relevant Environment Variables to the Azure Function.
