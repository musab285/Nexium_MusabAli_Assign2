# 📰 Blog Summariser & Translator

This is a web application built as **Assignment 2** for the **NEXIUM Internship**.  
It allows users to input a blog URL, scrape its content, summarize it using **Cohere AI**, and translate the summary to **Urdu** using a static JavaScript dictionary (as required in the task).  
The app also stores data in both **Supabase** (PostgreSQL) and **MongoDB Atlas**, and displays previously summarized content via a sidebar.

## 🔗 Live Demo

> [Visit the deployed app](https://nexium-musabali-assign2.vercel.app)

---

## ✨ Features

- 🔗 **Enter Blog URL**: Automatically scrapes article text
- 🧠 **AI Summary**: Generates summaries via **Cohere AI**
- 🌐 **Urdu Translation**: Translates content using a static JS dictionary
- 💾 **Storage**:
  - Scraped content and URL stored in **MongoDB Atlas** via **Mongoose**
  - Summaries stored in **Supabase** via **Prisma**
- 📚 **History Sidebar**:
  - View list of all previously summarized blogs
  - Click a title to view both **original** and **summarised** content

---

## 🧰 Tech Stack

- **Frontend**: Next.js, TypeScript
- **Scraping**: Axios, Cheerio
- **Summarisation**: [Cohere API](https://docs.cohere.com/)
- **Translation**: Static JavaScript dictionary (Urdu)
- **Backend**:
  - **Supabase** (PostgreSQL + Prisma)
  - **MongoDB Atlas** (Mongoose)

---
