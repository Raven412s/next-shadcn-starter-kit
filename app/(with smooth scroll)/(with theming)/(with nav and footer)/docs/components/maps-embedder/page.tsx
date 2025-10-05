"use client";

import CopyComponent from "@/registry/default/starter-kit-ui/copy-component";
import MapsEmbedder from "@/registry/default/starter-kit-ui/maps-embedder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MapsEmbedderPage = () => {
  const sampleMapUrl: string =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83924405056!2d77.06889717802683!3d28.52728034285132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce31b5c6d1f0d%3A0x50a8d309d6bcb081!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1715095970001!5m2!1sen!2sin";

  const usageCode = `import MapsEmbedder from "@/components/starter-kit-ui/MapsEmbedder";

export default function Example() {
  return (
    <div className="h-[400px]">
      <MapsEmbedder
        mapUrl="${sampleMapUrl}"
        className="rounded-lg shadow w-full h-full"
      />
    </div>
  );
}`;

  // If you want to show the full MapsEmbedder component source, you can place it here as a string.
  // Below is the MapsEmbedder component source (editable) for copy:
  const mapsEmbedderSource = `const MapsEmbedder = ({ className, mapUrl }: { className?: string; mapUrl: string }) => {
  return (
    <div className={className}>
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title="Embedded Map"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapsEmbedder;`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <header>
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Maps Embedder
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
            MapsEmbedder
          </code>{" "}
          component lets you easily embed Google Maps (or any map iframe URL) into your pages.
        </p>
      </header>

      <Tabs
        defaultValue="preview"
        className="w-full h-[420px] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700"
      >
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="usage-code">Usage</TabsTrigger>
          <TabsTrigger value="source-code">Source</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="p-0">
          <div className="w-full h-[360px]">
            <MapsEmbedder mapUrl={sampleMapUrl} className="w-full h-full" />
          </div>
        </TabsContent>

        <TabsContent value="usage-code" className="p-4">
          <div className="h-full">
            <CopyComponent
              code={usageCode}
              fileName="example.tsx"
              language="typescript"
              height="max-h-[300px] max-w-2xl"
              defaultExpanded={false}
              showCopyButton
              showRefreshButton={false}
              showExpandButton
            />
          </div>
        </TabsContent>

        <TabsContent value="source-code" className="p-4">
          <div className="h-full">
            <CopyComponent
              code={mapsEmbedderSource}
              fileName="MapsEmbedder.tsx"
              language="typescript"
              height="max-h-[300px]"
              defaultExpanded={false}
              showCopyButton
              showRefreshButton={false}
              showExpandButton
            />
          </div>
        </TabsContent>
      </Tabs>

      <section>
        <h2 className="text-3xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Props
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="py-2 px-3 text-gray-900 dark:text-gray-100">Prop</th>
              <th className="py-2 px-3 text-gray-900 dark:text-gray-100">Type</th>
              <th className="py-2 px-3 text-gray-900 dark:text-gray-100">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-gray-700">
              <td className="py-2 px-3 text-gray-800 dark:text-gray-300">mapUrl</td>
              <td className="py-2 px-3 text-gray-800 dark:text-gray-300">string</td>
              <td className="py-2 px-3 text-gray-800 dark:text-gray-300">
                The full Google Maps embed URL (or any iframe map link). Must be a valid iframe URL.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-gray-800 dark:text-gray-300">className</td>
              <td className="py-2 px-3 text-gray-800 dark:text-gray-300">string (optional)</td>
              <td className="py-2 px-3 text-gray-800 dark:text-gray-300">
                Custom Tailwind / CSS classes for styling the iframe wrapper. Example:{" "}
                <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">"w-full h-full rounded-lg"</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer className="border-t dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Docs. All rights reserved.
      </footer>
    </div>
  );
};

export default MapsEmbedderPage;
