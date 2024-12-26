import React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - notion-wrapped</title>
        <meta
          name="description"
          content="Privacy Policy for Notion Wrapped app."
        />
      </Head>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Welcome to <strong>notion-wrapped</strong>! Your privacy is critically
          important to us. This Privacy Policy explains how we handle and
          process your data when you use our application and connect it to your
          Notion account.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p>
            When you authenticate your Notion account via OAuth, we request
            permission to access the following:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>Pages you create in Notion</li>
            <li>
              Properties associated with your pages (e.g., streaks, ranks, etc.)
            </li>
          </ul>
          <p className="mt-2">
            This data is fetched temporarily to generate your Wrapped experience
            and is never stored permanently on our servers.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            2. How We Use Your Data
          </h2>
          <p>
            The data we access from your Notion account is used solely for
            generating your Notion Wrapped experience. The key purposes include:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>
              Creating personalized animations and insights about your usage.
            </li>
            <li>Generating a shareable/downloadable Wrapped card.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            3. Data Security and Storage
          </h2>
          <p>
            Your data is processed in real-time and is never stored on our
            servers. We use secure communication protocols (e.g., HTTPS) to
            protect your information during the transmission process. Once your
            Wrapped video or card is generated, the data is discarded
            immediately.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            4. Permissions and Authorization
          </h2>
          <p>
            When you authenticate with Notion, <strong>notion-wrapped</strong>{" "}
            will request the following permissions:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>
              <strong>View pages:</strong> notion-wrapped will be able to view
              the pages you select in the next step of the authorization
              process. You can also share additional pages with notion-wrapped
              later from within Notion.
            </li>
            <li>
              <strong>View basic information about workspace members:</strong>{" "}
              notion-wrapped will be able to see basic information about all
              workspace members and guests, such as their names and profile
              images. However, notion-wrapped will not access or view email
              addresses or any sensitive information.
            </li>
          </ul>
          <p className="mt-2">
            notion-wrapped does not modify, delete, or permanently store any of
            your Notion data. The data is accessed temporarily to generate your
            notion-wrapped experience and is discarded immediately after
            processing.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            5. Third-Party Services
          </h2>
          <p>
            We rely on Notion's API to access your data and generate the Wrapped
            experience. Their use of your data is governed by Notion's{" "}
            <a
              href="https://www.notion.so/terms"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Access the data we fetch temporarily from Notion.</li>
            <li>Revoke the connection to your Notion account at any time.</li>
          </ul>
          <p className="mt-2">
            To revoke permissions, visit your Notion account’s “Connected Apps”
            section and disconnect our app.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            7. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page with the updated effective date. Your
            continued use of the app signifies your acceptance of the updated
            policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            how we handle your data, please contact us at{" "}
            <a
              href="mailto:support@notionwrapped.tech"
              className="text-blue-600 underline"
            >
              support@notionwrapped.tech
            </a>
            .
          </p>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
