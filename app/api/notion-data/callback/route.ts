export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import {
  calculateMinutesOfNotes,
  calculateUniversalRank,
  createNotionClient,
  getLongestNote,
  getMostActiveHour,
  getMostActiveMonth,
  getMostProductiveDayOfWeek,
  getPagesCreated,
  getPersonalityCard,
  getStreak,
  getTopTemplates,
  getTotalDatabasesCreated,
  getUserData,
} from "@/lib/notion";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Missing Notion token" },
      { status: 400 }
    );
  }
  try {
    const notionClient = createNotionClient(token);

    const streak = await getStreak(notionClient);
    const pagesCreated = await getPagesCreated(notionClient);
    const universalRank = await calculateUniversalRank(pagesCreated, streak);
    const mostActiveMonth = await getMostActiveMonth(notionClient);
    // const topPages = await getTopPages(notionClient);
    const minutesOfNotes = await calculateMinutesOfNotes(1000);
    // const longestNote = await getLongestNote(notionClient);
    const mostActiveHour = await getMostActiveHour(notionClient);
    const mostActiveHourInt = parseInt(
      await getMostActiveHour(notionClient),
      10
    );
    const personalityCard = getPersonalityCard(
      streak,
      pagesCreated,
      mostActiveHourInt
    );
    const totalDatabasesCreated = await getTotalDatabasesCreated(notionClient);
    const mostProductiveDay = await getMostProductiveDayOfWeek(notionClient);
    const userData = await getUserData(notionClient);
    const templates = await getTopTemplates(notionClient);

    const data = {
      streak,
      pagesCreated,
      universalRank,
      mostActiveMonth,
      minutesOfNotes,
      mostActiveHour,
      personalityCard,
      totalDatabasesCreated,
      mostProductiveDay,
      userData,
      templates,
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch Notion data: ${error}` },
      { status: 500 }
    );
  }
}
