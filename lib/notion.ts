// @ts-ignore

import { Client } from "@notionhq/client";
import { format } from "date-fns";

export type NotionAuthResponse = {
  access_token: string;
  workspace_id: string;
  workspace_name: string;
  workspace_icon: string;
  bot_id: string;
};

type NotionPage = {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  archived: boolean;
  properties: {
    [key: string]: any; // Adjust based on your expected properties
  };
  parent: {
    type: string;
    [key: string]: any;
  };
  url: string;
};

export async function exchangeCodeForToken(
  code: string
): Promise<NotionAuthResponse> {
  try {
    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}:${process.env.NEXT_PUBLIC_NOTION_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NOTION_REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from Notion API:", errorData);
      throw new Error(
        `Failed to exchange code for token: ${
          errorData?.error || "Unknown error"
        }`
      );
    }

    const data: NotionAuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error in exchangeCodeForToken:", error);
    throw error;
  }
}

export function createNotionClient(accessToken: string) {
  return new Client({ auth: accessToken });
}

export async function getStreak(notionClient: Client) {
  const today = new Date();
  const oneYearAgo = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );

  const response = await notionClient.search({
    filter: { property: "object", value: "page" },
    sort: { direction: "ascending", timestamp: "last_edited_time" },
    query: "", // search all pages
  });

  const pages = response.results.filter((page: any) => {
    const createdTime = new Date(page.created_time);
    return createdTime >= oneYearAgo && createdTime <= today;
  });

  // Calculate max streak
  let maxStreak = 0,
    currentStreak = 0,
    lastDate: any = null;

  pages.forEach((page: any) => {
    const createdDate = new Date(page.created_time).toDateString();
    if (lastDate && createdDate === lastDate) {
      currentStreak++;
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 1;
    }
    lastDate = createdDate;
  });

  return maxStreak;
}

export async function getPagesCreated(notionClient: Client) {
  const today = new Date();
  const oneYearAgo = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );

  const response = await notionClient.search({
    filter: {
      value: "page",
      property: "object",
    },
  });

  const pagesCreated = response.results.filter((page: any) => {
    const createdDate = new Date(page.created_time);
    return createdDate >= oneYearAgo && createdDate <= today;
  });

  return pagesCreated.length;
}

export function calculateUniversalRank(pagesCreated: number, streak: number) {
  const score = pagesCreated + streak * 10;
  if (score > 1000) return "Notion Ninja";
  if (score > 500) return "Productivity Pro";
  return "Rookie Creator";
}

export async function getTopPages(notionClient: Client) {
  const response = await notionClient.search({
    filter: { property: "object", value: "page" },
    sort: { direction: "descending", timestamp: "last_edited_time" },
  });

  return response.results.slice(0, 5); // Top 5 pages
}

// Calculate the most active month
export async function getMostActiveMonth(notionClient: Client) {
  const results = await notionClient.search({
    filter: { property: "object", value: "page" },
  });

  const monthCounts: Record<string, number> = {};
  results.results.forEach((page: any) => {
    const month = format(new Date(page.created_time), "MMMM");
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  });

  return Object.entries(monthCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}

export async function getMostActiveHour(notionClient: Client) {
  const results = await notionClient.search({
    filter: { property: "object", value: "page" },
  });

  const hourMinutesMap: Record<number, number[]> = {};

  results.results.forEach((page: any) => {
    const createdTime = new Date(page.created_time);
    const hour = createdTime.getHours();
    const minutes = createdTime.getMinutes();

    if (!hourMinutesMap[hour]) hourMinutesMap[hour] = [];
    hourMinutesMap[hour].push(minutes);
  });

  // Find the hour with the most pages created
  const [mostActiveHour, minutes] = Object.entries(hourMinutesMap).reduce(
    (a, b) => (a[1].length > b[1].length ? a : b)
  ) as [string, number[]];

  // Calculate average minutes
  const avgMinutes =
    minutes.reduce((sum, m) => sum + m, 0) / minutes.length || 0;

  // Format the average time
  const formattedTime = format(
    new Date(2024, 0, 1, parseInt(mostActiveHour, 10), avgMinutes),
    "hh:mm a"
  );

  return formattedTime;
}

// Calculate minutes spent on Notion
export async function calculateMinutesOfNotes(
  pages: number,
  avgWordsPerPage = 300
) {
  const wordsPerMinute = 200; // Assume average reading/writing speed
  const totalWords = pages * avgWordsPerPage;
  return Math.ceil(totalWords / wordsPerMinute);
}

export async function getLongestNote(notionClient: Client) {
  const response: any = await notionClient.search({
    filter: { property: "object", value: "page" },
  });

  let longestNote = { title: "", wordCount: 0 };

  for (const page of response.results) {
    const title = page.properties.title.title[0]?.plain_text || "Untitled";
    const wordCount = title.split(" ").length;
    if (wordCount > longestNote.wordCount) {
      longestNote = { title, wordCount };
    }
  }

  return longestNote;
}

// Generate a personality card
export function getPersonalityCard(
  streak: number,
  pagesCreated: number,
  mostActiveHour: number
) {
  if (streak > 300) return "Consistency Legend";
  if (pagesCreated > 100) return "Productivity Master";
  if (mostActiveHour < 6) return "Early Bird";
  if (mostActiveHour > 18) return "Night Owl";
  return "Balanced Thinker";
}

export async function getTotalDatabasesCreated(notionClient: Client) {
  const today = new Date();
  const oneYearAgo = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );

  // Search for all databases in the Notion workspace
  const response = await notionClient.search({
    filter: { property: "object", value: "database" },
    sort: { direction: "ascending", timestamp: "last_edited_time" },
    query: "", // search all databases
  });

  // Filter databases created within the last year
  const databases = response.results.filter((database: any) => {
    const createdTime = new Date(database.created_time);
    return createdTime >= oneYearAgo && createdTime <= today;
  });

  // Count and group by creation date
  const databaseCount = databases.length;

  return databaseCount;
}

export async function getMostProductiveDayOfWeek(notionClient: Client) {
  const today = new Date();
  const oneYearAgo = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );

  const response = await notionClient.search({
    filter: { property: "object", value: "page" },
    sort: { direction: "ascending", timestamp: "last_edited_time" },
    query: "", // search all pages
  });

  const pages = response.results.filter((page: any) => {
    const createdTime = new Date(page.created_time);
    return createdTime >= oneYearAgo && createdTime <= today;
  });

  // Initialize day-of-week counters
  const dayCounts: Record<string, { total: number; count: number }> = {
    Sunday: { total: 0, count: 0 },
    Monday: { total: 0, count: 0 },
    Tuesday: { total: 0, count: 0 },
    Wednesday: { total: 0, count: 0 },
    Thursday: { total: 0, count: 0 },
    Friday: { total: 0, count: 0 },
    Saturday: { total: 0, count: 0 },
  };

  // Iterate over pages and calculate averages
  pages.forEach((page: any) => {
    const createdDate = new Date(page.created_time);
    const dayOfWeek = createdDate.toLocaleString("en-US", { weekday: "long" });

    if (dayCounts[dayOfWeek]) {
      dayCounts[dayOfWeek].total += 1;
      dayCounts[dayOfWeek].count += 1;
    }
  });

  // Calculate average and find the most productive day
  let productiveDay = "";
  let highestAverage = 0;

  for (const [day, { total, count }] of Object.entries(dayCounts)) {
    const average = count > 0 ? total / count : 0;
    if (average > highestAverage) {
      productiveDay = day;
      highestAverage = average;
    }
  }

  return {
    productiveDay,
    averageNotes: Math.round(highestAverage), // Round for better readability
  };
}

export async function getUserData(notionClient: Client) {
  try {
    // Fetch user info
    const response = await notionClient.users.list({});

    // Assuming the first user in the list is the authenticated user
    const user = response.results[0];

    if (!user) {
      throw new Error("No user data found.");
    }

    // Extract the necessary fields
    const userData = {
      name: user.name || "Unknown User",
      avatarUrl: user.avatar_url || "", // Fallback if no avatar
    };

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; // Return null in case of an error
  }
}

export async function getTopTemplates(notionClient: Client) {
  const today = new Date();
  const oneYearAgo = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );

  const response = await notionClient.search({
    filter: { property: "object", value: "page" },
    sort: { direction: "ascending", timestamp: "last_edited_time" },
    query: "", // search all pages
  });

  const pages = response.results.filter((page: any) => {
    const createdTime = new Date(page.created_time);
    return createdTime >= oneYearAgo && createdTime <= today;
  });

  // Map to track template usage
  const templateUsage: Record<string, number> = {};

  pages.forEach((page: any) => {
    const templateName = page.properties?.template?.title?.[0]?.plain_text;

    if (templateName) {
      templateUsage[templateName] = (templateUsage[templateName] || 0) + 1;
    }
  });

  // Convert usage map to an array and sort by usage count in descending order
  const sortedTemplates = Object.entries(templateUsage)
    .map(([name, usage]) => ({ name, usage }))
    .sort((a, b) => b.usage - a.usage);

  // Return the top 3 templates
  return sortedTemplates.slice(0, 3);
}
