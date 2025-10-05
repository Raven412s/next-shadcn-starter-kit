const DocsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      {/* HEADER */}
      <header>
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Introduction
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Welcome to the documentation. This guide will help you understand the core
          concepts, structure, and features of this project so you can get started
          quickly and efficiently.
        </p>
      </header>

      {/* WHAT YOU'LL LEARN */}
      <section>
        <h2 className="text-3xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          What You’ll Learn
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>How the project is structured and organized.</li>
          <li>How to set up your local development environment.</li>
          <li>Best practices for extending or customizing components.</li>
          <li>Common troubleshooting tips and performance recommendations.</li>
        </ul>
      </section>

      {/* GETTING STARTED */}
      <section>
        <h2 className="text-3xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Getting Started
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          To begin, make sure you have{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
            Node.js
          </code>{" "}
          and{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
            npm
          </code>{" "}
          (or{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
            yarn
          </code>
          ) installed on your system. Then, clone the repository and install dependencies
          using:
        </p>

        <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 rounded-lg p-4 mt-4 text-sm overflow-x-auto">
{`git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev`}
        </pre>
      </section>

      {/* FOLDER STRUCTURE */}
      <section>
        <h2 className="text-3xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Folder Structure
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Here’s an overview of the core folders in this project:
        </p>
        <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`app/
 ├─ components/     # Reusable UI components
 ├─ docs/           # Documentation pages
 ├─ layout.tsx      # Root layout
 ├─ page.tsx        # Homepage
 └─ styles/         # Global CSS and Tailwind setup`}
        </pre>
      </section>

      {/* NEXT STEPS */}
      <section>
        <h2 className="text-3xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Next Steps
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Once you’ve successfully set up the project, explore the codebase and review
          the component library. Each section of this documentation provides details
          about customization options, props, and example implementations.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Your Project Name. All rights reserved.
      </footer>
    </div>
  );
};

export default DocsPage;
